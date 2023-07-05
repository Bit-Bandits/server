const db = require('../config/connection');
const { User} = require('../models');
const {Meal } = require('../models')
const userSeeds = require('./userSeeds.json');
const mealSeeds = require('./mealSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    await Meal.deleteMany({});
    await Meal.create(mealSeeds);

    console.log('all done!');
    process.exit(0);

  } catch (err) {
    throw err;
  }
});
