import "../styles/AdminDashboard.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";
import OrderStatusChart from "../components/OrderStatusChart";
// import Sidebar from "../components/Sidebar";
function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
//   const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalFoods: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);

      const [statsRes, ordersRes] = await Promise.all([
        API.get("/admin/dashboard"),
        API.get("/admin/recent-orders"),
      ]);

      setStats(statsRes.data);
      setRecentOrders(ordersRes.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/");
//   };

  const filteredOrders = recentOrders.filter((order) => {
    const studentName = order.user?.name?.toLowerCase() || "";
    const foodName = order.food?.name?.toLowerCase() || "";

    const matchesSearch =
      studentName.includes(search.toLowerCase()) ||
      foodName.includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  return (
    <div>
    
        <div className="header">
          <h1>Dashboard</h1>
          <h3>Welcome, {user?.name}</h3>
        </div>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Foods</h3>
            <p>{stats.totalFoods}</p>
          </div>

          <div className="card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>

          <div className="card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="card">
            <h3>Total Revenue</h3>
            <p>₹ {stats.revenue}</p>
          </div>
        </div>

        {/* Recent Orders
        <div className="recent-orders">
          <h2>Recent Orders</h2>

          <div className="filter-bar">
            <input
              type="text"
              placeholder="🔍 Search student or food..."
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
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order._id}>
                    <td>{order.user?.name || "N/A"}</td>
                    <td>{order.food?.name || "Deleted Food"}</td>
                    <td>{order.tableNumber}</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No matching orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div> */}

        <div className="chart-section">
    <h2>Order Status</h2>

    <OrderStatusChart orders={recentOrders}/>
</div>
     </div>
  );
}

export default AdminDashboard;