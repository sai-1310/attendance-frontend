import { FaBars, FaChartBar, FaFileAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Sidebar({ collapsed, setCollapsed }) {
  const navigate = useNavigate();

  return (
    <div style={{
      width: collapsed ? "70px" : "220px",
      padding: "20px",
      background: "#020617",
      borderRight: "1px solid rgba(255,255,255,0.1)"
    }}>
      <FaBars onClick={() => setCollapsed(!collapsed)} style={{ cursor: "pointer" }} />

      <div style={styles.item} onClick={() => navigate("/dashboard")}>
        <FaChartBar /> {!collapsed && "Dashboard"}
      </div>

      <div style={styles.item} onClick={() => navigate("/report")}>
        <FaFileAlt /> {!collapsed && "Report"}
      </div>

      <div
        style={styles.item}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        <FaSignOutAlt /> {!collapsed && "Logout"}
      </div>
    </div>
  );
}

const styles = {
  item: {
    marginTop: "20px",
    cursor: "pointer",
    display: "flex",
    gap: "10px"
  }
};

export default Sidebar;