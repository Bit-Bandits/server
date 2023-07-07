const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    
  },
  password: {
    type: String,
    required: true,
   
  },
  date : {
    type: Date,
    default: Date.now
  },
  // savedMeals: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'Meal',
  //     required: true
  //   }
  // ],
});

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
userSchema.virtual('numSavedMeals').get(function () {
  return this.savedMeals.length;
});

const User = mongoose.model('User', userSchema);

module.exports = { User };
