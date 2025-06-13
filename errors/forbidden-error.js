class ForbiddenError extends Error {
  consturctor(message) {
    this.statusCode = 403;
  }
}
module.exports = ForbiddenError;
