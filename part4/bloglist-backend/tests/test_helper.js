const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "My First Blogpost",
    author: "Sarukei",
    url: "https://github.com/Sarukei/full-stack-open-2021",
  },
  {
    title: "My Second Blogpost",
    author: "Sarukei",
    url: "https://github.com/Sarukei/full-stack-open-2021",
  },
];

const initialUsers = [
  {
    username: "Sarukei",
    name: "Sarukei X",
    password: "12",
  },
  {
    username: "root",
    password: "root",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovesoon", author: "default" });

  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  initialUsers,
  usersInDb,
};
