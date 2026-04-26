import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: ""
  });

  const navigate = useNavigate();

  const login = async () => {
    try {
      console.log("Sending request...");
      console.log("USER DATA:", user);

      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
      });

      console.log("STATUS:", res.status);

      if (!res.ok) {
        throw new Error("Server not responding");
      }

      const data = await res.json();
      console.log("DATA:", data);

      if (data.success) {
       localStorage.setItem("token", data.token);
localStorage.setItem("role", data.role);
localStorage.setItem("username", user.username); // ✅ ADD THIS

navigate(data.role === "admin" ? "/dashboard" : "/student");

        navigate(data.role === "admin" ? "/dashboard" : "/student");
      } else {
        alert("Invalid credentials ❌");
      }

    } catch (err) {
      console.error("ERROR:", err);
      alert("Backend connection failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <input
        placeholder="username"
        value={user.username}
        onChange={(e) =>
          setUser({ ...user, username: e.target.value })
        }
      />
      <br /><br />

      <input
        type="password"
        placeholder="password"
        value={user.password}
        onChange={(e) =>
          setUser({ ...user, password: e.target.value })
        }
      />
      <br /><br />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;