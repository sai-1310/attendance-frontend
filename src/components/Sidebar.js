import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#1e1e2f",
        color: "white",
        padding: "20px",
        position: "fixed",
      }}
    >
      <h2>📊 Admin Panel</h2>

      <Link to="/dashboard" style={linkStyle}>
        Dashboard
      </Link>

      <Link to="/report" style={linkStyle}>
        Student Report
      </Link>

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/";
        }}
        style={{ marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
}

const linkStyle = {
  color: "white",
  display: "block",
  margin: "15px 0",
  textDecoration: "none",
};

export default Sidebar;