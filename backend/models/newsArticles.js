const mongoose = require("mongoose");
const validator = require("validator");

// === News Article Schema ===
const newsArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  url: {
    type: String,
    required: true,
  },
  keyword: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  urlToImage: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Link is not valid",
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NewsArticle", newsArticleSchema);
