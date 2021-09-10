const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async(parent, args, context) => {
            const foundUser = await User.findOne({
                $or: [{ _id: context.user ? context.user._id : args.id }, { username: args.username }],
            });

            if (!foundUser) {
                throw new AuthenticationError('Not logged in');
            }
            return foundUser;
        }
    },
    Mutation: {
        addUser: async(parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        }
    }

}

module.exports = resolvers;