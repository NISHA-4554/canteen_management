const express = require("express");
const router = express.Router();

const {
  placeOrder,
  getMyOrders,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

// Place Order
router.post("/", protect, placeOrder);
//get my order
router.get("/my", protect, getMyOrders);

module.exports = router;



