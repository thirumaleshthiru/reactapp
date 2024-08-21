import { Routes, Route } from "react-router-dom";
import BlogPosts from "./BlogPosts";
import Home from "./Home";

function Routex() {
  return (
    <Routes>
               
      <Route path="/" element={<Home/>} />
      <Route path="/:url" element={<BlogPosts />} />
    </Routes>
  );
}

export default Routex;
