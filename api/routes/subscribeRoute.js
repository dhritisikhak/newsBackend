let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();

// Student Model
let subscribeUserSchema = require("../models/subscribeuser");

// CREATE Student
router.post("/create-user-sub", (req, res, next) => {
  subscribeUserSchema.create(req.body, (error, data) => {
    if (error) {
      return next(error);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

// READ Students
router.get("/", (req, res) => {
  subscribeUserSchema.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
