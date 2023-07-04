const { Schema, model } = require('mongoose');

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
    servingSizes: [
        {
            quantity: { type: Number },
            unit: { type: String },
        },
    ],
    // add date to the saved food
    date: {
        type: Date,
        default: Date.now,
    },
});

// const Food = model('Food', foodSchema);

module.exports = foodSchema;
