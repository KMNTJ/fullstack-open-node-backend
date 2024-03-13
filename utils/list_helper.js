const dummy = (blogs) => {
  return 1;
};

const sumBlogLikes = (total, blog) => {
    return total + Number.parseInt(blog.likes);
}

const totalLikes = (blogs) => {
    return blogs.reduce(sumBlogLikes, 0)
}

module.exports = {
  dummy,
  totalLikes
};
