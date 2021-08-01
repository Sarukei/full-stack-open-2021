const _ = require("lodash");

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

// Using Lodash
const mostBlogs = (blogs) => {
  const blogCountByAuthor = _.countBy(blogs, "author");
  const blogCountByAuthorArray = _.map(blogCountByAuthor, (value, key) => ({
    author: key,
    blogs: value,
  }));

  return _.maxBy(blogCountByAuthorArray, "blogs");
};

// Without lodash
// const mostBlogs = (blogs) =>
//   blogs.reduce(
//     (accu, curr, idx, arr) => {
//       const blogger = accu.bloggers.get(curr.author) || {
//         author: curr.author,
//         blogs: 1,
//       };

//       accu.bloggers.set(curr.author, { ...blogger, blogs: blogger.blogs + 1 });

//       accu.mostBlogs =
//         blogger.blogs > accu.mostBlogs.blogs ? blogger : accu.mostBlogs;

//       return idx != arr.length - 1 ? accu : accu.mostBlogs;
//     },
//     {
//       bloggers: new Map(),
//       mostBlogs: {
//         author: "",
//         blogs: 0,
//       },
//     }
//   );

const mostLikes = (blogs) =>
  blogs.reduce(
    (accu, curr, idx, arr) => {
      let blogger = accu.bloggers.get(curr.author);

      accu.bloggers.set(curr.author, {
        author: curr.author,
        likes: (blogger?.likes || 0) + curr.likes,
      });

      blogger = accu.bloggers.get(curr.author);

      accu.mostLikes =
        blogger.likes > accu.mostLikes.likes ? blogger : accu.mostLikes;

      return idx != arr.length - 1 ? accu : accu.mostLikes;
    },
    {
      bloggers: new Map(),
      mostLikes: {
        author: null,
        likes: 0,
      },
    }
  );

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
