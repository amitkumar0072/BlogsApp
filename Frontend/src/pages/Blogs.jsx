import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [category, setCategory] = useState("");

  const fetchBlogs = async () => {
    const res = await api.get(`/blogs?category=${category}`);
    setBlogs(res.data);
  };

  useEffect(() => {
    fetchBlogs();
  }, [category]);

  return (
    <>
      <Navbar />

      {/* Page Container */}
      <div className="min-h-screen bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] py-10 px-6">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4 md:mb-0">
              Explore Blogs
            </h1>

            {/* Category Filter */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white text-gray-700 shadow focus:outline-none"
            >
              <option value="">All Categories</option>
              <option value="Career">Career</option>
              <option value="Finance">Finance</option>
              <option value="Travel">Travel</option>
            </select>
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="bg-white/90 rounded-xl p-10 text-center shadow-lg">
              <p className="text-gray-600 text-lg">
                No blogs found in this category 😕
              </p>
            </div>
          )}

          {/* Blogs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {/* Image */}
                {b.image && (
                  <img
                    src={b.image}
                    alt={b.title}
                    className="h-40 w-full object-cover"
                  />
                )}

                {/* Content */}
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                    {b.title}
                  </h2>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {b.content}
                  </p>

                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>{b.author || "Anonymous"}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded-full">
                      {b.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Blogs;
