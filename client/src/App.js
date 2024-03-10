import React, { useEffect, useState } from "react";
import Add from "./Add";
import Delete from "./Delete";
import "./App.css";
import codingIcon from "./images/coding.svg";

function App() {
  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/getUsers")
      .then((response) => response.json())
      .then((data) => {
        setBackendData(data);
      });
  }, []);

  const handleNewUser = (newUser) => {
    setBackendData((prevData) => [...prevData, newUser]);
  };

  const handleDeleteUser = (deletedUserId) => {
    setBackendData((prevData) =>
      prevData.filter((user) => user.id !== deletedUserId)
    );
  };

  return (
    <div className="app">
      <h1>Find My Mentor 💡</h1> 
      {/* Please feel free to change the title here if you can think of a better name! */}
      <img src={codingIcon} alt="Coding Icon" className="codeIcon" />
      <div className="description">
        <p>
          Embark on your programming journey with ease as you delve into a world
          of support and expertise. Our platform seamlessly connects you with
          supportive mentors who are dedicated to guiding you every step of the
          way. Whether you're a novice or an experienced coder, our community
          fosters an inclusive environment where everyone can thrive.
        </p>
      </div>
      <br /> <br />
      <h2>Mentors</h2>
      <div className="container" />
      {typeof backendData === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.map((item) => (
          <div className="mentor" key={item._id}>
            <p>First Name: {item.name.first}</p>
            <p>Last Name: {item.name.last}</p>
            <p>Gender: {item.gender}</p>
            <p>Brief Introduction: {item.intro}</p>
            <p>
              Field of Expertise:{" "}
              {item.expertise.map((expertise) => expertise).join(", ")}
            </p>
            <p>
              Proficient Languages:{" "}
              {item.languages.map((language) => language).join(", ")}
            </p>
            <p>
              Time: {item.date} @{item.timeStart.hour}:{item.timeStart.min}-
              {item.timeEnd.hour}:{item.timeEnd.min}
            </p>
            <p>Virtual Meeting Link: {item.meetingLink}</p>
            <p>ID: {item.id}</p>
          </div>
        ))
      )}
      <Add onNewUser={handleNewUser} />
      <Delete onDeleteUser={handleDeleteUser} />
    </div>
  );
}

export default App;
