import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const linkStyle = {
    padding: "10px",
    cursor: "pointer",
    borderRadius: "8px",
  };

  return (
    <div
      style={{
        width: "220px",
        background: "#020617",
        color: "white",
        height: "100vh",
        padding: "20px",
        position: "fixed",
        borderRight: "1px solid #1e293b",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>🚀 Admin Panel</h2>

      <p style={linkStyle} onClick={() => navigate("/dashboard")}>
        📊 Dashboard
      </p>

      <p style={linkStyle} onClick={() => navigate("/report")}>
        📋 Student Report
      </p>

      <p
        style={linkStyle}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        🚪 Logout
      </p>
    </div>
  );
}

export default Sidebar;