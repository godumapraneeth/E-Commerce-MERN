import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";
import axios from "axios";

const CartPage = () => {
  const { cart, removeFromCart, clearCart, updateQuantity } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate=useNavigate();


  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to place an order");
        navigate("/login");
        return;
      }

      // prepare payload
      const orderData = {
        products: cart.map((item) => ({
          product: item._id,
          quantity: item.quantity,
        })),
        totalAmount: totalPrice,
      };

      // send to backend
      const res = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.status === 201) {
        alert(
          `Order placed with ${
            paymentMethod === "cod" ? "Cash on Delivery" : "Online Payment"
          }!`
        );
        clearCart();
        navigate("/my-orders"); // redirect user to orders page
      }
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      alert("Failed to place order. Please try again.");
    }
  };


  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-14 text-center">
        <h2 className="font-bold mt-6 text-4xl text-gray-300">Your cart is empty.</h2>
        <Link
          to="/"
          className="mt-6 inline-block bg-emerald-800 px-6 py-3 rounded-lg text-white"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <h2 className="text-3xl font-bold mt-8 mb-6 text-emerald-400">Your Cart</h2>

      <div className="space-y-6">
        {cart.map((item) => (
          <div
            key={item._id}
            className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageUrl || item.image || "/placeholder.jpg"}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-400">₹{item.price}</p>

                {/* Quantity controls */}
                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() => updateQuantity(item._id, "decrease")}
                    className="bg-gray-700 px-3 py-1 rounded-lg text-white text-lg"
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "increase")}
                    className="bg-gray-700 px-3 py-1 rounded-lg text-white text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="text-white font-semibold">
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="mt-8 p-4 bg-gray-900 rounded-lg">
        <p className="text-xl font-semibold">Total: ₹{totalPrice}</p>
      </div>

      {/* Payment Options */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Select Payment Method</h3>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on Delivery
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Online Payment
          </label>
        </div>
      </div>

      {/* Place Order */}
      <div className="mt-8">
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl text-lg font-semibold"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartPage;
