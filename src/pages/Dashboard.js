

// updated dashboard UI


import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState([]);

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/attendance`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  // 📊 STATS
  const total = data.length;
  const present = data.filter(d => d.status === "Present").length;
  const absent = total - present;

  // 📊 PIE DATA
  const pieData = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [present, absent],
        backgroundColor: ["#22c55e", "#ef4444"],
      },
    ],
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: "220px",
          padding: "20px",
          width: "100%",
          background: "#0f172a",
          color: "white",
          minHeight: "100vh",
        }}
      >
        <h1>Dashboard</h1>

        {/* 🔥 CARDS */}
        <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          <Card title="Present" value={present} color="#22c55e" />
          <Card title="Absent" value={absent} color="#ef4444" />
          <Card title="Total" value={total} color="#3b82f6" />
        </div>

        {/* 📋 TABLE */}
        <div style={tableBox}>
          <h3>Records</h3>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>

            <tbody>
              {data.map(item => (
                <tr key={item._id}>
                  <td>{item.name || "No Name"}</td>
                  <td style={{
                    color: item.status === "Present" ? "#22c55e" : "#ef4444"
                  }}>
                    {item.status}
                  </td>
                  <td>{new Date(item.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 📊 PIE CHART */}
        <div style={{ width: "300px", marginTop: "30px" }}>
          <Pie data={pieData} />
        </div>
      </div>
    </div>
  );
}

// 🔷 CARD COMPONENT
const Card = ({ title, value, color }) => (
  <div
    style={{
      background: color,
      padding: "20px",
      borderRadius: "12px",
      width: "150px",
      textAlign: "center",
      transition: "0.3s",
      cursor: "pointer",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

// 🎨 STYLES
const tableBox = {
  marginTop: "20px",
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
};

export default Dashboard;