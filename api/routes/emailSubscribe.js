const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const emailSubscribeSchema = require("../models/subscribe");

router.get("/", (req, res, next) => {
  emailSubscribeSchema
    .find()
    .exec()
    .then((doc) => {
      const response = {
        count: doc.length,
        emailSub: doc,
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.post("/create-email", (req, res, next) => {
  const emailData = new emailSubscribeSchema({
    email: req.body.email,
  });
  emailData
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: "Created successfully!",
        createdEmail: {
          email: result.email,
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
