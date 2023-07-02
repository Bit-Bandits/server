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
`;

module.exports = typeDefs;
