import { useState } from "react";
import Sidebar from "../components/Sidebar";

function AttendanceForm() {
  const [data, setData] = useState({});

  const submit = async () => {
    await fetch("http://localhost:5000/attendance", {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
        Authorization: localStorage.getItem("token")
      },
      body: JSON.stringify(data)
    });

    alert("Added");
  };

  return (
    <div style={{display:"flex"}}>
      <Sidebar />
      <div style={{marginLeft:"240px",padding:"30px"}}>
        <h2>Add Attendance</h2>

        <input placeholder="Name" onChange={e=>setData({...data,name:e.target.value})}/>
        <select onChange={e=>setData({...data,status:e.target.value})}>
          <option>Present</option>
          <option>Absent</option>
        </select>

        <button onClick={submit}>Submit</button>
      </div>
    </div>
  );
}

export default AttendanceForm;