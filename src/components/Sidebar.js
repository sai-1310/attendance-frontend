import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const link = {
    padding: "10px",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "0.2s"
  };

  return (
    <div style={{
      width: "220px",
      background: "#020617",
      color: "white",
      height: "100vh",
      padding: "20px",
      position: "fixed"
    }}>
      <h2>🚀 Admin Panel</h2>

      <p style={link}
        onMouseEnter={e=>e.target.style.background="#1e293b"}
        onMouseLeave={e=>e.target.style.background="transparent"}
        onClick={()=>navigate("/dashboard")}
      >
        📊 Dashboard
      </p>

      <p style={link}
        onMouseEnter={e=>e.target.style.background="#1e293b"}
        onMouseLeave={e=>e.target.style.background="transparent"}
        onClick={()=>navigate("/report")}
      >
        📋 Report
      </p>

      {role === "admin" && (
        <p style={link}
          onMouseEnter={e=>e.target.style.background="#1e293b"}
          onMouseLeave={e=>e.target.style.background="transparent"}
          onClick={()=>alert("Admin Settings")}
        >
          ⚙ Admin
        </p>
      )}

      <p style={link}
        onClick={()=>{
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