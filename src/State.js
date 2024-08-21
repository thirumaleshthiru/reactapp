import { useState } from "react";

function State(){

    const [login, isLogin] = useState(false);

    const Login = ()=>{
        isLogin(true)
    }
    const Logout = ()=>{
        isLogin(false)
    }

    return (
        <>
            <button onClick={Login}>Open</button>
            <button onClick={Logout}>Close</button>
            <p>{login ? <ul>
               <li>Hello</li> 
               <li>Hello</li> 
               <li>Hello</li> 
            </ul>:""}</p>
        </>
    );

}

export default State;