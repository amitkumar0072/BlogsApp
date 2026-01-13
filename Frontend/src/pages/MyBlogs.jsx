import { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  const fetchMyBlogs = async () => {
    try {
      const res = await api.get("/blogs");
      const userId = JSON.parse(
        atob(localStorage.getItem("token").split(".")[1])
      ).id;

      setBlogs(res.data.filter((b) => b.userId === userId));
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    await api.delete(`/blogs/${id}`);
    fetchMyBlogs();
  };

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <h1 className="text-3xl font-bold text-white mb-6">
            My Blogs
          </h1>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="bg-white/90 rounded-xl p-10 text-center shadow-lg">
              <p className="text-gray-600 text-lg mb-4">
                You haven’t written any blogs yet ✍️
              </p>
              <button
                onClick={() => navigate("/create")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Create Your First Blog
              </button>
            </div>
          )}

          {/* Blog Grid */}
          {blogs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <div
                  key={b._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col"
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
                  <div className="p-5 flex-1">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                      {b.title}
                    </h2>

                    <p className="text-sm text-gray-500 mb-2">
                      Category: {b.category}
                    </p>

                    <p className="text-gray-600 text-sm line-clamp-3">
                      {b.content}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center p-4 border-t">
                    <button
                      onClick={() => navigate(`/edit/${b._id}`)}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => remove(b._id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default MyBlogs;
