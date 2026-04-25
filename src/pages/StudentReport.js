import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function StudentReport() {
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

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{ marginLeft: "220px", padding: "20px" }}>
        <h1>Student Report</h1>

        {data.map(item => (
          <p key={item._id}>
            {item.name} - {item.status}
          </p>
        ))}
      </div>
    </div>
  );
}

export default StudentReport;