const blogRouter = require("express").Router();

const Blog = require("../models/blog.js");

blogRouter.get("/", async (request, response) => {
  const foundBlogs = await Blog.find({});

  if (!foundBlogs) return response.status(404).end();
  return response.json(foundBlogs);
});

blogRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  const savedBlog = await blog.save();

  return response.json(savedBlog);
});

blogRouter.delete("/:id", async (request, response) => {
  const { id: blogId } = request.params;

  await Blog.findByIdAndRemove(blogId);
  response.status(204).end();
});

module.exports = blogRouter;
