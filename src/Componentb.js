import { useState, createContext } from "react";
const name = createContext()
function Componentb(){
    const[data, setData] = useState("Ram");
    <name.Provider value={data}>
        <h1>{`Hello ${data}!`}</h1>
       <Componentb name={data} />
     </name.Provider>
}