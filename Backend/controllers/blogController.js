const Blog = require("../models/Blog");

exports.getBlogs = async (req, res) => {
  const { category, author } = req.query;

  let filter = {};
  if (category) filter.category = category;
  if (author) filter.author = author;

  const blogs = await Blog.find(filter).sort({ createdAt: -1 });
  res.json(blogs);
};

exports.createBlog = async (req, res) => {
  const blog = await Blog.create({
    ...req.body,
    author: req.user.name,
    userId: req.user.id
  });

  res.status(201).json(blog);
};

exports.updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.userId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  Object.assign(blog, req.body);
  await blog.save();

  res.json(blog);
};

exports.deleteBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);

  if (!blog) return res.status(404).json({ message: "Blog not found" });
  if (blog.userId.toString() !== req.user.id)
    return res.status(403).json({ message: "Unauthorized" });

  await blog.deleteOne();
  res.json({ message: "Blog deleted" });
};
