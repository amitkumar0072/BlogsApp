import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  // SIGN UP
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/signup", signupData);
      alert("Signup successful. Please login.");
      setIsSignup(false);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", loginData);
      localStorage.setItem("token", res.data.token);
      navigate("/blogs");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  const handleDemoLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email: "demo@arnifi.com",
      password: "demo123",
    });

    localStorage.setItem("token", res.data.token);
    navigate("/blogs");
  } catch (err) {
    alert("Demo login failed");
  }
};


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f6f5f7]">
      <div className="relative w-[768px] max-w-full min-h-[480px] bg-white rounded-xl shadow-2xl overflow-hidden">

        {/* SIGN UP */}
       {/* SIGN UP */}
<div
  className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center
  transition-all duration-700
  ${isSignup ? "translate-x-full opacity-100 z-20 pointer-events-auto" 
             : "opacity-0 z-0 pointer-events-none"}`}
>

          <form
            onSubmit={handleSignup}
            className="flex flex-col items-center px-12 text-center w-full"
          >
            <h1 className="text-2xl font-bold mb-4">Create Account</h1>

            <input
              className="input"
              placeholder="Name"
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
            />
            <input
              className="input"
              placeholder="Email"
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />

            <button className="btn mt-4">Sign Up</button>
          </form>
        </div>

        {/* LOGIN */}
       <div
  className={`absolute top-0 left-0 h-full w-1/2 flex items-center justify-center
  transition-all duration-700
  ${isSignup ? "translate-x-full opacity-0 z-0 pointer-events-none" 
             : "opacity-100 z-20 pointer-events-auto"}`}
>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center px-12 text-center w-full"
          >
            <h1 className="text-2xl font-bold mb-4">Sign In</h1>

            <input
              className="input"
              placeholder="Email"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              className="input"
              placeholder="Password"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            <button className="btn mt-4">Sign In</button>
            <button
  type="button"
  onClick={handleDemoLogin}
  className="mt-3 px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
>
  🚀 Try Demo
</button>

          </form>
        </div>

        {/* OVERLAY */}
        <div
          className={`absolute top-0 left-1/2 w-1/2 h-full transition-transform duration-700 ${
            isSignup ? "-translate-x-full" : ""
          } bg-gradient-to-r from-[#FF4B2B] to-[#FF416C] text-white`}
        >
          <div className="h-full flex">
            <div className="w-1/2 flex flex-col items-center justify-center px-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
              <button
                className="border px-6 py-2 rounded"
                onClick={() => setIsSignup(false)}
              >
                Sign In
              </button>
            </div>

            <div className="w-1/2 flex flex-col items-center justify-center px-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Hello, Friend!</h2>
              <button
                className="border px-6 py-2 rounded"
                onClick={() => setIsSignup(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Auth;
