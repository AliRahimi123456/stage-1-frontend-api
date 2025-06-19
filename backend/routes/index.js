const express = require("express");
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const newsArticles = require(".././routes/newsArticles");
const userRoutes = require("../routes/users");
const NotFoundError = require("../errors/not-found-error");

const router = express.Router();

router.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  require("../controllers/users").login
);
router.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),

      username: Joi.string().min(3).max(35).required(),
    }),
  }),
  require("../controllers/users").createUser
);
router.use("/articles", newsArticles);
router.use(auth);
router.use("/users", userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
module.exports = router;
