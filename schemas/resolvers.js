const { AuthenticationError } = require("apollo-server-express");
const { User, Meal, Ingridients} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
    Query: {
    getUser: async (parent, { username }, context) => {
      console.log(context.user)
    // const params = username ? { username } : {};
    return User.findOne({
      _id: context.user._id,
    });
    },
    
    getMeal: async (parent, { _id }) => {
    const params = _id ? { _id } : {};
    return Meal.find(params).sort({ createdAt: -1 });
    },
    getSavedMeals: async (parent, { username }) => {
    const params = username ? { username } : {};
    return Meal.find(params).sort({ createdAt: -1 });
    },
  },

  Mutation: {
        
    addUser: async (parent, args) => {
      const user = await User.create(
        {
          username: args.user.username,
          email: args.user.email,
          password: args.user.password,
        }
      );
      const token = signToken(user);
      return { token, user };
    },

    saveMeal: async (parent, { mealData }, context) => {
      if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedMeals: mealData } },
        { new: true, runValidators: true }
      );
    }
    throw new AuthenticationError("You need to be logged in!");
  },
  removeMeal: async (parent, { mealId }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedMeals: { mealId } } },
        { new: true }
      );
    }
    throw new AuthenticationError("You need to be logged in!");
  },
  updateMeal : async (parent, { mealId, mealData }, context) => {
    if (context.user) {
      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedMeals: { mealId } } },
        { new: true }
      );
    }
    throw new AuthenticationError("You need to be logged in!");
  },
  
  login: async (parent, { email, password }) => {
    const user = await User.findOne({ email });

    if (!user) {
      throw new AuthenticationError('No profile with this email found!');
    }

    const correctPw = await user.isCorrectPassword(password);

    if (!correctPw) {
      throw new AuthenticationError('Incorrect password!');
    }

    const token = signToken(user);
    return { token, user };
  },
},
};
  
    





    
module.exports = resolvers;
