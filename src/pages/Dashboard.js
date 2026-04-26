import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import ProfileHeader from "../components/ProfileHeader";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
  const [raw, setRaw] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const username = localStorage.getItem("username") || "Admin";
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetch("http://localhost:5000/attendance")
      .then(res => res.json())
      .then(setRaw);
  }, []);

  // 📊 STATS
  const total = raw.length;
  const present = raw.filter(r => r.status === "Present").length;
  const absent = total - present;

  // 📈 CHART
  const chartData = raw.map((r, i) => ({
    day: `D${i + 1}`,
    value: r.status === "Present" ? 1 : 0
  }));

  return (
    <div style={styles.wrapper}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <ProfileCard />
      <ProfileHeader />

      <div style={styles.main}>

        {/* NAVBAR */}
        <div style={styles.navbar}>
          <div style={styles.search}>
            <FaSearch />
            <input placeholder="Search..." style={styles.searchInput} />
          </div>

          <div style={styles.profile}>
            <strong>{username}</strong>
            <span>{role}</span>
          </div>
        </div>

        {/* CARDS */}
        <div style={styles.cards}>
          <Card title="Present" value={present} color="#00e676" />
          <Card title="Absent" value={absent} color="#ff5252" />
          <Card title="Total" value={total} color="#448aff" />
        </div>

        {/* CHART */}
        <div style={styles.box}>
          <h3>Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#00e676" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* TABLE */}
        <div style={styles.box}>
          <h3>Recent Records</h3>
          {raw.slice(0, 5).map(item => (
            <div key={item._id} style={styles.row}>
              <span>{item.name}</span>
              <span style={{
                color: item.status === "Present" ? "#00e676" : "#ff5252"
              }}>
                {item.status}
              </span>
              <span>{new Date(item.date).toLocaleDateString()}</span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

/* CARD COMPONENT */
function Card({ title, value, color }) {
  return (
    <div
      style={{
        ...styles.card,
        background: `linear-gradient(135deg, ${color}, #000)`
      }}
    >
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* STYLES */
const styles = {
  wrapper: {
    display: "flex",
    background: "#020617",
    minHeight: "100vh",
    color: "white"
  },

  main: {
    flex: 1,
    padding: "25px",
    maxWidth: "1200px",
    margin: "auto"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  search: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.08)",
    padding: "10px",
    borderRadius: "10px"
  },

  searchInput: {
    background: "transparent",
    border: "none",
    color: "white",
    outline: "none"
  },

  profile: {
    textAlign: "right"
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px"
  },

  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
    transition: "0.3s"
  },

  box: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }
};

export default Dashboard;