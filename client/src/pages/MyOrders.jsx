import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await API.get("/orders/my-orders");
      console.log("Orders:", res.data.orders);
      setOrders(res.data.orders || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#ff9800";
      case "Accepted":
        return "#2196f3";
      case "Preparing":
        return "#9c27b0";
      case "Ready":
        return "#4caf50";
      case "Completed":
        return "#2e7d32";
      default:
        return "#757575";
    }
  };

  return (
    <div className="orders-container">
      <h1>📦 My Orders</h1>

      {orders.length === 0 ? (
        <h2>No Orders Found</h2>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order._id}>
              {order.food ? (
                <>
                  <img
                    src={order.food.image}
                    alt={order.food.name}
                  />

                  <h2>{order.food.name}</h2>

                  <p>{order.food.category}</p>
                </>
              ) : (
                <>
                  <img
                    src="https://via.placeholder.com/300x200?text=Food+Unavailable"
                    alt="Food Unavailable"
                  />

                  <h2>Food Unavailable</h2>

                  <p>This food item has been removed.</p>
                </>
              )}

              <h3>₹ {order.totalPrice}</h3>

              <p>Quantity : {order.quantity}</p>

              <p>
                Ordered:{" "}
                {new Date(order.createdAt).toLocaleString()}
              </p>

              <div
                className="status"
                style={{
                  background: getStatusColor(order.status),
                }}
              >
                {order.status}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="back-home">
        <button onClick={() => navigate("/home")}>
          🍔 Order More Food
        </button>
      </div>
    </div>
  );
}

export default MyOrders;