import React, { useEffect, useState } from "react";

function App() {
  const [backendData, setBackendData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: ""
  });

  useEffect(() => {
    fetch("/getUsers")
      .then(response => response.json())
      .then(data => setBackendData(data));
  }, []);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    fetch("/postUsers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => {
        console.log("New user created:", data);
        setFormData({
          name: "",
          price: "",
          category: "",
          image: ""
        });
        fetch("/getUsers")
          .then(response => response.json())
          .then(data => setBackendData(data));
      })
      .catch(error => console.error("Error:", error));
  };

  const handleDelete = userId => {
    fetch(`/deleteUser/${userId}`, {
      method: "DELETE"
    })
      .then(response => response.json())
      .then(data => {
        console.log("User deleted:", data);
        fetch("/getUsers")
          .then(response => response.json())
          .then(data => setBackendData(data));
      })
      .catch(error => console.error("Error:", error));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image URL:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button type="submit">Create User</button>
      </form>

      {backendData.length === 0 ? (
        <p>Loading...</p>
      ) : (
        backendData.map(item => (
          <div key={item._id}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={item.name} />
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
