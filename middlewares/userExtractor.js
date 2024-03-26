const User = require("../models/user");
const jwt = require("jsonwebtoken");

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  request.user = await User.findById(decodedToken.id);
  next();
};

module.exports = {
  userExtractor,
};
