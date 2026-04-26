import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

function StudentDashboard() {
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/attendance", {
      headers:{Authorization:localStorage.getItem("token")}
    })
    .then(res=>res.json())
    .then(setData);
  },[]);

  return (
    <div style={{display:"flex"}}>
      <Sidebar />
      <div style={{marginLeft:"240px",padding:"30px"}}>
        <h2>My Attendance</h2>

        {data.map(d=>(
          <p>{d.name} - {d.status}</p>
        ))}
      </div>
    </div>
  );
}

export default StudentDashboard;