const { test, after, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const dummyBlogs = require("./testdata/dummyblogs");
const dummyUsers = require("./testdata/dummyUsers");
const Blog = require("../models/blog");
const THelper = require("./test_helper");
const bcrypt = require("bcrypt");
const User = require("../models/user");

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

  const noTitleBlog = {
    title: "",
    author: "Schell F. Pobly-Shed",
    url: "https://www.foo.com",
    likes: "0",
  };

  await api.post("/api/blogs").send(noTitleBlog).expect(400);
  const blogs = await api.get("/api/blogs");
  assert.strictEqual(pristineBlogs.length, blogs.body.length);
});

test("a blog without url can not be added", async () => {
  const pristineBlogs = await THelper.BlogsOfDatabase();

  const noUrlBlog = {
    title: "Where is bloggo!",
    author: "Schell F. Pobly-Shed",
    url: "",
    likes: "0",
  };

  await api.post("/api/blogs").send(noUrlBlog).expect(400);
  const blogs = await api.get("/api/blogs");
  assert.strictEqual(pristineBlogs.length, blogs.body.length);
});

function assertArrayObjectsHaveIdProperty(array) {
  assert(Array.isArray(array), "Input is not an array");

  array.forEach((obj) => {
    assert(obj.hasOwnProperty("id"), 'Object does not have the "id" property');
  });
}

test('blogs have a property called "id" by which the blog may be identified', async () => {
  const blogs = await api.get("/api/blogs");
  assertArrayObjectsHaveIdProperty(blogs.body);
});

test('during the saving of a blog with no value on property "likes" the "likes" value will be set to 0', async () => {
  const newBlog = {
    title: "The latest buzz!",
    author: "Schell F. Pobly-Shed",
    url: "https://www.foo.com",
    likes: null,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(201);
  assert(response.body.likes === 0);
});

test("an existing blog can be deleted", async () => {
  const idToDeleteWith = dummyBlogs.blogs_many[0]._id;
  await api.delete(`/api/blogs/${idToDeleteWith}`).expect(200);
});

test("attempt to delete non existing blog returns 404 not found", async () => {
  const idToDeleteWith = dummyBlogs.blogs_many[0]._id;
  await api.delete(`/api/blogs/${idToDeleteWith}`).expect(200);
  await api.delete(`/api/blogs/${idToDeleteWith}`).expect(404);
});

test("updating an existing blog returns the updated blog", async () => {
  const originalBlogToUpdate = dummyBlogs.blogs_many[0];
  const alteredBlog =
    dummyBlogs.blogs_altered_blog_with_correct_fields_and_values;
  const response = await api
    .put(`/api/blogs/${originalBlogToUpdate._id}`)
    .send(alteredBlog)
    .expect(200);

  assert(THelper.checkObjectHasOthersKVPairs(response.body, alteredBlog));
  assert(originalBlogToUpdate._id === response.body.id);
});

test("updating of a blog while attempting to add a property not defined in the Blog schema will fail", async () => {
  const originalBlogToUpdate = dummyBlogs.blogs_many[0];
  const alteredBlog = dummyBlogs.blogs_altered_blog_with_an_extra_field;
  await api
    .put(`/api/blogs/${originalBlogToUpdate._id}`)
    .send(alteredBlog)
    .expect(400);
});

test("updating a subset of a blogs properties will not have an effect on the other properties of the blog", async () => {
  const originalBlogToUpdate = dummyBlogs.blogs_many[0];
  const alteredBlog =
    dummyBlogs.blogs_altered_blog_with_a_subset_of_all_properties;
  const response = await api
    .put(`/api/blogs/${originalBlogToUpdate._id}`)
    .send(alteredBlog)
    .expect(200);

  assert(response.body.url === originalBlogToUpdate.url);
  assert(response.body.title === alteredBlog.title);
  assert(response.body.id === originalBlogToUpdate._id);
});

describe("when there is initially one user in the db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("supasekret", 12);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await THelper.usersInDb();

    const newUser = dummyUsers.user_that_shall_be_able_to_be_created;

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await THelper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });
});

test("when creating a new user with a password below the minimum length the creation fails", async () => {
  const usersAtStart = await THelper.usersInDb();
  const newUser = dummyUsers.user_with_too_short_password;

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await THelper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  assert(result.body.includes("username and password minimum length is 3"));
});

test("when creating a new user with a username below the minimum length the creation fails", async () => {
  const usersAtStart = await THelper.usersInDb();
  const newUser = dummyUsers.user_with_too_short_username;

  const result = await api
    .post("/api/users")
    .send(newUser)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  const usersAtEnd = await THelper.usersInDb();
  assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  assert(result.body.includes("username and password minimum length is 3"));
});

after(async () => {
  await mongoose.connection.close();
});
