import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="flex justify-between p-4 bg-gray-900 text-white">
      <Link to="/" className="font-bold">Arnifi Blogs</Link>

      {token && (
        <div className="space-x-4">
          <Link to="/create">Create</Link>
          <Link to="/myblogs">My Blogs</Link>
          <button onClick={logout} className="text-red-400">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
