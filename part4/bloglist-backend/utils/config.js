require("dotenv").config();

module.exports = {
  PORT: process.env.PORT,
  MONGODB_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI
      : process.env.TEST_MONGODB_URI,
};
