import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import useProductStore from "../stores/useProductStore";
import useCartStore from "../stores/useCartStore";

const ProductsPage = () => {
  const { category } = useParams();
  const { products, fetchProductsByCategory } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (category) {
      fetchProductsByCategory(category);
    }
  }, [category, fetchProductsByCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-extrabold mb-6 text-center mt-8 capitalize text-white">
        {category} Collection
      </h2>

      {products.length === 0 ? (
        <p className="text-gray-400">No products found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <Link to={`/products/details/${product._id}`}>
                <img
                  src={product.imageUrl || product.image || "/placeholder.jpg"}
                  alt={product.name}
                  className="h-56 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Info */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <p className="text-gray-400 text-sm mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-emerald-400 font-bold mt-2">
                    ₹{product.price}
                  </p>
        
                </div>

                {/* Actions */}
                <div className="mt-4 flex gap-3">

                  <Link
                    to={`/products/details/${product._id}`}
                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-center"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
