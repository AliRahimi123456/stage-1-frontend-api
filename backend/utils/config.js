// const JWT_SECRET = process.env.JWT_SECRET || "default value of SOME_THING";
const { JWT_SECRET = "dev-secret" } = process.env;

module.exports = {
  JWT_SECRET,
};
