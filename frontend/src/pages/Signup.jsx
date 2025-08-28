import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // ✅ initialize navigation

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await api.post("/auth/register", formData);
      alert("Account created successfully!");
      navigate("/login"); // ✅ redirect after signup
    } catch (err) {
      alert(err.response?.data?.msg || "Signup failed"); // backend sends {msg:"..."}
    }
  };

  return (
    <div className="flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <h2 className="mt-6 text-center text-3xl font-bold text-white">
        Create your Account
      </h2>
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-4 max-w-md mx-auto"
      >
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-4 py-2 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />
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
        <input
          type="password"
          id="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm your password"
          className="w-full px-4 py-2 border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
        />

        <button
          type="submit"
          className="w-full bg-emerald-500 text-white py-2 rounded-2xl hover:bg-emerald-600 transition"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-8 text-center text-sm text-white">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-medium text-white hover:text-emerald-300"
        >
          Login Here
        </Link>
      </p>
    </div>
  );
};

export default Signup;
