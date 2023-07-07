const { AuthenticationError } = require("apollo-server-express");
const { User, Meal} = require("../models");
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
    getSavedMeals: async (_, { username}) => {
      const meals = await Meal.find({username});
      return meals;
    },
 
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({
        username,
        email,
        password,
      });
      const token = signToken(user);
      return { token, user };
    },
    // addUser: async (parent, args) => {
    //   const user = await User.create({
    //     username: args.user.username,
    //     email: args.user.email,
    //     password: args.user.password,
    //   });
    //   const token = signToken(user);
    //   return { token, user };
    // },
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
      // return { token, meal, username, food, calories, servings, date };
      return meal;
    },
    // saveMeal: async (parent, args) => {
    //   const meal = await Meal.create({
    //     username: args.username,
    //     food: args.food,
    //     calories: args.calories,
    //     servings: args.servings,
    //     date: args.date,
    //   });
    //   const token = signToken(meal);
    //   return { token, meal };
    // },

    removeMeal: async (parent, { _id }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedMeals: { _id } } },
          { new: true }
        );
        return !!updatedUser; // Return a boolean indicating the success of the operation
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
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
