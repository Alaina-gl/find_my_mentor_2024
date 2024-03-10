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
      <h1 className = "title"> Mentor.me 💡</h1> 
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
      <h2 className = "subtitle">Mentors</h2>
      <div className="container" />
      {typeof backendData === "undefined" ? (
        <p>Loading...</p>
      ) : (
        backendData.map((item) => (
          <div className="mentor" key={item._id}>
            <p><b>First Name: </b>{item.name.first}</p>  
            <p><b>Last Name: </b>{item.name.last}</p>
            <p><b>Gender: </b>{item.gender}</p>
            <p><b>Brief Introduction: </b>{item.intro}</p>
            <p><b>Field of Expertise: </b>{item.expertise.map(expertise => expertise).join(', ')}</p>
            <p><b>Proficient Languages: </b>{item.languages.map(language => language).join(', ')}</p>
            <p><b>Time: </b>{item.date} @{item.timeStart.hour}:{item.timeStart.min}-{item.timeEnd.hour}:{item.timeEnd.min}</p>
            <p><b>Virtual Meeting Link: </b> <a href="item.meetingLink">{item.meetingLink}</a></p>
            <p><b>ID: </b>{item.id}</p>
          </div>
        ))
      )}
      <Add onNewUser={handleNewUser} />
      <Delete onDeleteUser={handleDeleteUser} />
    </div>
  );
}

export default App;
