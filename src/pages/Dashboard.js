import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";   // ✅ ADDED
import Sidebar from "../components/Sidebar";
import ProfileCard from "../components/ProfileCard";
import Report from "./pages/report";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { FaSearch } from "react-icons/fa";

function Dashboard() {
  const [raw, setRaw] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);   // ✅ ADDED

  const navigate = useNavigate();            // ✅ ADDED

  const username = localStorage.getItem("username") || "Admin";
  const role = localStorage.getItem("role") || "admin";

  const avatar =
    role === "admin"
      ? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";

  useEffect(() => {
    fetch("http://https://attendance-backend-8-4eau.onrender.com/attendance")
      .then(res => res.json())
      .then(setRaw);
  }, []);

  const total = raw.length;
  const present = raw.filter(r => r.status === "Present").length;
  const absent = total - present;

  const chartData = raw.map((r, i) => ({
    day: `D${i + 1}`,
    value: r.status === "Present" ? 1 : 0
  }));

  return (
    <div style={styles.wrapper}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div style={styles.main}>

        {/* NAVBAR */}
        <div style={styles.navbar}>
          <div style={styles.search}>
            <FaSearch />
            <input placeholder="Search..." style={styles.searchInput} />
          </div>

          {/* PROFILE HEADER */}
          <div style={styles.profileWrapper}>

            <div
              style={styles.profileHeader}
              onClick={() => setOpen(!open)}
            >
              <img src={avatar} alt="profile" style={styles.image} />

              <div>
                <span style={{ color: "#aaa" }}>Hi, </span>
                <strong style={{ color: "#00d1b2" }}>
                  {username.toUpperCase()}
                </strong>
                <div style={styles.role}>{role}</div>
              </div>

              <span style={styles.online}></span>
            </div>

            {open && (
              <div style={styles.dropdown}>
                <div
                  style={styles.item}
                  onClick={() => setOpen(!open)}
                  onClick={() => navigate("/profile")}
                  
                >
                  👤 Profile
                </div>

                <div
                  style={styles.item}
                  onClick={() => {
                    localStorage.clear();
                    navigate("/");
                  }}
                  
                >
                  🚪 Logout
                </div>
              </div>
            )}

          </div>
        </div> {/* ✅ FIXED (navbar closed properly) */}

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

        <ProfileCard />

      </div>
    </div>
  );
}

/* CARD */
function Card({ title, value, color }) {
  return (
    <div style={{
      ...styles.card,
      background: `linear-gradient(135deg, ${color}, #000)`
    }}>
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
    alignItems: "center",
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

  profileWrapper: {
    position: "relative"
  },

  profileHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    cursor: "pointer"
  },

  image: {
    width: "40px",
    height: "40px",
    borderRadius: "50%"
  },

  role: {
    fontSize: "12px",
    color: "#aaa"
  },

  online: {
    width: "10px",
    height: "10px",
    background: "#00ff88",
    borderRadius: "50%",
    position: "absolute",
    left: "30px",
    top: "5px"
  },

  dropdown: {
    position: "absolute",
    right: 0,
    top: "55px",
    background: "#111",
    borderRadius: "10px",
    padding: "10px",
    minWidth: "150px"
  },

  item: {
    padding: "10px",
    cursor: "pointer"
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px"
  },

  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "15px"
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