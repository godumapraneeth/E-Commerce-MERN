import { create } from "zustand";

const useCartStore = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find((item) => item._id === product._id);
      if (existing) {
        return {
          cart: state.cart.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    }),

  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item._id !== id),
    })),

  clearCart: () => set({ cart: [] }),

  updateQuantity: (id, type) =>
    set((state) => ({
      cart: state.cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity:
                  type === "increase"
                    ? item.quantity + 1
                    : Math.max(item.quantity - 1, 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0),
    })),
}));

export default useCartStore;
