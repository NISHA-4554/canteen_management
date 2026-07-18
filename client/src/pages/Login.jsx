import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaHamburger } from "react-icons/fa";
import API from "../services/api";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // alert("Login Successful");

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/home");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="login-container">

      <form className="login-card" onSubmit={handleLogin}>

        <div className="logo">
          <FaHamburger />
        </div>

        <h1>Canteen Ordering</h1>

        <p className="subtitle">
          Fresh Food • Fast Service
        </p>

        <div className="input-box">
          <FaEnvelope />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <FaLock />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <span
            className="eye-icon"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {
              showPassword
              ? <FaEyeSlash/>
              : <FaEye/>
            }
          </span>

        </div>

        <button className="login-btn">
          Login
        </button>

        <div className="bottom-text">

          Don't have an account?

          <Link to="/register">
             Register
          </Link>

        </div>

      </form>

    </div>
  );
}

export default Login;