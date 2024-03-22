const Blog = require("../models/blog");
const User = require("../models/user");

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

const checkObjectHasOthersKVPairs = async (a, b) => {
  // Check if all properties of object B are present in object A
  for (const key in b) {
    if (!a.hasOwnProperty(key)) {
      return false; // Property from B is not found in A
    }

    // Check if values match
    if (a[key] !== b[key]) {
      return false; // Values for the same property do not match
    }
  }

  return true; // All properties and values match
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map(u => u.toJSON())
}

module.exports = { BlogsOfDatabase, nonExistingId, checkObjectHasOthersKVPairs, usersInDb };
