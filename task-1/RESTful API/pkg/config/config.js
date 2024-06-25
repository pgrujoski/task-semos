const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  JWT_KEY: process.env.JWT_KEY,
};
