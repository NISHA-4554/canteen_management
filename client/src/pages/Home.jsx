import { useEffect, useState } from "react";

import API from "../services/api";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaSearch,
  FaUserCircle,
  FaCoffee,
  FaHamburger,
  FaPizzaSlice,
  FaGlassWhiskey,
  FaClipboardList,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

function Home() {
  const [foods, setFoods] = useState([]);
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    const result = foods.filter((food) =>
      food.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredFoods(result);
  }, [search, foods]);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data.foods);
      setFilteredFoods(res.data.foods);
    } catch (err) {
      console.log(err);
    }
  };

  const addToCart = (food) => {

  const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = storedCart.find(
    (item) => item._id === food._id
  );

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    storedCart.push({
      ...food,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(storedCart));

  setCart(storedCart);

  alert("Added to Cart");
};

  const filterCategory = (category) => {
  setSelectedCategory(category);

  if (category === "All") {
    setFilteredFoods(foods);
  } else {
    const result = foods.filter(
      (food) =>
        food.category.toLowerCase() === category.toLowerCase()
    );

    setFilteredFoods(result);
  }
};
const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
};

const categories = [
  { name: "All", icon: "🍽️" },
  { name: "Breakfast", icon: "🍳" },
  { name: "Lunch", icon: "🍛" },
  { name: "Snacks", icon: "🍟" },
  { name: "Drinks", icon: "🥤" },
];

  return (
    <div className="home">

      {/* Navbar */}
      <nav className="navbar">

        <div className="logo">
          🍔 Canteen Ordering
        </div>

        <div className="search-box">
          <FaSearch />

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="nav-right">

          <div
  className="cart"
  onClick={() => navigate("/cart")}
  style={{ cursor: "pointer" }}
>
  <FaShoppingCart />
  <span>{cart.length}</span>
</div>

          <div className="user">

            <FaUserCircle />

            <p>{user?.name}</p>

          </div>

        </div>

      </nav>

      {/* Categories */}

      <div className="categories">

  {categories.map((cat) => (
    <button
      key={cat.name}
      className={
        selectedCategory === cat.name
          ? "category-btn active"
          : "category-btn"
      }
      onClick={() => filterCategory(cat.name)}
    >
      <span>{cat.icon}</span>
      {cat.name}
    </button>
  ))}

  <button
    className="action-btn"
    onClick={() => navigate("/orders")}
  >
    <FaClipboardList />
    My Orders
  </button>

  <button
    className="action-btn"
    onClick={() => navigate("/profile")}
  >
    <FaUser />
    My Profile
  </button>

  <button
    className="logout-btn"
    onClick={handleLogout}
  >
    <FaSignOutAlt />
    Logout
  </button>

</div>

      {/* Food Cards */}

      <div className="food-grid">

        {filteredFoods.map((food) => (

          <div className="food-card" key={food._id}>

            <img
              src={
                food.image ||
                "https://via.placeholder.com/300x200?text=Food"
              }
              alt={food.name}
            />

            <div className="food-content">

              <h2>{food.name}</h2>

              <p>{food.description}</p>

              <h4>{food.category}</h4>

              <h3>₹ {food.price}</h3>

              <button
                onClick={() => addToCart(food)}
              >
                Add To Cart
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Home;