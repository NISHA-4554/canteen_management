import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/Profile.css";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaUserTag,
  FaEdit,
  FaSave,
} from "react-icons/fa";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await API.get("/auth/profile");
      setUser(res.data.user);
    } catch (error) {
      console.log(error);
    }
  };

 const handleUpdate = async () => {
  try {
    const res = await API.put("/auth/profile", {
      name: user.name,
      email: user.email,
    });

    console.log("Response:", res.data);

    setUser(res.data.user);
    setEditing(false);
    alert("Profile Updated Successfully");
  } catch (error) {
    console.log(error);
  }
};

  return (
  <div className="profile-page">

    <div className="profile-card">

      <div className="profile-top">

        <div className="profile-left">

          <FaUserCircle className="avatar"/>

          <h2>{user.name}</h2>

          <span className="role">{user.role}</span>

        </div>

        <div className="profile-right">

          {!editing ? (
            <button
              className="edit-btn"
              onClick={() => setEditing(true)}
            >
              <FaEdit />
              Edit Profile
            </button>
          ) : (
            <button
              className="save-btn"
              onClick={handleUpdate}
            >
              <FaSave />
              Save Changes
            </button>
          )}

        </div>

      </div>

      <div className="profile-details">

        <div className="info-card">

          <label>
            <FaUser />
            Full Name
          </label>

          {editing ? (
            <input
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />
          ) : (
            <p>{user.name}</p>
          )}

        </div>

        <div className="info-card">

          <label>
            <FaEnvelope />
            Email Address
          </label>

          {editing ? (
            <input
              value={user.email}
              onChange={(e) =>
                setUser({
                  ...user,
                  email: e.target.value,
                })
              }
            />
          ) : (
            <p>{user.email}</p>
          )}

        </div>

        <div className="info-card">

          <label>
            <FaUserTag />
            Role
          </label>

          <p>{user.role}</p>

        </div>

      </div>

    </div>

  </div>
);
}

export default Profile;