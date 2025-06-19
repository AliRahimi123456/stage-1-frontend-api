const express = require("express");
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const {
  createArticles,
  getArticles,
  deleteArticle,
} = require("../controllers/newsArticles");
const {
  validateCardBody,
  validateId,
  validateCreateArticles,
} = require("../middlewares/validation");

const router = express.Router();

router.get("/", getArticles);

router.use(auth);

router.post("/", validateCreateArticles, createArticles);

router.delete(
  "/:articleId",
  celebrate({
    params: Joi.object().keys({
      articleId: Joi.string().hex().length(24).required(),
    }),
  }),
  deleteArticle
);

module.exports = router;
