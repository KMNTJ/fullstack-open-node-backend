const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogsRouter.get("/api/blogs", async (_, response) => {
  const blogs = await Blog.find({}).populate("userId");
  return response.json(blogs);
});

blogsRouter.post("/api/blogs", async (request, response) => {
  const { title, url, likes, author, userId } = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  if (![title, url, decodedToken.id].every(Boolean)) {
    return response.status(400).json("missing title, url or userId");
  }

  const creator = await User.findById(decodedToken.id);
  if (!creator) {
    return response.status(400).json("invalid userId");
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

  return response.status(201).json(savedBlog);
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);
  const userBlogIds = user.blogs.map((b) => b._id.toString());

  if (!userBlogIds.includes(request.params.id)) {
    return response.status(400).json({ error: "invalid deletion target" });
  }

  const result = await Blog.findByIdAndDelete(request.params.id);
  if (result?.id === request.params.id) {
    return response.status(200).json(result.toJSON());
  } else {
    return response.status(404).end();
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
    return response.status(200).json(result.toJSON());
  } else {
    return response.status(404).end();
  }
});

module.exports = {
  blogsRouter,
};
