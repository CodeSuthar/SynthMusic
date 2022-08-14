const mongoose = require("mongoose");

module.exports = async (SynthBot) => {
  mongoose.connect(SynthBot.config.Mongo_URL, {
    useNewUrlParser: true,
    autoIndex: false,
    connectTimeoutMS: 10000,
    family: 4,
    useUnifiedTopology: true,
  });
  mongoose.Promise = global.Promise;
  mongoose.connection.on('connected', () => {
    console.log(`[MONGODB] DATABASE CONNECTED`);
  });
  mongoose.connection.on('err', (err) => {
    console.log(`[MONGODB] DATABASE ERROR: \n${err.stack}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.log(`[MONGODB] DATABASE DISCONNECTED`);
  });
};