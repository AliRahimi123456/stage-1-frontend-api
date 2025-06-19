const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const { errors } = require("celebrate");

const errorHandler = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect(
    "mongodb://localhost:27017/newsexplorer_db"
    //   () => console.log("Connected to DB"),
    //   (e) =>
  )
  .then(() => {
    console.log("Connected to DB");
  })
  .catch(() => console.error("DB error", e));

const router = require("./routes");

app.use(express.json());
app.use(cors());
app.use(requestLogger);
// Crash test route
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
console.log(router);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
