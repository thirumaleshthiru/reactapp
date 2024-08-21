import React from "react";
import { Link } from "react-router-dom";
import data from "./Data.js";

function Home() {
   return (
    <main>
      {data.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <Link to={`/${item.url}`}>See More</Link>
        </div>
      ))}
       
       
    </main>
  );
}

export default Home;
