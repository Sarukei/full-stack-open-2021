const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

blogRouter.get("/", async (request, response) => {
  const foundBlogs = await Blog.find({}).populate("author", {
    username: 1,
    name: 1,
  });

  if (!foundBlogs) return response.status(404).end();
  return response.json(foundBlogs);
});

blogRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: user._id,
    url: body.url,
    likes: body.likes,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  return response.json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const { id: blogId } = request.params;
  const token = request.token;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: "token missing or invalid",
    });
  }

  const blog = await Blog.findById(blogId);

  if (blog.author.toString() !== decodedToken.id) {
    return response.status(401).json({
      error: "invalid token ",
    });
  }

  await Blog.findByIdAndRemove(blogId);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const { id: blogId } = request.params;
  const body = request.body;

  const blog = {
    title: body.title,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog, { new: true });

  return response.json(updatedBlog);
});

module.exports = blogRouter;
