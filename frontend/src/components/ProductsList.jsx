import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const handleDelete = async (id) => {
  if (!window.confirm("Delete this product?")) return;

  try {
    const token = localStorage.getItem("token"); // get token from storage

    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchProducts();
  } catch (err) {
    console.error("Error deleting product:", err.response?.data || err.message);
    alert(err.response?.data?.msg || "Failed to delete product");
  }
};


  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="space-y-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="flex justify-between items-center bg-gray-700 p-4 rounded-lg"
        >
          <div>
            <h3 className="font-bold">{product.name}</h3>
            <p>₹{product.price}</p>
            <p className="text-gray-400">{product.category}</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => handleDelete(product._id)}
              className="bg-red-500 px-4 py-2 rounded-lg"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
