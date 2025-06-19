const express = require("express");
const { celebrate, Joi } = require("celebrate");
const { updateUserProfile, getCurrentUser } = require("../controllers/users");

const router = express.Router();

router.get("/me", getCurrentUser);

// router.patch("/me", validateUserProfileUpdate, updateUserProfile);

module.exports = router;
