const mongoose = require('mongoose');

const { Schema } = mongoose;

const mealSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  food: {
    type: String,
    required: true,
  },
  calories: {
    type: Number,
    required: true,
    min: 0,
  },
  servings: {
    type: Number,
    required: true,
    min: 0,
    default: 1
  },
  date : {
    type: Date,
    default: Date.now
    
  },

  
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = { Meal };
