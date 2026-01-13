import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CreateBlog = () => {
  const [blog, setBlog] = useState({
    title: "",
    category: "",
    content: "",
    image: "",
  });

  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/blogs", blog);
      alert("Blog created successfully");
      navigate("/blogs");
    } catch (err) {
      alert("Failed to create blog");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] flex items-center justify-center px-4">


        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
          
          {/* Header */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Create a New Blog
          </h1>
          <p className="text-gray-500 mb-6">
            Share your thoughts with the community ✨
          </p>

          {/* Form */}
          <form onSubmit={submit} className="space-y-5">
            
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Title
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setBlog({ ...blog, title: e.target.value })
                }
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                className="w-full border rounded-lg px-4 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setBlog({ ...blog, category: e.target.value })
                }
                required
              >
                <option value="">Select category</option>
                <option value="Career">Career</option>
                <option value="Finance">Finance</option>
                <option value="Travel">Travel</option>
                <option value="Technology">Technology</option>
                <option value="Lifestyle">Lifestyle</option>
              </select>
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Blog Content
              </label>
              <textarea
                rows="6"
                placeholder="Write your blog content here..."
                className="w-full border rounded-lg px-4 py-2 resize-none focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setBlog({ ...blog, content: e.target.value })
                }
                required
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input
                type="text"
                placeholder="https://example.com/image.jpg"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                onChange={(e) =>
                  setBlog({ ...blog, image: e.target.value })
                }
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/blogs")}
                className="px-6 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateBlog;
