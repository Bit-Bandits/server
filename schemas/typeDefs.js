const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    username: String
    password: String
    email: String
    _id: ID
  }

  type Meal {
    username: String
    food: String
    calories: Int
    servings: Int
    date: Int
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    getUser(id: ID!): User
    getAllUsers: [User]
    getMeal(mealId: ID!): Meal
    getSavedMeals: [Meal]
    getMealsByUsernameAndDate(username: String!, date: String!): [Meal]
  }

  type Mutation {
    addUser(user: UserInput!): Auth
    saveMeal(input: MealInput!): Meal
    updateMeal(mealId: ID!, input: MealInput!): Meal
    removeMeal(mealId: ID!): Boolean
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
