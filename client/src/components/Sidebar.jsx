import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="sidebar">
      <h2>🍔 Admin</h2>

      <ul>
        <li onClick={() => navigate("/admin")}>Dashboard</li>

        <li onClick={() => navigate("/manage-foods")}>
          Manage Foods
        </li>

        <li onClick={() => navigate("/manage-orders")}>
          Manage Orders
        </li>

        <li onClick={() => navigate("/users")}>
          Users
        </li>
        <li onClick={() => navigate("/admin/profile")}>Profile</li>

        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );
}

export default Sidebar;