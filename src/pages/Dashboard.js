import { useEffect, useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import { motion } from "framer-motion";
import {
  FaChartBar,
  FaFileAlt,
  FaSignOutAlt,
  FaBars
} from "react-icons/fa";

function Dashboard() {
  const [data, setData] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");

  useEffect(() => {
    fetch("http://localhost:5000/attendance")
      .then(res => res.json())
      .then(setData);
  }, []);

  const present = data.filter(d => d.status === "Present").length;
  const absent = data.filter(d => d.status === "Absent").length;

  const chartData = data.map((d, i) => ({
    name: `Day ${i + 1}`,
    value: d.status === "Present" ? 1 : 0
  }));

  return (
    <div style={styles.wrapper}>

      {/* SIDEBAR */}
      <div style={{
        ...styles.sidebar,
        width: collapsed ? 80 : 220
      }}>

        <div style={styles.top}>
          <FaBars
            style={{ cursor: "pointer" }}
            onClick={() => setCollapsed(!collapsed)}
          />
        </div>

        <SidebarItem icon={<FaChartBar />} label="Dashboard" collapsed={collapsed}/>
        <SidebarItem icon={<FaFileAlt />} label="Reports" collapsed={collapsed}/>

        <div style={{ marginTop: "auto" }}>
          <SidebarItem
            icon={<FaSignOutAlt />}
            label="Logout"
            collapsed={collapsed}
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          />
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        {/* PROFILE */}
        <div style={styles.profile}>
          <h3>{username}</h3>
          <span>{role}</span>
        </div>

        <h1>Admin Dashboard</h1>

        {/* CARDS */}
        <div style={styles.cards}>
          <Card title="Present" value={present} color="#22c55e" />
          <Card title="Absent" value={absent} color="#ef4444" />
          <Card title="Total" value={data.length} color="#3b82f6" />
        </div>

        {/* CHART */}
        <div style={styles.box}>
          <h3>Analytics</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" stroke="#aaa"/>
              <YAxis stroke="#aaa"/>
              <Tooltip/>
              <Line type="monotone" dataKey="value" stroke="#22c55e"/>
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* TABLE */}
        <div style={styles.box}>
          <h3>Attendance</h3>
          {data.map((item) => (
            <div key={item._id} style={styles.row}>
              <span>{item.name}</span>
              <span style={{
                color: item.status === "Present" ? "#22c55e" : "#ef4444"
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

/* SIDEBAR ITEM WITH TOOLTIP */
function SidebarItem({ icon, label, collapsed, onClick }) {
  return (
    <div
      style={styles.item}
      onClick={onClick}
      title={collapsed ? label : ""}
    >
      {icon}
      {!collapsed && <span style={{ marginLeft: 10 }}>{label}</span>}
      <p onClick={() => navigate("/report")}>📊 Report</p>
    </div>
  );
}

/* CARD */
function Card({ title, value, color }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      style={{
        ...styles.card,
        background: `linear-gradient(135deg, ${color}, #000)`
      }}
    >
      <h3>{title}</h3>
      <h1>{value}</h1>
    </motion.div>
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
  sidebar: {
    padding: "20px",
    borderRight: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s"
  },
  top: {
    marginBottom: "30px"
  },
  item: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    cursor: "pointer"
  },
  main: {
    flex: 1,
    padding: "40px",
    maxWidth: "1100px",
    margin: "auto"
  },
  profile: {
    marginBottom: "20px"
  },
  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  card: {
    flex: 1,
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center"
  },
  box: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "30px"
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }
};

export default Dashboard;