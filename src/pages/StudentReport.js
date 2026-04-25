import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function StudentReport() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  const fetchData = async () => {
    const res = await fetch(`${BASE_URL}/attendance`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filtered = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Sidebar />

      <div style={{ marginLeft: "240px", padding: "20px" }}>
        <h1>Student Report</h1>

        <input
          placeholder="Search student"
          onChange={(e) => setSearch(e.target.value)}
        />

        <br /><br />

        {filtered.map((item) => (
          <div key={item._id}>
            {item.name} - {item.status}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentReport;