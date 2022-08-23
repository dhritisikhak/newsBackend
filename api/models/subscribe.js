const mongoose = require("mongoose");

const emailSubscribeSchema = mongoose.Schema({
  email: { type: String, required: true },
});

module.exports = mongoose.model("emailSubscribe", emailSubscribeSchema);
