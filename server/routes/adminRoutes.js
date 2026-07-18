const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getRecentOrders,
  getOrderStatusStats,
  getAllUsers,
  getTopFoods
} = require("../controllers/adminController");



const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/dashboard", protect, adminOnly, getDashboardStats);

router.get("/recent-orders", protect, adminOnly, getRecentOrders);

router.get("/users", protect, adminOnly, getAllUsers);

router.get("/order-status", protect, adminOnly, getOrderStatusStats);
router.get("/top-foods", protect, adminOnly, getTopFoods);

module.exports = router;