const express = require("express");
const router = express.Router();

const {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");


router.put("/:id", protect, updateFood);

// Admin - Add Food
router.post("/", protect, addFood);

// Student/Admin - Get All Foods
router.get("/", getAllFoods);

router.delete("/:id", protect, deleteFood);

module.exports = router;