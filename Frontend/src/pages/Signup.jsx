import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", form);
      alert("Signup successful");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <form onSubmit={handleSubmit} className="w-96 p-6 shadow-lg">
        <h2 className="text-2xl mb-4">Sign Up</h2>

        <input className="input" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="input" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="input" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="btn">Register</button>
      </form>
    </div>
  );
};

export default Signup;
