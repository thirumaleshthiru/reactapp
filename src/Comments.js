import { useState } from "react";
import Likes from "./Likes";

function Comments(){

    const [comments, setComments] = useState([]);
    const [data, getData] = useState(null)

    const handleChange = (e)=>{
        getData(e.target.value);
    }

    const addComment =()=>{
        if(data!==null && data.trim() !== "")
        {
            setComments([...comments, data])
        }        
    }

    const removeComment = (index)=>{
        let newComments = [...comments];
        newComments.splice(index,1);
        setComments(newComments)
    }


    return (
    <>
      <input 
        type="text"
        value={data}
        onChange={handleChange}
        />
        <button onClick={()=>{addComment()}}>Add Comment</button>
        {
            comments.map(( c, index) => (
                <p key={index}>{c} <button onClick={()=>{removeComment(index)}}>Remove</button> <Likes /></p>
            ))
        }
    </>

      
    )
}

export default Comments;