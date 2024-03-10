import React, {useEffect, useState} from "react"

import "./App.css"

function App() {

  const [backendData, setBackendData] = useState([]);

  useEffect(() => {
    fetch("/getUsers").then(
      response => response.json()
    ).then(
    data => {setBackendData(data)}
  )}, [])

  return (
    <div className="app">
      <h1>Mentors</h1>
      <div className="container"/>
      {(typeof backendData === "undefined") ? (
        <p>Loading...</p>
      ) : (
        backendData.map((item) => (
          <div className="mentor" key={item._id}>
            <p>First Name: {item.name.first}</p>  
            <p>Last Name: {item.name.last}</p>
            <p>Gender: {item.gender}</p>
            <p>Brief Introduction: {item.intro}</p>
            <p>Field of Expertise: {item.expertise.map(expertise => expertise).join(', ')}</p>
            <p>Proficient Languages: {item.languages.map(language => language).join(', ')}</p>
            <p>Time: {item.date} @{item.timeStart.hour}:{item.timeStart.min}-{item.timeEnd.hour}:{item.timeEnd.min}</p>
            <p>Virtual Meeting Link: {item.meetingLink}</p>
            <p>ID: {item.id}</p>
          </div>
        ))
      )}
    </div>
  )

}

export default App;