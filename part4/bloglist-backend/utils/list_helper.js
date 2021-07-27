const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (prev, current) => {
    return prev + current.likes;
  };

  return blogs.reduce(reducer, 0);
};

module.exports = { dummy, totalLikes };
