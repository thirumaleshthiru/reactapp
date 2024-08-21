import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import data from "./Data.js";

function BlogsPosts() {
  const { url } = useParams();
  const [content, setContent] = useState(null);

  useEffect(() => {
    const post = data.find((pt) => pt.url === url);
    setContent(post);
  }, [url]);

  return (
    <div>
      <h1>Blog Post</h1>
      {content ? (
        <div>
          <h2>{content.title}</h2>
          <p>{content.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default BlogsPosts;
