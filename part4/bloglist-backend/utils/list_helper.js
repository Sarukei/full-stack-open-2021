const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (prev, current) => {
    return prev + current.likes;
  };

  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  let blogWithMostLikes = null;

  blogs.forEach((blog) => {
    if (!blogWithMostLikes) {
      blogWithMostLikes = blog;
    }

    blogWithMostLikes =
      blog.likes > blogWithMostLikes.likes ? blog : blogWithMostLikes;
  });

  return blogWithMostLikes;
};

module.exports = { dummy, totalLikes, favoriteBlog };
