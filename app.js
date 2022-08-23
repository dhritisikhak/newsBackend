const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();


const newsPortalRoutes = require("./api/routes/newsPortal");
const subscribeUserRoute = require("./api/routes/subscribeRoute");

mongoose.Promise = global.Promise;
mongoose
  .connect(
    "mongodb+srv://dhriti:ZuhZk2AuqVkVnDAH@cluster0.ymgs7.mongodb.net/test"
  )
  .then(
    () => {
      console.log("Database successfully connected!");
    },
    (error) => {
      console.log("Could not connect to database : " + error);
    }
  );

// mongoose.connect(

// );

app.use(morgan("dev"));
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

//Routes which should handle requests
app.use("/newsPortal", newsPortalRoutes);
app.use("/userSubscribe", subscribeUserRoute);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
