class ConflictError extends Error {
  constructor(message) {
    this.statusCode = 409;
  }
}
module.exports = ConflictError;
