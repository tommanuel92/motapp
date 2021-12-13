//const dotenv = require('dotenv');
//dotenv.config();
module.exports = {
  mongoUrl: process.env.MONGO_URI,
  port: process.env.PORT,
  tokenSecret: 'MYTOPSECRET'
};