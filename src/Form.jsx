import axios from "axios";
import { useState } from "react";

function Form() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleName = (name) => {
    if (name !== "") {
      setName(name);
    } else {
      alert("Name is required");
    }
  };

  const handlePassword = (password) => {
    if (password) {
      setPassword(password);
    } else {
      alert("Password is required");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    if (!name || !password) {
      setError("Name and password are required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/postdata", {
        name,
        password,
      });

      console.log(response.data);
      alert("Form submitted successfully!");

    } catch (error) {
      console.error("There was an error submitting the form!", error);
      alert("Error submitting the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(e) => handleName(e.target.value)}
        />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => handlePassword(e.target.value)}
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default Form;
