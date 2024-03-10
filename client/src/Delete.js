import React, { useState } from "react";

function Delete() {
  const [userId, setUserId] = useState("");

  const handleChange = (e) => {
    setUserId(e.target.value);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/deleteUser/${userId}`, {
        method: "DELETE"
      });
      if (response.ok) {
        console.log("User deleted successfully");
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
      <h2>Delete User</h2>
      <input
        type="text"
        value={userId}
        onChange={handleChange}
        placeholder="Enter User ID"
      />
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
}

export default Delete;
