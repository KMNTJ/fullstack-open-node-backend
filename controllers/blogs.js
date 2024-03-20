const blogsRouter = require("express").Router();
const { response } = require("../app");
const Blog = require("../models/blog");

blogsRouter.get("/api/blogs", async (_, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogsRouter.post("/api/blogs", async (request, response) => {
  const blog = new Blog(request.body);

  if (blog.title == false || blog.url == false) {
    response.status(400).end();
    return;
  }

  blog.likes ??= 0;

  const result = await blog.save();
  response.status(201).json(result);
});

blogsRouter.delete("/api/blogs/:id", async (request, response) => {
  const result = await Blog.findByIdAndDelete(request.params.id)
  if (result?.id === request.params.id) {
    response.status(200).json(result.toJSON());
  }
  else {
    response.status(404).end();
  }
});

module.exports = {
  blogsRouter,
};
