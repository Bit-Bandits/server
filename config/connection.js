const mongoose = require('mongoose');

// Connect to Mongo DB//
mongoose.connect(process.env.MONGODB_URI || 'mongodb://', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;