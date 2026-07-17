const express = require("express");
const router = express.Router();

const {
  addFood,
  getAllFoods,
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");

// Admin - Add Food
router.post("/", protect, addFood);

// Student/Admin - Get All Foods
router.get("/", getAllFoods);

module.exports = router;