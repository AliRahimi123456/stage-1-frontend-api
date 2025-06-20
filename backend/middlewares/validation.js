const { celebrate, Joi, Segments } = require("celebrate");
const validator = require("validator");

// Custom URL validator using validator.js
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// 1. Validate clothing item body when an item is created
const validateCreateArticles = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    url: Joi.string().required(),
    keyword: Joi.string().required(),

    urlToImage: Joi.string().required().custom(validateURL).messages({
      "string.empty": 'The "urlToImage" field must be filled in',
      "string.uri": 'The "urlToImage" field must be a valid URL',
    }),
    content: Joi.string().required(),
  }),
});

// 2. Validate user body when a user is created (signup)
const validateUserBody = celebrate({
  [Segments.BODY]: Joi.object().keys({
    username: Joi.string().min(4).max(45).messages({
      "string.empty": 'The "usernanme" field must be filled in',
      "string.uri": 'The "usernanme" field must be a valid URL',
    }),
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 3. Validate user login (signin)
const validateLogin = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.empty": 'The "email" field must be filled in',
      "string.email": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().messages({
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// 4. Validate item/user ID (hexadecimal, 24 characters)
const validateId = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().hex().length(24).required().messages({
      "string.hex": 'The "id" must be a valid hexadecimal string',
      "string.length": 'The "id" must be 24 characters long',
      "any.required": 'The "id" field is required',
    }),
  }),
});

module.exports = {
  validateCreateArticles,
  validateUserBody,
  validateLogin,
  validateId,
};
