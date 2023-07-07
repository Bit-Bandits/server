const { AuthenticationError } = require("apollo-server-express");
const { User, Meal, Ingredients} = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    getAllUsers : async () => {
      return User.find()

    },
    getUser: async (parent, args) => {
      return await User.findById(args.id);
    },
    getMealsByUsernameAndDate: async (_, { username, date }) => {
      return await Meal.find({ username, date });
    },
   
    getMeal: async (parent, { _id , context }) => {
      // const params = _id ? { _id } : {};
      return Meal.findOne({
        _id: context.user._id,
      });
    },
    getSavedMeals: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Meal.find(params).sort({ createdAt: -1 });
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create({
        username: args.user.username,
        email: args.user.email,
        password: args.user.password,
      });
      const token = signToken(user);
      return { token, user };
    },
    // saveMeal: async (parent, args, context) => {
    //   if (!context.user) {
    //     throw new AuthenticationError("You need to be logged in!");
    //   }
    //   console.log(args.input.ingredients)

    //   const meal = await Meal.create({
    //     name: args.input.name,
    //     portions: args.input.portions,
    //     ingredients: args.input.ingredients,
    //   });
      
    saveMeal: async (_, { username, food, calories, servings, date }) => {
      const meal = await Meal.create({ username, food, calories, servings, date });
      const token = signToken(meal);
      return { token, meal };
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
    // updateMeal: async (parent, { mealId, mealData }, context) => {
    //   if (context.user) {
    //     return User.findOneAndUpdate(
    //       { _id: context.user._id },
    //       { $pull: { savedMeals: { mealId } } },
    //       { new: true }
    //     );
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },
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
