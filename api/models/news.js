const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsPortalSchema = new Schema({
  newsId: { type: String, required: true },
  newsHeadline: {
    type: String,
    required: true,
  },
  newsAuthor: {
    type: String,
    required: true,
  },
  newsCategory: {
    type: String,
    required: true,
  },
  newsContent: {
    type: String,
    required: true,
  },
  newsImage: {
    type: String,
    required: true,
  },
});

newsPortalSchema.set("timestamps", true);

module.exports = mongoose.model("Newsroom", newsPortalSchema);
