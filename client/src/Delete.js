import React, { useState } from "react";
import "./Delete.css";

function Delete() {
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/deleteUser/${userId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        console.log("User deleted successfully");
        alert("Mentor deleted successfully.");
      } else {
        console.log("Error deleting user");
      }
      setUserId(""); // clear
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div>
      <br />
      <br />
      <h2 className = "subtitle">Delete Mentor</h2>
      <div className="input-container">
        <input
          type="text"
          value={userId}
          onChange={handleChange}
          placeholder="Enter User ID"
        />
      </div>
      <button className="delete-button" onClick={handleDelete}>
        Delete User
      </button>
    </div>
  );
}

export default Delete;
