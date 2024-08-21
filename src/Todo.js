import { useState } from "react";
import './Todo.css'

function Todo(){

    const [data, setData] = useState("");
    const [todo, setTodo] = useState([]);

  

    const handleChange = (e)=>{
        setData(e.target.value)
      
    }

    const addTodo = ()=>{
        if(data.trim() === ""){
            alert("Enter a todo")
            return
        }
        setTodo([...todo, data])
        setData("")
    }

    const remove = (index)=>{
        const newTodo = [...todo];
        newTodo.splice(index, 1);
        setTodo(newTodo)
    }

    return (
        <div className="todo">
        <input
            type="text"
            value={data}
            onChange={handleChange}
        />
        <button onClick={addTodo}>Add Todo</button>
        {todo.map((todo, index)=>(
            <li key={index}>{todo} &nbsp; <button onClick={()=>remove(index)}>Remove</button></li>
        ))}
        </div>
    )

}

export default Todo;