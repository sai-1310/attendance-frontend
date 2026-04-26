import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const login = async () => {
    const res = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify(user)
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      navigate(data.role === "admin" ? "/dashboard" : "/student");
    }
  };

  return (
    <div style={{textAlign:"center",marginTop:"100px"}}>
      <input placeholder="username" onChange={e=>setUser({...user,username:e.target.value})}/>
      <input type="password" placeholder="password" onChange={e=>setUser({...user,password:e.target.value})}/>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;