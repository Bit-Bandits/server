const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    password: String
    
    email: String
    savedMeals: [Meal]
    numSavedMeals: Int
  }

  input UserInput {
    username: String
    
    email: String
    password: String
  }
  type Meal {
    _id: ID
    name: String
    portions: Int
    ingredients: [Ingredient]
    picture_url: String
    edamamId: String
    instructions: String
  }
  input MealInput {
    name: String
    portions: Int
    ingredients: [IngredientInput]
    picture_url: String
    edamamId: String
    instructions: String
  }
  type Ingredient {
    _id: ID
    name: String
    quantity: Int
    measure: String
    text: String
  }
  input IngredientInput {
    name: String
    quantity: Int
    measure: String
    text: String
  }
  type IngridientListItem{
    _id: ID
    name: String
    quantity: Int
    measure: String
    text: String
    meal: String
    mealId: ID
    }

    type Auth {
      token: ID!
      user: User
    }
    type Query {
    getUser: User
    getMeal(mealId: ID!): Meal
    getSavedMeals: [Meal]
    
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
