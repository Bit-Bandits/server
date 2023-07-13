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
   
    getMeal: async (parent, args) => {
      return await Meal.findById(args.id);
    },
    

    getSavedMeals: async (_, { username }) => {
      const meals = await Meal.find({ username });
      return meals;
    },
 
  },
  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      console.log({
        username,
        email,
        password
      })
      const user = await User.create({
        username,
        email,
        password,
      });

      console.log(user)
      const token = signToken(user);
      return { token, user };
    },
   
      
    saveMeal: async (_, { username, food, calories, servings, date }) => {
      const meal = await Meal.create({ username, food, calories, servings, date });
      const token = signToken(meal);
      return meal;
    },
   

    removeMeal: async (parent, { _id }, context) => {
      if (context.user) {
        const meal = await Meal.findOneAndRemove({ _id, username: context.user.username });
        return !!meal; // Return a boolean indicating the success of the operation
      } else {
        throw new AuthenticationError("You need to be logged in!");
      }
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
