import React, { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import AdminPage from "./pages/AdminPage";
import { ToastContainer } from "react-toastify";
import ProductDetails from "./pages/ProductDetails";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import Footer from "./components/Footer";
import MyOrders from "./pages/MyOrders";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

  const updateAuth = () => {
    setToken(localStorage.getItem("token"));
    setRole(localStorage.getItem("role"));
  };

  useEffect(() => {
    const syncAuth = () => updateAuth();
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* ✅ Pass updateAuth */}
      <Navbar updateAuth={updateAuth} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={!token ? <Signup updateAuth={updateAuth} /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!token ? <Login updateAuth={updateAuth} /> : <Navigate to="/" />}
        />
        <Route
          path="/secret-dashboard"
          element={token && role === "admin" ? <AdminPage /> : <Navigate to="/login" />}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:category" element={<ProductsPage />} />
        <Route path="/products/details/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={token ? <MyOrders /> : <Navigate to="/login" />} />
      </Routes>

      {/* ✅ Toast Container outside Routes */}
      <ToastContainer />
      <Footer />
    </div>
  );
};

export default App;
