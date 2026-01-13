import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../components/Navbar";

const EditBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  // Fetch blog data
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get("/blogs");
        const found = res.data.find((b) => b._id === id);
        if (!found) {
          alert("Blog not found");
          navigate("/");
          return;
        }
        setBlog(found);
      } catch (err) {
        alert("Error loading blog");
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const updateBlog = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/blogs/${id}`, {
        title: blog.title,
        category: blog.category,
        content: blog.content,
        image: blog.image,
      });
      alert("Blog updated successfully");
      navigate("/myblogs");
    } catch (err) {
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="p-6 max-w-xl mx-auto">
        <h2 className="text-2xl mb-4">Edit Blog</h2>

        <form onSubmit={updateBlog} className="space-y-3">
          <input
            className="input w-full"
            placeholder="Title"
            value={blog.title}
            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
          />

          <input
            className="input w-full"
            placeholder="Category"
            value={blog.category}
            onChange={(e) => setBlog({ ...blog, category: e.target.value })}
          />

          <textarea
            className="input w-full h-32"
            placeholder="Content"
            value={blog.content}
            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
          />

          <input
            className="input w-full"
            placeholder="Image URL (optional)"
            value={blog.image || ""}
            onChange={(e) => setBlog({ ...blog, image: e.target.value })}
          />

          <button className="btn w-full">Update Blog</button>
        </form>
      </div>
    </>
  );
};

export default EditBlog;
