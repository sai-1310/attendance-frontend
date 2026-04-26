import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

function Login() {
  const [user, setUser] = useState({
    username: "",
    password: "",
    role: "admin",
  });

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", user.username);
localStorage.setItem("role", data.role);
        navigate(data.role === "admin" ? "/dashboard" : "/student");
      } else {
        alert("Invalid credentials");
      }
    } catch {
      alert("Server error ❌");
    }
  };

  return (
    <div style={styles.container}>
      
      {/* LEFT IMAGE WITH OVERLAY */}
      <div style={styles.left}>
        <img
          src="https://t4.ftcdn.net/jpg/09/74/29/39/240_F_974293912_OcQtUzCi48ron3vXSoqVCLAr23VqHXoC.jpg"
          alt="college"
          style={styles.image}
        />
        <div style={styles.overlay} />
      </div>

      {/* RIGHT FORM */}
      <div style={styles.right}>
        <div style={styles.card}>
          
          <h2 style={styles.title}>📊 Attendance Portal</h2>

          {/* ROLE */}
          <div style={styles.role}>
            <label>
              <input
                type="radio"
                checked={user.role === "admin"}
                onChange={() => setUser({ ...user, role: "admin" })}
              />
              Staff
            </label>

            <label>
              <input
                type="radio"
                checked={user.role === "student"}
                onChange={() => setUser({ ...user, role: "student" })}
              />
              Student
            </label>
          </div>

          {/* USERNAME */}
          <div style={styles.inputBox}>
            <FaUser style={styles.icon} />
            <input
              placeholder="Username / Email"
              style={styles.input}
              onChange={(e) =>
                setUser({ ...user, username: e.target.value })
              }
            />
          </div>

          {/* PASSWORD */}
          <div style={styles.inputBox}>
            <FaLock style={styles.icon} />
            <input
              type={show ? "text" : "password"}
              placeholder="Password"
              style={styles.input}
              onChange={(e) =>
                setUser({ ...user, password: e.target.value })
              }
            />
            <span onClick={() => setShow(!show)} style={styles.eye}>
              {show ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* BUTTON */}
          <button onClick={login} style={styles.loginBtn}>
            Login
          </button>

          <p style={styles.forgot}>Forgot Password?</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Segoe UI",
  },

  left: {
    flex: 2,
    position: "relative",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.4), transparent)",
  },

  right: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0f172a",
  },

  card: {
    width: "320px",
    padding: "30px",
    borderRadius: "15px",
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(15px)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    animation: "fadeIn 0.6s ease",
  },

  title: {
    textAlign: "center",
  },

  role: {
    display: "flex",
    justifyContent: "space-around",
    fontSize: "14px",
  },

  inputBox: {
    display: "flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "8px",
    padding: "10px",
  },

  icon: {
    marginRight: "8px",
  },

  input: {
    border: "none",
    outline: "none",
    background: "transparent",
    color: "white",
    flex: 1,
  },

  eye: {
    cursor: "pointer",
  },

  loginBtn: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
    color: "white",
    cursor: "pointer",
    fontWeight: "bold",
  },

  forgot: {
    textAlign: "center",
    fontSize: "13px",
    opacity: 0.8,
    cursor: "pointer",
  },
};

export default Login;