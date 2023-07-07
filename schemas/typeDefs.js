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
    getSavedMeals(username:String!): Meal
    getMealsByUsernameAndDate(username: String!, date: String!): [Meal]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    saveMeal(username: String!, food: String!, calories: Int!, servings: Int!, date: Int!): Meal
    removeMeal(mealId: ID!): Boolean
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
