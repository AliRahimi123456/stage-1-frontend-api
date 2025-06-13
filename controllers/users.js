const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const UnauthorizedError = require("../errors/unauthorized-error");

// Login controller
const login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials({ email, password })
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }

      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({ message: "Login successful", token });
    })
    .catch((error) => {
      if (error.message === "Incorrect email or password") {
        return next(new UnauthorizedError("Invalid email or password"));
      }
      return next(error);
    });
};

// Get current user controller
const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFoundError("User not found"));
      }
      return res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === "CastError") {
        return next(
          new BadRequestError("The id string is in an invalid format")
        );
      }
      return next(error);
    });
};

// Create user controller
const createUser = (req, res, next) => {
  const { name, email, password, avatar } = req.body;

  if (!name || !email || !password) {
    return next(new BadRequestError("Name, email, and password are required"));
  }

  return bcrypt.hash(password, 10).then((hashedPassword) => {
    const userData = {
      name,
      email,
      password: hashedPassword,
      avatar: avatar || "https://example.com/default-avatar.jpg",
    };

    return User.create(userData)
      .then((user) => {
        const userWithoutPassword = user.toObject();
        delete userWithoutPassword.password;
        return res.status(201).send(userWithoutPassword);
      })
      .catch((error) => {
        if (error.code === 11000) {
          return next(new ConflictError("Email already in use"));
        }

        if (error.name === "ValidationError") {
          return next(new BadRequestError("Invalid data passed"));
        }

        return next(error);
      });
  });
};

module.exports = {
  getCurrentUser,

  createUser,
  login,
};
