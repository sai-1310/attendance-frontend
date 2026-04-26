import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Report() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://attendance-backend-8-4eau.onrender.com/attendance")
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.page}>

      {/* BACK BUTTON */}
      <button onClick={() => navigate("/dashboard")} style={styles.back}>
        ⬅ Back
      </button>

      <h1>Report attendance</h1>

      <div style={styles.box}>
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

            <span>
              {new Date(item.date).toLocaleDateString()}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

const styles = {
  page: {
    background: "#020617",
    minHeight: "100vh",
    padding: "20px",
    color: "white"
  },

  back: {
    marginBottom: "15px",
    padding: "8px 15px",
    background: "#444",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },

  box: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
    marginTop: "20px"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    marginBottom: "10px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  }
};

export default Report;