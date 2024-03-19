const { test, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const dummyBlogs = require("./testdata/dummyblogs");
const Blog = require("../models/blog");
const THelper = require("./test_helper");

const api = supertest(app);
let amountOfInitializedBlogsUnderTest;

beforeEach(async () => {
  await Blog.deleteMany({});

  const amountToInsert = 4;
  const dummyBlogsLength = dummyBlogs.blogs_many.length;
  amountOfInitializedBlogsUnderTest =
    amountToInsert <= dummyBlogsLength ? amountToInsert : dummyBlogsLength;

  for (let x = 0; x < amountOfInitializedBlogsUnderTest; x++) {
    let blogObject = new Blog(dummyBlogs.blogs_many[x]);
    await blogObject.save();
  }
});

test("blogs are returned as json", async () => {
  const pristineBlogs = await THelper.BlogsOfDatabase();

  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert(response.body.length === amountOfInitializedBlogsUnderTest);
});

test("a valid blog can be added", async () => {
  const pristineBlogs = await THelper.BlogsOfDatabase();

  const newBlog = {
    title: "Mindhaze",
    author: "Schell F. Pobly-Shed",
    url: "https://www.foo.com",
    likes: "12",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const response = await api.get("/api/blogs");
  const titles = response.body.map((b) => b.title);

  assert.strictEqual(response.body.length, pristineBlogs.length + 1);
  assert(titles.includes("Mindhaze"));
});

test("a blog without title can not be added", async () => {
  const pristineBlogs = await THelper.BlogsOfDatabase();

  const newBlog = {
    title: "",
    author: "Schell F. Pobly-Shed",
    url: "https://www.foo.com",
    likes: "0",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogs = await api.get("/api/blogs");

  assert.strictEqual(pristineBlogs.length, blogs.body.length);
});

after(async () => {
  await mongoose.connection.close();
});
