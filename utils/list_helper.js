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

module.exports = {
  dummy,
  totalLikes,
  favouriteBLog,
};
