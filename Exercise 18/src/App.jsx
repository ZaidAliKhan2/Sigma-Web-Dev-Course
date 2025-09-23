import { useState, useEffect } from "react";
import Card from "./compoents/Card.jsx";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]); // store fetched data

  async function fetchFunc() {
    let res = await fetch("https://jsonplaceholder.typicode.com/posts");
    let data = await res.json();
    setPosts(data);
  }

  useEffect(() => {
    fetchFunc();
  }, []);

  return (
    <>
      <div className="mainContainer">
        {posts.map((element) => (
          <Card
            key={element.id}
            id={element.id}
            title={element.title}
            desc={element.body}
          />
        ))}
      </div>
    </>
  );
}

export default App;
