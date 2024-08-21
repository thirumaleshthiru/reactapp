import { useState } from "react";

function Dark(){

    const [darkmode, isDarkMode] = useState(false);

    const handleClick = ()=>{
        isDarkMode(!darkmode)
    }

    return (
        <>
        {darkmode ? <div><h1>Dark Mode</h1> <button onClick={()=>handleClick()}>Light</button></div> :<div><h1>Light Mode</h1> <button onClick={()=>handleClick()}>Dark</button></div> }
        
        </>
        
    );

}

export default Dark;