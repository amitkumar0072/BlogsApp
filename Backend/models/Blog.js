const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    category: String,
    author: String,
    content: String,
    image: String,
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
