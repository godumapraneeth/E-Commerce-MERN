// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const role = localStorage.getItem("role");

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-emerald-800 mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-emerald-400 mb-3">E-Commerce</h2>
          <p className="text-sm text-gray-400">
            Your one-stop shop for everything you need.  
            Shop smart, shop easy with us.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-emerald-300 mb-3">Contact Us</h3>
          <p className="text-sm">📍 123 Market Street, Hyderabad, India, 503003</p>
          <p className="text-sm">📞 +91 98765 43210</p>
          <p className="text-sm">✉️ support@ecommerce.com</p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-emerald-300 mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-emerald-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-emerald-400 transition">Cart</Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-emerald-400 transition">Login</Link>
            </li>
            {role === "admin" && (
              <li>
                <Link to="/secret-dashboard" className="hover:text-emerald-400 transition">Dashboard</Link>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-gray-950 text-gray-500 text-center py-4 border-t border-emerald-900">
        <p className="text-sm">© {new Date().getFullYear()} E-Commerce. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
