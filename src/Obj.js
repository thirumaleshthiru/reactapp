import React from "react";
import {useState} from "react"

function Obj(){

    const [user, setUser] = useState({})
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const addData = ()=>{
        setUser({name, password})
    }

    return(
        <>
            <input 
                value={name}
                type="text"
                onChange={(e)=>{setName(e.target.value)}}
            />   
             <input 
                value={password}
                type="password"
                onChange={(e)=>{setPassword(e.target.value)}}
            />   
            <button onClick={()=>{addData()}}>Add</button>  
            {name==='' || password === '' ? <p>{''}</p> : <div>
                <p>{user.name}</p>
                <p>{user.password}</p>    
            </div>}
        </>
    )


}

export default Obj;