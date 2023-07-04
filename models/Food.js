const { Schema, model } = require('mongoose');

const servingSizeSchema = new Schema({
    quantity: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  });

const foodSchema = new Schema({
    foodId: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    nutrients: {
        type: Number,
        required: true,
    },
    servingSizes: [servingSizeSchema],
    // add date to the saved food
    date: {
        type: Date,
        default: Date.now,
    },
});


// const Food = model('Food', foodSchema);

module.exports = {foodSchema, servingSizeSchema};
// module.exports = servingSizeSchema;
