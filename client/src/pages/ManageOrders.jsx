import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/ManageOrders.css";
import Sidebar from "../components/Sidebar";
import "../styles/AdminDashboard.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await API.get("/orders");

      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.log(err);
      alert("Unable to update status");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const student = order.user?.name?.toLowerCase() || "";
    const food = order.food?.name?.toLowerCase() || "";

    const matchesSearch =
      student.includes(search.toLowerCase()) ||
      food.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <h2 className="loading">Loading Orders...</h2>;
  }

  return (
    <div className="dashboard">
    <Sidebar />

    <div className="main">
    <div className="manage-orders">
      <div className="top-bar">
        <h1>📦 Manage Orders</h1>

        <button onClick={fetchOrders}>Refresh</button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="🔍 Search Student or Food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Preparing">Preparing</option>
          <option value="Ready">Ready</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Food</th>
            <th>Table</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name || "Deleted User"}</td>

                <td>{order.food?.name || "Deleted Food"}</td>

                <td>{order.tableNumber}</td>

                <td>{order.quantity}</td>

                <td>₹ {order.totalPrice}</td>

                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateStatus(order._id, e.target.value)
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Accepted">Accepted</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Ready">Ready</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No matching orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
}

export default ManageOrders;