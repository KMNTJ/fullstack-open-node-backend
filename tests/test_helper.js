const Blog = require("../models/blog");

const BlogsOfDatabase = async () => {
  const blogs = await Blog.find({});
  return blogs.map((b) => b.toJSON());
};

const nonExistingId = async () => {
  const blog = new Blog({ title: "temporary blog insert" });
  await blog.save();
  await blog.deleteOne();

  return blog._id.toString();
};

module.exports = { BlogsOfDatabase, nonExistingId };
