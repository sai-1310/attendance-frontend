import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function StudentReport() {
  const [data, setData] = useState([]);
  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/attendance`, {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  const exportPDF = async () => {
    const element = document.getElementById("report");
    const canvas = await html2canvas(element);
    const img = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(img, "PNG", 10, 10, 180, 150);
    pdf.save("report.pdf");
  };

  return (
    <div style={{ display:"flex" }}>
      <Sidebar />

      <div style={{ marginLeft:"220px", padding:"20px" }}>
        <h1>Student Report</h1>

        <button onClick={exportPDF}>Export PDF</button>
        <button onClick={()=>window.print()}>Print</button>

        <div id="report">
          {data.map(item=>(
            <p key={item._id}>{item.name} - {item.status}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StudentReport;