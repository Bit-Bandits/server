const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const foodSchema = require('./Food');
const servingSizeSchema = require('./Food');
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  savedFoods: [foodSchema],
},

  {
    toJSON: {
      virtuals: true,
    },
  }

);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `totalCals` with the total amount of calories saved in the array
userSchema.virtual("totalCals").get(function () {
  return this.savedFoods.length;
});

const User = model("User",userSchema);

module.exports = User;
