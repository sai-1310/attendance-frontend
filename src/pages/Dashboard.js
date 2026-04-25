import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

function Dashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

  useEffect(() => {
    fetch(`${BASE_URL}/attendance`, {
      headers: { Authorization: localStorage.getItem("token") }
    })
      .then(res => res.json())
      .then(setData);
  }, []);

  const filtered = data.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  const perPage = 5;
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  // monthly chart
  const months = Array(12).fill(0);
  data.forEach(d => {
    const m = new Date(d.date).getMonth();
    if (d.status === "Present") months[m]++;
  });

  const chartData = {
    labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    datasets: [{ label: "Present", data: months }]
  };

  return (
    <div style={{ display:"flex" }}>
      <Sidebar />

      <div style={{ marginLeft:"220px", padding:"20px", width:"100%", background:"#0f172a", color:"white" }}>
        <h1>Dashboard</h1>

        {/* SEARCH */}
        <input
          placeholder="Search..."
          onChange={e=>setSearch(e.target.value)}
          style={{ padding:"10px", borderRadius:"6px" }}
        />

        {/* TABLE */}
        <table style={{ width:"100%", marginTop:"20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {paginated.map(item => (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td style={{ color: item.status==="Present"?"green":"red" }}>
                  {item.status}
                </td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* PAGINATION */}
        <div style={{ marginTop:"10px" }}>
          <button onClick={()=>setPage(page-1)} disabled={page===1}>Prev</button>
          <span> {page} </span>
          <button onClick={()=>setPage(page+1)} disabled={start+perPage>=filtered.length}>Next</button>
        </div>

        {/* CHART */}
        <div style={{ width:"400px", marginTop:"30px" }}>
          <Bar data={chartData} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;