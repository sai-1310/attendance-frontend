import React, { useEffect, useState } from "react";

function Report() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/attendance")
      .then((res) => res.json())
      .then((resData) => {
        const processed = processData(resData);
        setData(processed);
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  }, []);

  const processData = (raw) => {
    const map = {};

    raw.forEach((item) => {
      if (!map[item.name]) {
        map[item.name] = { name: item.name, present: 0, total: 0 };
      }

      map[item.name].total++;

      if (item.status === "Present") {
        map[item.name].present++;
      }
    });

    return Object.values(map).map((item) => ({
      ...item,
      percent: ((item.present / item.total) * 100).toFixed(1),
    }));
  };

  return (
    <div style={styles.page}>
      <h1>📊 Attendance Report</h1>

      <div style={styles.box}>
        {data.map((item, i) => (
          <div key={i} style={styles.row}>
            <span>{item.name}</span>
            <span>
              {item.present}/{item.total}
            </span>
            <span>{item.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#020617",
    color: "white",
    minHeight: "100vh",
  },
  box: {
    background: "rgba(255,255,255,0.05)",
    padding: "20px",
    borderRadius: "15px",
  },
  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },
};

export default Report;