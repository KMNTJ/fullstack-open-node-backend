const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { getTokenFrom } = require("../utils/token_helper");

blogsRouter.get("/api/blogs", async (_, response) => {
  const blogs = await Blog.find({}).populate("userId");
  response.json(blogs);
});

blogsRouter.post("/api/blogs", async (request, response) => {
  const { title, url, likes, author, userId } = request.body;

  const token = getTokenFrom(request);
  if (!token) {
    return response.status(401).json({ error: "missing token" });
  }
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  if (![title, url, decodedToken.id].every(Boolean)) {
    response.status(400).json("missing title, url or userId");
    return;
  }
  
  const creator = await User.findById(decodedToken.id);
  if (!creator) {
    response.status(400).json("invalid userId");
    return;
  }

  const blog = new Blog({
    title: title,
    url: url,
    likes: likes,
    author: author,
    userId: creator._id,
  });
  blog.likes ??= 0;

  const savedBlog = await blog.save();
  creator.blogs = creator.blogs.concat(savedBlog._id);
  await creator.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id);
  if (result?.id === request.params.id) {
    response.status(200).json(result.toJSON());
  } else {
    response.status(404).end();
  }
});

blogsRouter.put("/api/blogs/:id", async (request, response) => {
  alteredBlog = request.body;

  try {
    await new Blog(alteredBlog).validate();
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, alteredBlog, {
    new: true,
  });

  if (result) {
    response.status(200).json(result.toJSON());
  } else {
    response.status(404).end();
  }
});

module.exports = {
  blogsRouter,
};
