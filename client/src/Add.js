import React, { useState } from "react";
import "./Add.css";

function Add() {
  const [formData, setFormData] = useState({
    name: { first: "", last: "" },
    gender: "",
    intro: "",
    expertise: [],
    languages: [],
    date: "",
    timeStart: { hour: "", min: "" },
    timeEnd: { hour2: "", min2: "" },
    meetingLink: "",
    id: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName" || name === "lastName") {
      setFormData((prevData) => ({
        ...prevData,
        name: {
          ...prevData.name,
          [name === "firstName" ? "first" : "last"]: value,
        },
      }));
    } else if (name.startsWith("timeStart") || name.startsWith("timeEnd")) {
      const [prefix, subField] = name.split(".");
      setFormData((prevData) => ({
        ...prevData,
        [prefix]: {
          ...prevData[prefix],
          [subField]: parseInt(value), // convert to integer
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.id || isNaN(formData.id) || parseInt(formData.id) <= 0) {
      alert("ID needs to be entered as a valid positive number");
      return;
    }
    if (!formData.name.first || !formData.name.last) {
      alert("Please enter both first and last names.");
      return;
    }
  
    if (!formData.gender) {
      alert("Please enter the gender.");
      return;
    }
  
    if (!formData.intro) {
      alert("Please enter the introduction.");
      return;
    }
  
    if (formData.expertise.length === 0) {
      alert("Please enter at least one field of expertise.");
      return;
    }
  
    if (formData.languages.length === 0) {
      alert("Please enter at least one proficient language.");
      return;
    }
  
    if (!formData.date) {
      alert("Please enter the day of week available.");
      return;
    }
    
    if (!formData.meetingLink) {
      alert("Please enter the meeting link.");
      return;
    }
  
    try {
      const response = await fetch("/postUsers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log("User created successfully");
        alert("Mentor created successfully.");
        //
      } else {
        console.log("Error creating user");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <h2 className = "subtitle">Add Mentor</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="text"
            name="firstName"
            value={formData.name.first}
            onChange={handleChange}
            placeholder="First Name"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="lastName"
            value={formData.name.last}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            placeholder="Gender"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="intro"
            value={formData.intro}
            onChange={handleChange}
            placeholder="Introduction"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="expertise"
            value={formData.expertise}
            onChange={handleChange}
            placeholder="Field(s) of Expertise"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Proficient Languages"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="Day of Week Available"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="timeStart.hour"
            value={formData.timeStart.hour}
            onChange={handleChange}
            placeholder="Start Hour"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="timeStart.min"
            value={formData.timeStart.min}
            onChange={handleChange}
            placeholder="Start Minute"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="timeEnd.hour2"
            value={formData.timeEnd.hour2}
            onChange={handleChange}
            placeholder="End Hour"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="timeEnd.min2"
            value={formData.timeEnd.min2}
            onChange={handleChange}
            placeholder="End Minute"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="meetingLink"
            value={formData.meetingLink}
            onChange={handleChange}
            placeholder="Meeting Link"
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="ID"
          />
        </div>
        <button className="submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Add;
