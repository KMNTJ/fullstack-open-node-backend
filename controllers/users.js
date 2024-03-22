const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/api/users", async (_, response) => {
  const users = await User.find({});
  response.status(200).json(users);
});

usersRouter.post("/api/users", async (request, response) => {
  const { username, name, password } = request.body;

  if (username == false || name == false || password == false) {
    response.status(400).end();
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
