const mongoose = require('mongoose');

exports.connectdb = () => {
    mongoose.connect(require('./config').mongoUrl)
    .then(() => {
        console.log("Successfully connected to database");
    })
    .catch((error) => {
        console.log("database connection failed. exiting now...");
        console.error(error);
        process.exit(1);
      });
}