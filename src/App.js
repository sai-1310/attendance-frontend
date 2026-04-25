import { useEffect, useState } from "react";

function App() {
  // 🔐 LOGIN
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 📊 DATA
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null); // ✅ EDIT STATE

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
    if (result.success) setLoggedIn(true);
    else alert("Invalid login");
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

  // ➕ ADD / ✏️ UPDATE
  const submitHandler = async () => {
    if (!name) return alert("Enter name");

    if (editId) {
      // ✏️ UPDATE
      await fetch(`${BASE_URL}/attendance/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status }),
      });

      setEditId(null);
    } else {
      // ➕ CREATE
      await fetch(`${BASE_URL}/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, status }),
      });
    }

    setName("");
    fetchData();
  };

  // ❌ DELETE
  const deleteRecord = async (id) => {
    if (!window.confirm("Delete?")) return;

    await fetch(`${BASE_URL}/attendance/${id}`, {
      method: "DELETE",
    });

    fetchData();
  };

  // 📊 STATS
  const total = data.length;
  const present = data.filter((d) => d.status === "Present").length;
  const absent = total - present;
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

  // ✅ MAIN UI
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      {/* LOGOUT */}
      <button
        onClick={() => setLoggedIn(false)}
        style={{ position: "absolute", top: "20px", right: "20px" }}
      >
        Logout
      </button>

      <h1>app edit feature</h1>

      {/* INPUT */}
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option>Present</option>
        <option>Absent</option>
      </select>

      <br /><br />

      <button onClick={submitHandler}>
        {editId ? "Update" : "Submit"}
      </button>

      {/* SEARCH */}
      <br /><br />
      <input
        placeholder="Search name"
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* RECORDS */}
      <h2>Records</h2>

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

            {/* ✏️ EDIT BUTTON */}
            <button
              onClick={() => {
                setName(item.name);
                setStatus(item.status);
                setEditId(item._id);
              }}
              style={{ marginLeft: "10px" }}
            >
              ✏️
            </button>

            {/* ❌ DELETE BUTTON */}
            <button
              onClick={() => deleteRecord(item._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              ❌
            </button>
          </div>
        ))}

      {/* STATS */}
      <h3>Attendance %: {percentage}%</h3>
      <p>Present: {present}</p>
      <p>Absent: {absent}</p>
    </div>
  );
}

export default App;