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

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  // 🔐 LOGIN FUNCTION
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
    if (loggedIn) {
      fetchData();
    }
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
    await fetch(`${BASE_URL}/attendance/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // 📊 PERCENTAGE
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
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button onClick={login}>Login</button>
      </div>
    );
  }

  // ✅ MAIN APP UI
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
        fontFamily: "Arial",
      }}
    >
      <h1>test version</h1>

      {/* INPUT SECTION */}
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

      <button
        onClick={submitHandler}
        style={{
          padding: "10px 20px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Submit
      </button>

      {/* RECORDS */}
      <h2 style={{ marginTop: "30px" }}>Records</h2>

      {data.map((item) => (
        <div key={item._id} style={{ marginBottom: "10px" }}>
          {item.name} - {item.status}
          <button
            onClick={() => deleteRecord(item._id)}
            style={{
              marginLeft: "10px",
              color: "red",
              border: "none",
              cursor: "pointer",
              background: "transparent",
            }}
          >
            ❌
          </button>
        </div>
      ))}

      {/* PERCENTAGE */}
      <h3 style={{ marginTop: "20px" }}>
        Attendance %: {percentage}%
      </h3>
    </div>
  );
}

export default App;