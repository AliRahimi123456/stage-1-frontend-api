class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.cause.statusCode = 401;
  }
}
module.exports = UnauthorizedError;
