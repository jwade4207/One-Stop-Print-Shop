const { AuthenticationError } = require('apollo-server-express');
const { User, Category, Order, Banner } = require('../models');
const { signToken } = require('../utils/auth');
const stripe = require('stripe')('sk_test_51JZJBcGYNnIUnppEr2udhHHrUGo0HCGchLATQnJxX6FlRFAJnPQTlo2hvtcacgTw5r8uj4M3cRXXnFt5E0jolfGd008xM0LjRy');

const resolvers = {
    Query: {
        categories: async () => {
            return await Category.find();
        },
        banners: async (parent, { category, name }) => {
            const params = {};

            if (category) {
                params.category = category;
            }

            if (name) {
                params.name = {
                    $regex: name
                };
            }
            return await Banner.find(params).populate('category');
        },
        banner: async (parent, { _id }) => {
            return await Banner.findById(_id).populate('category');
        },
        user: async (parent, args, context) => {
            if (context.user) {
                const user = await User.findById(context.user._id).populate({
                    path: 'orders.banners',
                    populate: 'category'
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
                    populate: 'category'
                });

                return user.orders.id(_id);
            }

            throw new AuthenticationError('Not logged In');
        },
        checkout: async (parent, args, context) => {
            const url = new URL(context.headers.referer).origin;
            const order = new Order({ banners: args.banners });
            const line_items = [];
            console.log(args.banners)
            const { banners } = await order.populate('banners').execPopulate();
            console.log(order)
            console.log(banners)
            for (let i = 0; i < banners.length; i++) {
                const banner = await stripe.products.create({
                    name: banners[i].name,
                    //customMessage: banners[i].customMessage,
                    images: [`${url}/images/${banners[i].image}`]
                });
                //generate price id using banner id
                const price = await stripe.prices.create({
                    product: banner.id,
                    unit_amount: banners[i].price * 100,
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