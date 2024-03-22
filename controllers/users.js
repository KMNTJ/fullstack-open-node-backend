const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/api/users", async (_, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

usersRouter.post("/api/users", async (request, response) => {
  const { username, name, password } = request.body;

  if (username?.length < 3 || name == false || password?.length < 3) {
    response.status(400).json('username and password minimum length is 3');
    return;
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.status(201).json(savedUser);
});

module.exports = {
  usersRouter,
};
