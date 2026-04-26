import { useEffect, useState } from "react";

function StudentReport() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://attendance-backend-8-4eau.onrender.com/attendance")
      .then(res => res.json())
      .then(setData)
      .catch(() => alert("Failed to load report ❌"));
  }, []);

  const total = data.length;
  const present = data.filter(d => d.status === "Present").length;
  const percent = total ? ((present / total) * 100).toFixed(1) : 0;

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>📊 Student Report</h1>

      {/* SUMMARY */}
      <div style={styles.cards}>
        <Card title="Total Days" value={total} />
        <Card title="Present" value={present} />
        <Card title="Attendance %" value={percent + "%"} />
      </div>

      {/* TABLE */}
      <div style={styles.table}>
        <div style={styles.header}>
          <span>Name</span>
          <span>Status</span>
          <span>Date</span>
        </div>

        {data.map((item, i) => (
          <div key={i} style={styles.row}>
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
  );
}

/* CARD */
function Card({ title, value }) {
  return (
    <div style={styles.card}>
      <h4>{title}</h4>
      <h2>{value}</h2>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    background: "#020617",
    minHeight: "100vh",
    padding: "30px",
    color: "white"
  },

  title: {
    marginBottom: "20px"
  },

  cards: {
    display: "flex",
    gap: "20px",
    marginBottom: "25px"
  },

  card: {
    flex: 1,
    padding: "20px",
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    textAlign: "center"
  },

  table: {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "15px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    borderBottom: "1px solid rgba(255,255,255,0.2)",
    paddingBottom: "10px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }
};

export default StudentReport;