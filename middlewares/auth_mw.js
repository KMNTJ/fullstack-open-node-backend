const jwt = require("jsonwebtoken");

const auth_mw = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  } else {
    return response.status(401).json({ error: "missing the token" });
  }
  return next();
};

module.exports = {
  auth_mw,
};
