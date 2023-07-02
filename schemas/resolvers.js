const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select("-__v -password")
                    .populate("savedFoods");

                return userData;
            }

            throw new AuthenticationError("Not logged in");
        },
        users: async () => {
            return User.find()
                .select("-__v -password")
                .populate("savedFoods");
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }

            const token = signToken(user);
            return { token, user };
        },
        saveFood: async (parent, { foodData }, context) => {
            try {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { savedFoods: foodData } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            } catch (err) {
                console.log(err);
                throw new AuthenticationError("Couldn't save food!");
            }
        },
        removeFood: async (parent, { foodId }, context) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: context.user._id },
                { $pull: { savedFoods: { foodId } } },
                { new: true }
            );
            if (!updatedUser) {
                throw new AuthenticationError("Couldn't find user with this id!");
            }
            return updatedUser;
    },
},
};

module.exports = resolvers;
