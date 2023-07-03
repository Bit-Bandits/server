const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    name: String
    email: String
    calories: Int
    date: String
  }

  type Food {
    _id: ID
    name: String
    calories: Int
    date: String
}

type Query {
    me: User
    }

    type Mutation {
        addUser(name: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        addFood(name: String!, calories: Int!, date: String!): Food
        removeFood(foodId: ID!): User
        saveFood(foodId: ID!): User
        }

        type Auth {
            token: ID!
            user: User
            }
            
`;

module.exports = typeDefs;
