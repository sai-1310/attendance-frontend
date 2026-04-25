const [date, setDate] = useState("");


import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  // LOGIN
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // DATA
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");
  const [date, setDate] = useState("");
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  // LOGIN
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

  // FETCH
  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/attendance`);
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    if (loggedIn) fetchData();
  }, [loggedIn]);

  // ADD / UPDATE
  const submitHandler = async () => {
    if (!name) return alert("Enter name");

    if (editId) {
      await fetch(`${BASE_URL}/attendance/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status, date }),
      });
      setEditId(null);
    } else {
      await fetch(`${BASE_URL}/attendance`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, status, date }),
      });
    }

    setName("");
    setDate("");
    fetchData();
  };

  // DELETE
  const deleteRecord = async (id) => {
    await fetch(`${BASE_URL}/attendance/${id}`, {
      method: "DELETE",
    });
    fetchData();
  };

  // STATS
  const total = data.length;
  const present = data.filter((d) => d.status === "Present").length;
  const absent = total - present;
  const percentage = total ? ((present / total) * 100).toFixed(1) : 0;

  // CHART
  const chartData = {
  labels: ["Present", "Absent"],
  datasets: [
    {
      data: [present, total - present],
      backgroundColor: ["green", "red"],
    },
  ],
};

  // EXPORT CSV
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

  // CARD STYLE
  const card = (color) => ({
    background: color,
    color: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "120px",
    textAlign: "center",
  });


  import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);


const exportCSV = () => {
  const rows = [
    ["Name", "Status"],
    ...data.map((item) => [item.name, item.status]),
  ];

  const csv = rows.map((r) => r.join(",")).join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance.csv";
  a.click();
};
<button onClick={exportCSV}>Export to Excel</button>
  // LOGIN UI
  if (!loggedIn) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Login</h2>
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <br /><br />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <br /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <button onClick={() => setLoggedIn(false)}>Logout</button>

      <h1>new dashbard loaded</h1>

      {/* DASHBOARD CARDS */}
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
  <div style={{ background: "green", color: "white", padding: "15px", borderRadius: "10px" }}>
    <h3>Present</h3>
    <p>{present}</p>
  </div>

  <div style={{ background: "red", color: "white", padding: "15px", borderRadius: "10px" }}>
    <h3>Absent</h3>
    <p>{total - present}</p>
  </div>

  <div style={{ background: "blue", color: "white", padding: "15px", borderRadius: "10px" }}>
    <h3>Attendance %</h3>
    <p>{percentage}%</p>
  </div>
</div>

      {/* INPUT */}
      <input
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
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
          <div
            key={item._id}
            style={{
              background: "#fff",
              padding: "10px",
              margin: "10px auto",
              width: "300px",
              borderRadius: "10px",
            }}
          >
            {item.name} - {item.status} -{" "}
            {new Date(item.date).toLocaleDateString()}

            <button
              onClick={() => {
                setName(item.name);
                setStatus(item.status);
                setDate(item.date?.split("T")[0]);
                setEditId(item._id);
              }}
            >
              
            </button>

            <button onClick={() => deleteRecord(item._id)}>❌</button>
          </div>
        ))}


        <div style={{ width: "300px", margin: "auto" }}>
  <Pie data={chartData} />
</div>

      {/* CHART */}
      <div style={{ width: "300px", margin: "auto" }}>
        <Pie data={chartData} />
      </div>

      {/* EXPORT */}
      <button onClick={exportCSV}>Export to Excel</button>
    </div>
  );
}

export default App;