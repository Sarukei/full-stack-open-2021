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
