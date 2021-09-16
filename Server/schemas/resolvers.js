const { AuthenticationError } = require('apollo-server-express');
const { User, Size, Order, Banner } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');

const resolvers = {
    Query: {
        size: async () => {
            return await Size.find()
        },
        banners: async (parent, { size, name }) => {
            const params = {};

            if (size) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }
            return await Banner.find(params).populate('size');
        },
        banner: async (parent, { _id }) => {
            return await Banner.findById(_id).populate('size');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.banners',
                    populate: 'size'
                });

                user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);
                return user;
            }

            throw new AuthenticationError('Not logged in');
        },
        order: async (parent, { _id }, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.banners',
                    populate: 'size'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged In');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ products: args.products });
            const line_items = [];

            const { banners } = await order.populate('banners').execPopulate();

            for (let i = 0; i < banners.length; i++) {
                const banner = await stripe.banners.create({
                    name: banners[i].name,
                    customMessage: banners[i].customMessage,
                    images: [`${url}/images/${products[i].image}`]
                });

                const price = await stripe.prices.create({
                    banner: banner.id,
                    unit_amount: banners[1].price * 100,
                    currency: 'usd',
                });

                line_items.push({
                    price: price.id,
                    quantity: 1
                });
            }

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${url}/`
            });

            return { session: session.id };
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        addOrder: async (parent, { banners }, context) => {
            console.log(context);
            if (context.user) {
                const order = new Order({ banners });

                await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

                return order;
            }

            throw new AuthenticationError('Not logged in');
        },
        updateBanner: async (parent, { _id, quantity }) => {
            const decrement = Math.abs(quantity) * -1;

            return await Banner.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('incorrect email')
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('incorrect password')
            }

            const token = signToken(user);

            return { token, user };
        }
    }
}

module.exports = resolvers;