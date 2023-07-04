const db = require('../config/connection');
const { User } = require('../models');
// const { Food } = require('../models');
const userSeeds = require('./userSeeds.json');
// const foodSeeds = require('./foodSeeds.json');

db.once('open', async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);
    // await Food.deleteMany({});
    // await Food.create(foodSeeds);

    console.log('all done!');
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
