import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  return (
    <div style={sidebar}>
      <h2>🚀 Panel</h2>

      {role === "admin" && (
        <>
          <p onClick={() => navigate("/dashboard")}>Dashboard</p>
          <p onClick={() => navigate("/add")}>Add Attendance</p>
        </>
      )}

      {role === "student" && (
        <p onClick={() => navigate("/student")}>My Attendance</p>
      )}

      <p onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>Logout</p>
    </div>
  );
}

export default Sidebar;

const sidebar = {
  width: "240px",
  height: "100vh",
  position: "fixed",
  background: "#020617",
  color: "white",
  padding: "20px"
};