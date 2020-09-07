const jwt = require("jsonwebtoken");
const helper = require("../helper");

module.exports = {
  authorization: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      jwt.verify(token, "Rahasia", (error, result) => {
        if (
          (error && error.name === "JsonWebTokenError") ||
          (error && error.name === "TokenExpiredError")
        ) {
          return helper.response(response, 403, error.message);
        } else {
          request.token = result;
          next();
        }
      });
    } else {
      return helper.response(response, 400, "Please Login First");
    }
  },
  authorizationSuperAdmin: (request, response, next) => {
    let token = request.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const payload = jwt.verify(token, "Rahasia");
      if (payload.user_role !== 1) {
        return helper.response(
          response,
          403,
          "Sorry, You're not authorized to access this data"
        );
      } else {
        next();
      }
    } else {
      return helper.response(response, 400, "Please Login First");
    }
  },
};
