const { Schema, model } = require('mongoose');

const foodSchema = new Schema({
    ID: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        required: true,
    },
    calories: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Food = model('Food', foodSchema);

module.exports = Food;
