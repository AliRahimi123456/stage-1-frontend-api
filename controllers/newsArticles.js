const NewsArticle = require("../models/newsArticles");
const BadRequestError = require("../errors/bad-request-error");
const ForbiddenError = require("../errors/forbidden-error");
const NotFoundError = require("../errors/not-found-error");

// Creating article
const createArticles = (req, res, next) => {
  const { title, content, imageUrl } = req.body;

  NewsArticle.create({ title, content, imageUrl, author: req.user._id })
    .then((article) => res.send({ data: article }))
    .catch((error) => {
      if (error.name === "ValidationError") {
        return next(new BadRequestError("Invalid data passed"));
      }
      return next(error);
    });
};

// Getting all articles
const getArticles = (req, res, next) => {
  NewsArticle.find({})
    .then((articles) => res.status(200).send({ data: articles }))
    .catch(next);
};

// Deleting an article
const deleteArticle = (req, res, next) => {
  const { id } = req.params;
  const userId = req.user._id;

  NewsArticle.findById(id)
    .orFail(() => new NotFoundError("Article not found"))
    .then((article) => {
      if (article.author.toString() !== userId) {
        throw new ForbiddenError("You are not allowed to delete this article");
      }
      return NewsArticle.findByIdAndDelete(id);
    })
    .then(() =>
      res.status(200).send({ message: "Article deleted successfully" })
    )
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid article ID"));
      }
      return next(error);
    });
};

// Saving (liking)  the article
const saveArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  NewsArticle.findByIdAndUpdate(
    articleId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Article not found");
      }
      res.status(200).send({ data: article });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid article ID"));
      }
      return next(error);
    });
};

// Unsaving  (unliking)  the article
const unSaveArticle = (req, res, next) => {
  const { articleId } = req.params;
  const userId = req.user._id;

  NewsArticle.findByIdAndUpdate(
    articleId,
    { $pull: { likes: userId } },
    { new: true }
  )
    .then((article) => {
      if (!article) {
        throw new NotFoundError("Article not found");
      }
      res.status(200).send({ data: article });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid article ID"));
      }
      return next(error);
    });
};

module.exports = {
  createArticles,
  getArticles,
  deleteArticle,
  saveArticle,
  unSaveArticle,
};
