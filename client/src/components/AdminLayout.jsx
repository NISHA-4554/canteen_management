import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div className="dashboard">
      <Sidebar />

      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;