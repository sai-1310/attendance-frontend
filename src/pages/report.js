import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Report() {
  const [data, setData] = useState([]);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5001/attendance")
      .then(res => res.json())
      .then(setData);
  }, []);

  // 📅 DATE FILTER
  const filtered = data.filter(item => {
    if (!from || !to) return true;
    const d = new Date(item.date);
    return d >= new Date(from) && d <= new Date(to);
  });

  // 📊 STUDENT PERCENTAGE
  const studentMap = {};

  filtered.forEach(item => {
    if (!studentMap[item.name]) {
      studentMap[item.name] = { total: 0, present: 0 };
    }

    studentMap[item.name].total++;
    if (item.status === "Present") {
      studentMap[item.name].present++;
    }
  });

  const reportData = Object.keys(studentMap).map(name => {
    const total = studentMap[name].total;
    const present = studentMap[name].present;
    const percent = ((present / total) * 100).toFixed(1);

    return {
      name,
      percent: Number(percent),
      total,
      present
    };
  });

  // 📄 PDF EXPORT
  const exportPDF = () => {
    const input = document.getElementById("report");

    html2canvas(input).then(canvas => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 10, 10, 190, 0);
      pdf.save("attendance-report.pdf");
    });
  };

  return (
    <div style={styles.page}>

      {/* 🔙 BACK BUTTON */}
      <button onClick={() => navigate("/dashboard")} style={styles.backBtn}>
        ← Back
      </button>

      <h1>📊 Attendance Report</h1>

      {/* 📅 FILTER */}
      <div style={styles.filters}>
        <input type="date" onChange={e => setFrom(e.target.value)} />
        <input type="date" onChange={e => setTo(e.target.value)} />
        <button onClick={exportPDF} style={styles.pdfBtn}>
          Export PDF
        </button>
      </div>

      {/* 📊 REPORT */}
      <div id="report">

        {/* CHART */}
        <div style={styles.box}>
          <h3>Student Attendance %</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={reportData}>
              <XAxis dataKey="name" stroke="#aaa" />
              <YAxis stroke="#aaa" />
              <Tooltip />
              <Bar dataKey="percent" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TABLE */}
        <div style={styles.box}>
          <h3>Details</h3>

          {reportData.map((item, i) => (
            <div key={i} style={styles.row}>
              <span>{item.name}</span>
              <span>{item.present}/{item.total}</span>
              <span>{item.percent}%</span>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}

const styles = {
  page: {
    padding: "40px",
    background: "#020617",
    color: "white",
    minHeight: "100vh"
  },

  backBtn: {
    marginBottom: "15px",
    padding: "8px 15px",
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  pdfBtn: {
    padding: "8px 15px",
    background: "#22c55e",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  filters: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
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

export default Report;