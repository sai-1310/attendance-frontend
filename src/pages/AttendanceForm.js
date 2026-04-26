import { useState } from "react";

function AttendanceForm() {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Present");

  const handleSubmit = async () => {
    await fetch("http://localhost:5001/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        status,
        date: new Date()
      })
    });

    alert("Attendance added ✅");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add Attendance</h2>

      <input
        placeholder="Student Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <select onChange={(e) => setStatus(e.target.value)}>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AttendanceForm;