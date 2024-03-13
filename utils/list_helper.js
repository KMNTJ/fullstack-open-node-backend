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

module.exports = {
  dummy,
  totalLikes,
  favouriteBLog,
  mostBlogs,
};
