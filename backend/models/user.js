const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    // name: {
    //   type: String,
    //   required: true,
    //   minlength: 2,
    //   maxlength: 30,
    // },
    name: {
      type: String,
      required: [true, "The name is required"],
      minlength: 3,
      maxlength: 30,
      match: [/^[a-zA-Z0-9_]+$/, "Username must be alphanumeric"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: "Invalid email format",
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

userSchema.statics.findUserByCredentials = function ({ email, password }) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", userSchema);
