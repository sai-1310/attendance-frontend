// ✅ YOUR RENDER BACKEND URL
const BASE_URL = "https://attendance-backend-7-2s8w.onrender.com";

// LOGIN
async function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const res = await fetch("https://attendance-backend-7-2s8w.onrender.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();

  if (data.success) {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    loadStudents();
  } else {
    alert("Invalid login");
  }
}

// MARK ATTENDANCE
async function mark(button, status) {
  const row = button.parentElement.parentElement;
  const name = row.cells[0].innerText;

  await fetch("https://attendance-backend-7-2s8w.onrender.com/attendance", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, status })
  });

  loadStudents();
}

// LOAD STUDENTS + ATTENDANCE
async function loadStudents() {
  const table = document.getElementById("studentTable");

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Action</th>
    </tr>
  `;

  const date = document.getElementById("date").value || getTodayDate();

  const resStudents = await fetch("https://attendance-backend-7-2s8w.onrender.com/students");
  const students = await resStudents.json();

  const resAttendance = await fetch(`https://attendance-backend-7-2s8w.onrender.com/attendance/${date}`);
  const data = await resAttendance.json();

  let present = 0;
  let absent = 0;

  students.forEach(s => {
    const row = table.insertRow();
    const name = s.name;

    row.insertCell(0).innerText = name;

    const record = data.find(d => d.name === name);

    if (record) {
      if (record.status === "Present") {
        present++;
        row.insertCell(1).innerHTML = "<span class='present'>Present</span>";
      } else {
        absent++;
        row.insertCell(1).innerHTML = "<span class='absent'>Absent</span>";
      }

      row.insertCell(2).innerHTML = `
        <button onclick="editAttendance('${record._id}','Present')">Present</button>
        <button onclick="editAttendance('${record._id}','Absent')">Absent</button>
      `;
    } else {
      row.insertCell(1).innerText = "-";

      row.insertCell(2).innerHTML = `
        <button onclick="mark(this,'Present')">Present</button>
        <button onclick="mark(this,'Absent')">Absent</button>
      `;
    }
  });

  document.getElementById("summary").innerText =
    `Present: ${present} | Absent: ${absent}`;

  updateChart(present, absent);
}

// ADD STUDENT
async function addStudent() {
  const name = document.getElementById("newStudent").value;

  await fetch("https://attendance-backend-7-2s8w.onrender.com/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name })
  });

  document.getElementById("newStudent").value = "";
  loadStudents();
}

async function editAttendance(id, status) {
  await fetch(`https://attendance-backend-7-2s8w.onrender.com/attendance/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });

  loadStudents();
}


async function searchStudent() {
  const name = document.getElementById("searchName").value;

  const res = await fetch(`https://attendance-backend-7-2s8w.onrender.com/attendance/student/${name}`);
  const data = await res.json();

  const table = document.getElementById("studentTable");

  table.innerHTML = `
    <tr>
      <th>Name</th>
      <th>Status</th>
      <th>Date</th>
    </tr>
  `;

  data.forEach(item => {
    const row = table.insertRow();
    row.insertCell(0).innerText = item.name;
    row.insertCell(1).innerText = item.status;
    row.insertCell(2).innerText = new Date(item.date).toLocaleString();
  });
}