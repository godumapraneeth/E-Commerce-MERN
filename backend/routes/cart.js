import express from "express";
import Cart from "../models/Cart.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//Add product to cart
router.post("/", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user.id });

    if (!cart) {
      cart = new Cart({
        user: req.user.id,
        products: [{ product: productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    const savedCart = await cart.save();
    res.json(savedCart);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//Get user cart
router.get("/", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id })
      .populate("products.product", "name price image");
    res.json(cart || { products: [] });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//Update quantity
router.put("/:productId", verifyToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === req.params.productId
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
    }

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

//Remove product
router.delete("/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });

    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== req.params.productId
    );

    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

export default router;
