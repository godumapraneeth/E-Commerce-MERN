import express from "express";
import Order from "../models/Order.js";
import { verifyToken, verifyAdmin } from "../middleware/auth.js";

const router = express.Router();

// 🟢 User creates an order
router.post("/", verifyToken, async (req, res) => {
  try {
    const { products, totalAmount } = req.body;

    const newOrder = new Order({
      user: req.user.id, // from token
      products,
      totalAmount,
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 🟢 User sees ONLY their orders
router.get("/my-orders", verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product", "name price image");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 🔹 Admin: get all orders
router.get("/", verifyAdmin, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product", "name price image");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 🔹 Admin: update order status
router.put("/:id/status", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("products.product");

    if (!updatedOrder) return res.status(404).json({ msg: "Order not found" });

    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// 🔹 Admin: delete order
router.delete("/:id", verifyAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ msg: "Order deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});


// 🔹 Admin: Get analytics
// 🔹 Admin: Get analytics
router.get("/analytics", verifyAdmin, async (req, res) => {
  try {
    // Total Orders
    const totalOrders = await Order.countDocuments();

    // Total Revenue
    const totalRevenueAgg = await Order.aggregate([
      { $group: { _id: null, revenue: { $sum: "$totalAmount" } } }
    ]);
    const totalRevenue = totalRevenueAgg[0]?.revenue || 0;

    // Recent Orders
    const recentOrders = await Order.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email")
      .populate("products.product", "name price image category");

    // 🟢 Category-wise sales breakdown
    const categoryStats = await Order.aggregate([
      { $unwind: "$products" },
      {
        $lookup: {
          from: "products", // collection name in MongoDB
          localField: "products.product",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      { $unwind: "$productDetails" },
      {
        $group: {
          _id: "$productDetails.category",
          totalSales: { $sum: "$products.quantity" },
          revenue: {
            $sum: { $multiply: ["$products.quantity", "$productDetails.price"] }
          }
        }
      },
      { $sort: { revenue: -1 } }
    ]);

    res.json({
      totalOrders,
      totalRevenue,
      recentOrders,
      categoryStats,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});



export default router;
