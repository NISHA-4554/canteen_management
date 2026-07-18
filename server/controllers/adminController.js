const User = require("../models/User");
const Food = require("../models/Food");
const Order = require("../models/Order");

// Dashboard Statistics
const getDashboardStats = async (req, res) => {
  try {
    const [
      totalUsers,
      totalFoods,
      totalOrders,
      revenueResult,
    ] = await Promise.all([
      User.countDocuments(),
      Food.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        {
          $group: {
            _id: null,
            revenue: { $sum: "$totalPrice" },
          },
        },
      ]),
    ]);

    res.status(200).json({
      success: true,
      totalUsers,
      totalFoods,
      totalOrders,
      revenue: revenueResult.length ? revenueResult[0].revenue : 0,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
    });
  }
};

// Recent Orders
const getRecentOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name")
      .populate("food", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json(orders);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Unable to fetch recent orders",
    });
  }
};

// Order Status Analytics
const getOrderStatusStats = async (req, res) => {
  try {
    const stats = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      stats,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch analytics",
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch users",
    });
  }
};


const getTopFoods = async (req, res) => {
  try {
    const topFoods = await Order.aggregate([
      {
        $group: {
          _id: "$food",
          totalOrders: { $sum: 1 }
        }
      },
      {
        $sort: {
          totalOrders: -1
        }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "foods",
          localField: "_id",
          foreignField: "_id",
          as: "food"
        }
      },
      {
        $unwind: "$food"
      },
      {
        $project: {
          _id: 0,
          foodName: "$food.name",
          image: "$food.image",
          totalOrders: 1
        }
      }
    ]);

    res.json(topFoods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getRecentOrders,
  getOrderStatusStats,
  getAllUsers,
  getTopFoods
};