const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const dummyblogs = require("./testdata/dummyblogs");

// Setup
const listWithNoBLogs = dummyblogs.blogs_empty;
const listWithOneBLog = dummyblogs.blogs_single;
const listWithManyBlogs = dummyblogs.blogs_many;
const favouriteBlog = dummyblogs.blogs_favourite;
const hasMostBlogs = dummyblogs.blogs_has_most_blogs;
const hasMostLikes = dummyblogs.blogs_has_most_likes;

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes:", () => {
  test("when a list has no blogs then the total likes result equals to zero", () => {
    const result = listHelper.totalLikes(listWithNoBLogs);
    assert.strictEqual(result, 0);
  });

  test("when a list has only one blog then the total likes equals to the likes of just that one blog", () => {
    const result = listHelper.totalLikes(listWithOneBLog);
    assert.strictEqual(result, 7);
  });

  test("when a list has many blogs then the total likes result equals to the total likes of those", () => {
    const result = listHelper.totalLikes(listWithManyBlogs);
    assert.strictEqual(result, 36);
  });
});

describe("favourite blog:", () => {
  test("when a list has many blogs a favourite blog is one of the possible many which have the most likes", () => {
    const result = listHelper.favouriteBLog(listWithManyBlogs);
    assert.strictEqual(JSON.stringify(result), JSON.stringify(favouriteBlog));
  });
});

describe("most blogs", () => {
  test("when a list of blogs has many blogs the blogger with the most blogs equals to the result", () => {
    const result = listHelper.mostBlogs(listWithManyBlogs);
    assert.strictEqual(JSON.stringify(result), JSON.stringify(hasMostBlogs));
  });
});

  describe("most likes", () => {
    test("when a list of blogs has many blogs the blogger with the most likes on blogs equals to the result", () => {
      const result = listHelper.mostLikes(listWithManyBlogs);
      assert.strictEqual(JSON.stringify(result), JSON.stringify(hasMostLikes));
    });
});