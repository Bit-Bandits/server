const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedFoods: [Food]
  }

  type ServingSize {
    quantity: Float
    unit: String
  }

  input ServingSizeInput {
    quantity: Float
    unit: String
  }

  type Food {
    foodId: Int!
    label: String!
    image: String!
    nutrients: Float!
    servingSizes: [ServingSize]
    date: String!
  }

  type Query {
    users: [User]
    user(userId: ID!): User
    me: User
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    addFood(userId: ID!, label: String!, servingSizes: [ServingSizeInput]!): User
    removeFood(userId: ID!, foodId: ID!): User
    saveFood(userId: ID!, foodId: ID!): User
  }

  type Auth {
    token: ID!
    user: User
  }
`;

module.exports = typeDefs;
