const dummy = (blogs) => {
  return 1;
};

const sumBlogLikes = (total, blog) => {
  return total + Number.parseInt(blog.likes);
};

const totalLikes = (blogs) => {
  return blogs.reduce(sumBlogLikes, 0);
};

const findFavouriteBlog = (current, blog) => {
  return blog.likes > current.likes ? blog : current;
};

const favouriteBLog = (blogs) => {
  const favourite = blogs.reduce(findFavouriteBlog);

  return {
    title: favourite.title,
    author: favourite.author,
    likes: favourite.likes,
  };
};

const mostBlogs = (blogs) => {
  const authors = [];
  const authorBlogCount = [];

  blogs.forEach((blog) => {
    if (authors.includes(blog.author)) {
      authorBlogCount[authors.indexOf(blog.author)]++;
    } else {
      authors.push(blog.author);
      authorBlogCount.push(1);
    }
  });

  const highestCountOfBlogs = Math.max(...authorBlogCount);
  const hasMost = authors[authorBlogCount.indexOf(highestCountOfBlogs)];

  return {
    author: hasMost,
    blogs: highestCountOfBlogs,
  };
};

const mostLikes = (blogs) => {
  const authors = [];
  const authorLikesCount = [];

  blogs.forEach((blog) => {
    if (authors.includes(blog.author)) {
      authorLikesCount[authors.indexOf(blog.author)] += blog.likes;
    } else {
      authors.push(blog.author);
      authorLikesCount.push(blog.likes);
    }
  });

  const highestCountOfLikes = Math.max(...authorLikesCount);
  const hasMost = authors[authorLikesCount.indexOf(highestCountOfLikes)];

  return {
    author: hasMost,
    likes: highestCountOfLikes,
  };
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBLog,
  mostBlogs,
  mostLikes,
};
