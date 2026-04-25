import { useState } from "react";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  const register = async () => {
    await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        username,
        password,
        role: "student"
      })
    });

    alert("Registered!");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e)=>setUsername(e.target.value)} />
      <br /><br />
      <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
      <br /><br />
      <button onClick={register}>Register</button>
    </div>
  );
}

export default Register;