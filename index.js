const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
var cors = require("cors");
const jwt = require("jsonwebtoken");
const rateLimit = require("express-rate-limit");
const dotenv = require("dotenv");
const expenseRouter = require("./routes/expense");
const toDoRouter = require("./routes/to_do");
const urlSaverRouter = require("./routes/url_saver");
const userRouter = require("./routes/user");
const googleRouter = require("./routes/google_oAuth2");
dotenv.config();
const uri = process.env.MONGODB_CONNECT_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB :", error);
  });

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Apply rate limiting middleware
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 300, // limit each IP to 3 requests per windowMs
  message: "Too many requests from this IP, please try again later",
});
app.use(limiter);

const appVersion = process.env.APP_VERSION || "v1";
const applicationBaseUrl = "/" + appVersion + "/tracker";
app.use(applicationBaseUrl + "/expense", expenseRouter);
app.use(applicationBaseUrl + "/to_do", toDoRouter);
app.use(applicationBaseUrl + "/url", urlSaverRouter);
app.use(applicationBaseUrl + "/user", userRouter);
app.use(applicationBaseUrl + "/google", googleRouter);

const PORT = process.env.PORT || 4000;

app.listen(PORT, (err) => {
  if (!err) {
    console.log("server running on port :" + PORT);
  } else {
    console.log("server listening failed with error :" + err);
  }
});
