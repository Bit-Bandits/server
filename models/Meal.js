const mongoose = require('mongoose');

const { Schema } = mongoose;

const mealSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  portions: {
    type: Number,
    required: true,
    min: 0,
    default: 2
  },
  ingredients: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Ingredient',
      // required: true
    }
  ],
  picture_url: {
    type: String,
    required: false
  },
  instructions: {
    type: String
  }
});

const Meal = mongoose.model('Meal', mealSchema);
module.exports = { Meal };
