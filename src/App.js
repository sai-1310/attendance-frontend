import { useEffect, useState } from "react";

function App() {
  // 🔐 LOGIN STATES
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 📊 APP STATES
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState(""); // 🔍 SEARCH STATE

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  // 🔐 LOGIN
  const login = async () => {
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const result = await res.json();

    if (result.success) {
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  };

  // 🔄 FETCH DATA
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/attendance`);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    if (loggedIn) fetchData();
  }, [loggedIn]);

  // ➕ ADD / UPDATE
  const submitHandler = async () => {
    if (!name) {
      alert("Enter name");
      return;
    }

    await fetch(`${BASE_URL}/attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, status }),
    });

    setName("");
    fetchData();
  };

  // ❌ DELETE
  const deleteRecord = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    await fetch(`${BASE_URL}/attendance/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  // 📊 CALCULATIONS
  const total = data.length;
  const present = data.filter((d) => d.status === "Present").length;
  const percentage = total ? ((present / total) * 100).toFixed(1) : 0;

  // 🔐 LOGIN UI
  if (!loggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: "10px", margin: "10px" }}
        />

        <br />

        <button
          onClick={login}
          style={{
            padding: "10px 20px",
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    );
  }

  // ✅ MAIN UI
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      {/* 🔴 LOGOUT */}
      <button
        onClick={() => setLoggedIn(false)}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          padding: "8px 12px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Logout
      </button>

      <h1>🔥 Attendance System</h1>

      {/* INPUT */}
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ padding: "10px", margin: "10px" }}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        style={{ padding: "10px" }}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <br /><br />

      {/* SUBMIT */}
      <button
        onClick={submitHandler}
        style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {/* 🔍 SEARCH */}
      <input
  placeholder="Search name"
  onChange={(e) => setSearch(e.target.value)}
  style={{ padding: "10px", margin: "10px" }}
/>
      {/* RECORDS */}
     {/* RECORDS */}
<h2 style={{ marginTop: "30px" }}>Records</h2>

{data
  .filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  )
  .map((item) => (
    <div
      key={item._id}
      style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        margin: "10px auto",
        width: "300px",
      }}
    >
      {item.name} - {item.status}

      <button
        onClick={() => deleteRecord(item._id)}
        style={{
          marginLeft: "10px",
          background: "red",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "25px",
          height: "25px",
          cursor: "pointer",
        }}
      >
        X
      </button>
    </div>
  ))}

      {/* STATS */}
      <h3 style={{ marginTop: "20px" }}>
        Attendance %: {percentage}%
      </h3>

      <p>Present: {present}</p>
      <p>Absent: {total - present}</p>
    </div>
  );
}

export default App;