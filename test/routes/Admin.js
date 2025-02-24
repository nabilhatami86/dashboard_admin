const express = require("express");
const User = require("../model/Users");
const Product = require("../model/Products");
const Order = require("../model/Orders");

const router = express.Router();

router.get("/dashboard", async (req, res) => {
  try {
    // Hitung total pengguna
    const totalUsers = await User.countDocuments();

    // Hitung total produk
    const totalProducts = await Product.countDocuments();

    // Hitung total pendapatan dari semua order yang sukses
    const totalRevenue = await Order.aggregate([
      { $match: { or_status: "delivered" } },
      { $group: { _id: null, total: { $sum: "$or_amount" } } },
    ]);

    res.json({
      totalUsers,
      totalProducts,
      totalRevenue: totalRevenue.length > 0 ? totalRevenue[0].total : 0,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "Error fetching data" });
  }
});

module.exports = router;
