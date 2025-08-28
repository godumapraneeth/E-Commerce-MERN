import { create } from "zustand";
import { toast } from "react-toastify";
import axios from "../lib/axios";

const useProductStore = create((set) => ({
  products: [],
  loading: false,

  setProducts: (products) => set({ products }),

  // ✅ Create Product
  createProduct: async (productData) => {
    set({ loading: true });
    try {
      let res;

      if (productData instanceof FormData) {
        res = await axios.post("/products", productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        res = await axios.post("/products", productData);
      }

      set((prevState) => ({
        products: [...prevState.products, res.data],
        loading: false,
      }));
      toast.success("Product created successfully!");
    } catch (error) {
      console.error("Create product error:", error);
      toast.error(error.response?.data?.msg || error.response?.data?.error || "Something went wrong!");
      set({ loading: false });
    }
  },

  // ✅ Fetch Products by Category
  fetchProductsByCategory: async (category) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/products/category/${category}`);
      set({ products: res.data, loading: false });
    } catch (error) {
      console.error("Fetch products error:", error);
      toast.error(error.response?.data?.msg || error.response?.data?.error || "Failed to fetch products!");
      set({ loading: false });
    }
  },
}));

export default useProductStore;
