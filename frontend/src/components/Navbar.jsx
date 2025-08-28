import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ updateAuth }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const name = localStorage.getItem("name");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    if (updateAuth) updateAuth(); // ✅ sync App state
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-900 bg-opacity-90 backdrop-blur-2xl border-b border-emerald-800 z-50">
      <nav className="flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <Link
          to="/"
          className="text-2xl font-bold text-emerald-400 flex items-center space-x-2"
        >
          E-Commerce
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-lg text-gray-200 hover:text-emerald-400 transition"
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="text-lg text-gray-200 hover:text-emerald-400 transition"
          >
            Cart
          </Link>

          {role === "admin" && (
            <Link
              to="/secret-dashboard"
              className="text-lg text-gray-200 hover:text-emerald-400 transition"
            >
              Dashboard
            </Link>
          )}
          {token && (
  <Link
    to="/my-orders"
    className="text-lg text-gray-200 hover:text-emerald-400 transition"
  >
    My Orders
  </Link>
)}

          {token ? (
            <>
              <span className="text-gray-300">Hi, {name}</span>
              <button
                onClick={handleLogout}
                className="text-lg text-red-400 hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-lg text-gray-200 hover:text-emerald-400 transition"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
