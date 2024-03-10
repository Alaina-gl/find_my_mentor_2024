import React, {useEffect, useState} from "react"

function App() {

  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/getUsers").then(
      response => response.json()
    ).then(
    data => {setBackendData(data)}
  )}, [])

  return (
    <div>
      {(typeof backendData === "undefined") ? (
        <p>Loading...</p>
      ) : (
        backendData.map((item) => (
          <div key={item._id}>
            <p>ID: {item.id}</p>
            <p>Name: {item.name}</p>
            <p>Price: ${item.price}</p>
            <p>Category: {item.category}</p>
            <img src={item.image} alt={item.name} />
          </div>
        ))
      )}
    </div>
  )
  
}

export default App;
