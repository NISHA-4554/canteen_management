import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import ManageFoods from "./pages/ManageFoods";
import ManageOrders from "./pages/ManageOrders";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Users from "./pages/Users";
import AdminLayout from "./components/AdminLayout";
import Profile from "./pages/Profile";

// import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
import StudentRoute from "./components/StudentRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Student Routes */}
      <Route
        path="/home"
        element={
          <StudentRoute>
            <Home />
          </StudentRoute>
        }
      />

      <Route
        path="/cart"
        element={
          <StudentRoute>
            <Cart />
          </StudentRoute>
        }
      />
      <Route
  path="/profile"
  element={
    <StudentRoute>
      <Profile />
    </StudentRoute>
  }
/>
<Route
  path="/admin/profile"
  element={
    <AdminRoute>
      <Profile />
    </AdminRoute>
  }
/>

      <Route
        path="/checkout"
        element={
          <StudentRoute>
            <Checkout />
          </StudentRoute>
        }
      />

      <Route
        path="/orders"
        element={
          <StudentRoute>
            <MyOrders />
          </StudentRoute>
        }
      />

      {/* Admin Routes */}
      <Route
  element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
>
  <Route path="/admin" element={<AdminDashboard />} />
  
</Route>

      <Route
        path="/manage-foods"
        element={
          <AdminRoute>
            <ManageFoods />
          </AdminRoute>
        }
      />

      <Route
        path="/manage-orders"
        element={
          <AdminRoute>
            <ManageOrders />
          </AdminRoute>
        }
      />
      <Route
  path="/users"
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  }
/>

      {/* Page Not Found */}
      <Route path="*" element={<h2>404 - Page Not Found</h2>} />
    </Routes>
  );
}

export default App;