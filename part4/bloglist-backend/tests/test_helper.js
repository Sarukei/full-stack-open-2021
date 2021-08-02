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

module.exports = { initialBlogs, nonExistingId, blogsInDb };
