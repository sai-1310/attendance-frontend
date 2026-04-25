import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div style={{
      width: "200px",
      background: "#111",
      color: "white",
      height: "100vh",
      padding: "20px",
      position: "fixed"
    }}>
      <h3>Admin Panel</h3>

      <p onClick={() => navigate("/dashboard")}>Dashboard</p>
      <p onClick={() => navigate("/report")}>Student Report</p>

      <p onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </p>
    </div>
  );
}

export default Sidebar;