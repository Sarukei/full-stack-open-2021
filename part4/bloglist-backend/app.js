const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./utils/config");
const blogRouter = require("./controllers/blog");
const app = express();
const logger = require("./utils/logger");

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    logger.info(`connected to MongoDB`);
  })
  .catch((err) => logger.error(`Error connecting ot MongoDB:`, error.message));

app.use(cors());
app.use(express.json());
app.use("/api/blogs", blogRouter);

module.exports = app;
