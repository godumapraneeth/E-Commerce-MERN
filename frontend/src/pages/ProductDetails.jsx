import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import useCartStore from "../stores/useCartStore";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCartStore();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-gray-400 text-center mt-10">Loading product...</p>;
  }

  const handleAddToCart = () => {
    addToCart(product);
    navigate("/cart"); // ✅ redirect after adding
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src={product.imageUrl || product.image || "/placeholder.jpg"}
            alt={product.name}
            className="w-full max-w-md h-[400px] mt-8 object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Info */}
        <div>
          <h2 className="text-4xl font-bold text-emerald-400 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            {product.description}
          </p>
          <p className="mt-6 text-3xl font-semibold text-white">
            ₹{product.price}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Category: <span className="capitalize">{product.category}</span>
          </p>

          {/* Action button */}
          <div className="mt-8">
            <button
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 px-6 rounded-xl text-lg font-semibold"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
