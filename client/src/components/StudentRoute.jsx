import { Navigate } from "react-router-dom";

function StudentRoute({ children }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(localStorage.getItem("user"));

    if (!token) {
        return <Navigate to="/" replace />;
    }

    if (user.role !== "student") {
        return <Navigate to="/admin" replace />;
    }

    return children;
}

export default StudentRoute;