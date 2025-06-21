const express = require("express");
const { celebrate, Joi } = require("celebrate");
const auth = require("../middlewares/auth");
const newsArticles = require("./newsArticles");
const userRoutes = require("./users");
const NotFoundError = require("../errors/not-found-error");
const { validateLogin, validateSignup } = require("../middlewares/validation");

const router = express.Router();

router.post(
  "/signin",
  validateLogin,

  require("../controllers/users").login
);
router.post(
  "/signup",
  validateSignup,

  require("../controllers/users").createUser
);
router.use(auth);

router.use("/articles", newsArticles);
router.use("/users", userRoutes);

router.use((req, res, next) => {
  next(new NotFoundError("Route not found"));
});
module.exports = router;
