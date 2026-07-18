const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const {
  addFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../controllers/foodController");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// Admin Routes
router.post(
  "/",
  protect,
  adminOnly,
  upload.single("image"),
  addFood
);
router.put(
  "/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateFood
);
router.delete("/:id", protect, adminOnly, deleteFood);

// Student Routes
router.get("/", getAllFoods);
router.get("/:id", getFoodById);

module.exports = router;