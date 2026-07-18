import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ManageFoods.css";
import Sidebar from "../components/Sidebar";
import "../styles/AdminDashboard.css";

function ManageFoods() {
  const [foods, setFoods] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
const [editId, setEditId] = useState("");

  const [foodData, setFoodData] = useState({
  name: "",
  description: "",
  category: "",
  price: "",
});

const [image, setImage] = useState(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const res = await API.get("/foods");
      setFoods(res.data.foods);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteFood = async (id) => {
    const confirmDelete = window.confirm("Delete this food item?");

    if (!confirmDelete) return;

    try {
      await API.delete(`/foods/${id}`);
      fetchFoods();
    } catch (err) {
      alert("Unable to delete food");
    }
  };

  const handleChange = (e) => {
    setFoodData({
      ...foodData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddFood = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("category", foodData.category);
    formData.append("price", foodData.price);

    if (image) {
      formData.append("image", image);
    }

    await API.post("/foods", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Food Added Successfully");

    fetchFoods();

    setShowModal(false);

    setFoodData({
      name: "",
      description: "",
      category: "",
      price: "",
    });

    setImage(null);

  } catch (err) {
    alert(err.response?.data?.message || "Failed to Add Food");
  }
};

  const handleEdit = (food) => {
  setFoodData({
  name: food.name,
  description: food.description,
  category: food.category,
  price: food.price,
});

setImage(null);

  setEditId(food._id);
  setIsEdit(true);
  setShowModal(true);
};

const handleUpdateFood = async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData();

    formData.append("name", foodData.name);
    formData.append("description", foodData.description);
    formData.append("category", foodData.category);
    formData.append("price", foodData.price);

    if (image) {
      formData.append("image", image);
    }

    await API.put(`/foods/${editId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    alert("Food Updated Successfully");

    fetchFoods();

    setShowModal(false);

    setIsEdit(false);

    setFoodData({
      name: "",
      description: "",
      category: "",
      price: "",
    });

    setImage(null);

  } catch (err) {
    alert(err.response?.data?.message || "Update Failed");
  }
};

const handleImageChange = (e) => {
  setImage(e.target.files[0]);
};

  return (
    <div className="dashboard">
    <Sidebar />

    <div className="main">
    <div className="food-page">
      <div className="food-header">
        <h1>🍔 Manage Foods</h1>

        <button
  className="add-btn"
  onClick={() => {
    setIsEdit(false);

    setFoodData({
      name: "",
      description: "",
      category: "",
      price: "",
    });

    setImage(null);

    setShowModal(true);
  }}
>
  + Add Food
</button>
      </div>

      <div className="food-grid">

  {foods.map((food) => (

    <div className="food-card" key={food._id}>

      <img
        src={food.image || "https://via.placeholder.com/300x200"}
        alt={food.name}
      />

      <div className="food-details">

        <h2>{food.name}</h2>

        <p>{food.description}</p>

        <h4>🍽 {food.category}</h4>

        <h3>₹ {food.price}</h3>

        <div className="food-buttons">

          <button
            className="edit-btn"
            onClick={() => handleEdit(food)}
          >
            ✏️ Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => deleteFood(food._id)}
          >
            🗑 Delete
          </button>

        </div>

      </div>

    </div>

  ))}

</div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{isEdit ? "Edit Food Item" : "Add Food Item"}</h2>

            <form onSubmit={isEdit ? handleUpdateFood : handleAddFood}>
              <input
                type="text"
                placeholder="Food Name"
                name="name"
                value={foodData.name}
                onChange={handleChange}
                required
              />

              <textarea
                placeholder="Food Description"
                name="description"
                value={foodData.description}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Category"
                name="category"
                value={foodData.category}
                onChange={handleChange}
                required
              />

              <input
                type="number"
                placeholder="Price"
                name="price"
                value={foodData.price}
                onChange={handleChange}
                required
              />

              <input
  type="file"
  accept="image/*"
  onChange={handleImageChange}
/>

              <div className="modal-buttons">
  <button type="submit" className="save-btn">
    {isEdit ? "Update" : "Save"}
  </button>

  <button
    type="button"
    className="cancel-btn"
    onClick={() => {
      setShowModal(false);
      setIsEdit(false);

      setFoodData({
        name: "",
        description: "",
        category: "",
        price: "",
      });

      setImage(null);
    }}
  >
    Cancel
  </button>
</div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
    </div> 
  );
}

export default ManageFoods;