const mongoose = require('mongoose');

mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open correctly');
});

mongoose.connection.on('error', (err) => {
  console.error('Error occurs in db connection');
  console.error(err);
  process.exit(1);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', () => {
  mongoose.disconnect();
  process.exit(0);
});

/**
 * Establish basic MongoDB connection through Mongoose
 * 
 * @returns {Promise<void>}
 */
async function connect() {
  await mongoose.connect(
    configs.db.DB_CONNECTION_URI, 
    { useNewUrlParser: true }
  );
}

module.exports = {
  connect,
};