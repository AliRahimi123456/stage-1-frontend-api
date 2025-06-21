const express = require("express");
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const {
  createArticles,
  getArticles,
  deleteArticle,
} = require("../controllers/newsArticles");
const {
  validateCreateArticles,
  validateId,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getArticles);

router.post("/", validateCreateArticles, createArticles);

router.delete(
  "/:articleId",
  validateId,

  deleteArticle
);

module.exports = router;
