// Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const Login = ({ updateAuth }) => {   // ✅ receive updateAuth from App
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/login", formData);

      // Save token & user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.user.role);
      localStorage.setItem("name", res.data.user.name);

      // ✅ Tell App.jsx to refresh auth state
      if (updateAuth) updateAuth();

      alert("Login successful!");
      navigate("/"); // redirect to home
    } catch (err) {
      alert(err.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-bold text-white">
        Login to your Account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 max-w-md mx-auto"
      >
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="w-full px-4 py-2 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-emerald-500 hover:bg-emerald-600"
          } text-white py-2 rounded-2xl transition`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-white">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-medium text-white hover:text-emerald-300"
        >
          Signup Here
        </Link>
      </p>
    </div>
  );
};

export default Login;
