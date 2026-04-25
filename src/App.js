import { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function App() {
  // 🔐 LOGIN STATES
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // 📊 DATA STATES
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);
  const [monthly, setMonthly] = useState([]);

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  // =====================
  // 🔐 LOGIN FUNCTION
  // =====================
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
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", result.role);
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  };

  // =====================
  // 🔄 FETCH ATTENDANCE
  // =====================
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/attendance`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const result = await res.json();
    setData(result);
  };

  // =====================
  // 📊 FETCH MONTHLY DATA
  // =====================
  const fetchMonthly = async () => {
    const res = await fetch(`${BASE_URL}/monthly`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const result = await res.json();
    setMonthly(result);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchData();
      fetchMonthly();
    }
  }, [loggedIn]);

  // =====================
  // ➕ ADD / UPDATE
  // =====================
  const submitHandler = async () => {
    if (!name.trim()) {
      alert("Enter name");
      return;
    }

    const url = editId
      ? `${BASE_URL}/attendance/${editId}`
      : `${BASE_URL}/attendance`;

    const method = editId ? "PUT" : "POST";

    await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({ name, status, date }),
    });

    setName("");
    setDate("");
    setEditId(null);

    fetchData();
    fetchMonthly();
  };

  // =====================
  // ❌ DELETE
  // =====================
  const deleteRecord = async (id) => {
    await fetch(`${BASE_URL}/attendance/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    fetchData();
    fetchMonthly();
  };

  // =====================
  // 📊 STATS
  // =====================
  const total = data.length;
  const present = data.filter((d) => d.status === "Present").length;
  const absent = total - present;
  const percentage = total ? ((present / total) * 100).toFixed(1) : 0;

  // =====================
  // 📊 PIE CHART
  // =====================
  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ["green", "red"],
      },
    ],
  };

  // =====================
  // 📊 MONTHLY BAR CHART
  // =====================
  const monthlyData = {
    labels: monthly.map((m) => `Month ${m._id}`),
    datasets: [
      {
        label: "Present",
        data: monthly.map((m) => m.present),
        backgroundColor: "green",
      },
      {
        label: "Absent",
        data: monthly.map((m) => m.absent),
        backgroundColor: "red",
      },
    ],
  };

  // =====================
  // 📤 EXPORT CSV
  // =====================
  const exportCSV = () => {
    const rows = [
      ["Name", "Status", "Date"],
      ...data.map((item) => [
        item.name,
        item.status,
        new Date(item.date).toLocaleDateString(),
      ]),
    ];

    const csv = rows.map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "attendance.csv";
    a.click();
  };

  // =====================
  // 🔐 LOGIN UI
  // =====================
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

  // =====================
  // ✅ MAIN UI
  // =====================
  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>🔥 Attendance Dashboard</h1>

      {/* DASHBOARD CARDS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <div style={{ background: "green", color: "white", padding: "15px", borderRadius: "10px" }}>
          <h3>Present</h3>
          <p>{present}</p>
        </div>

        <div style={{ background: "red", color: "white", padding: "15px", borderRadius: "10px" }}>
          <h3>Absent</h3>
          <p>{absent}</p>
        </div>

        <div style={{ background: "blue", color: "white", padding: "15px", borderRadius: "10px" }}>
          <h3>%</h3>
          <p>{percentage}%</p>
        </div>
      </div>

      <br />

      {/* INPUT */}
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br /><br />

      <button onClick={submitHandler}>
        {editId ? "Update" : "Submit"}
      </button>

      <br /><br />

      {/* SEARCH */}
      <input
        placeholder="Search name"
        onChange={(e) => setSearch(e.target.value)}
      />

      <h2>Records</h2>

      {data
        .filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )
        .map((item) => (
          <div key={item._id} style={{
            background: "#fff",
            padding: "10px",
            margin: "10px auto",
            width: "350px",
            borderRadius: "10px",
            display: "flex",
            justifyContent: "space-between"
          }}>
            <span>
              {item.name} - {item.status} - {new Date(item.date).toLocaleDateString()}
            </span>

            <div>
              <button onClick={() => {
                setName(item.name);
                setStatus(item.status);
                setDate(item.date?.split("T")[0]);
                setEditId(item._id);
              }}>✏️</button>

              <button onClick={() => deleteRecord(item._id)}>❌</button>
            </div>
          </div>
        ))}

      {/* PIE CHART */}
      <div style={{ width: "250px", margin: "20px auto" }}>
        <Pie data={pieData} />
      </div>

      {/* MONTHLY BAR CHART */}
      <div style={{ width: "400px", margin: "20px auto" }}>
        <Bar data={monthlyData} />
      </div>

      {/* EXPORT */}
      <button onClick={exportCSV}>Export to Excel</button>
    </div>
  );
}

export default App;