import { useState } from "react";

function Likes(){
    const [isLike ,setIsLike] = useState(false);
    const [count, setCount] = useState(0);

    const handleLike = ()=>{
        setIsLike(true);
        setCount(count+1);
    }
    const handleUnLike= ()=>{
        setIsLike(false);
        setCount(0);
    }
    return (
        <>
        {!isLike ? <button onClick={handleLike}>Like</button> : <button onClick={handleUnLike}>Un Like</button>  }
       <p>{count}</p>
        </>
        
    )

}

export default Likes;