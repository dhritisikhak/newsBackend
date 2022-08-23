const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let subscribeUserSchema = new Schema(
  {
    email: {
      type: String,
    },
  },
  {
    collection: "subscribeUsers",
  }
);

module.exports = mongoose.model("SubscribeUser", subscribeUserSchema);
