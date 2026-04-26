import { useState } from "react";

function ProfileCard() {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: localStorage.getItem("username") || "Sai Praneeth",
    role: localStorage.getItem("role") || "Student",
    course: "BTech - AI",
    semester: "Semester 8",
    roll: "2203031240655",
    phone: "7061717297",
    email: "saipraneeth@gmail.com",
    dob: "13-10-2004",
    section: "AI-A",
    batch: "2022 - 2026"
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>

      {/* LEFT SIDE */}
      <div style={styles.left}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="profile"
          style={styles.image}
        />

        <h2>{user.name}</h2>
        <p style={styles.role}>{user.role}</p>

        <span style={styles.active}>Active</span>

        <div style={styles.infoBox}>
          <p>{user.course}</p>
          <p>{user.semester}</p>
          <p>{user.batch}</p>
        </div>

        <button onClick={() => setEdit(!edit)} style={styles.btn}>
          {edit ? "Save" : "Edit Profile"}
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.right}>
        <h2 style={styles.heading}>Student Details</h2>

        {Object.entries(user).map(([key, value]) => (
          key !== "name" &&
          key !== "role" && (
            <div key={key} style={styles.row}>
              <span style={styles.label}>{key.toUpperCase()}</span>

              {edit ? (
                <input
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                />
              ) : (
                <span style={styles.value}>{value}</span>
              )}
            </div>
          )
        ))}
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    width: "100%",
    minHeight: "400px",
    gap: "20px",
    marginTop: "20px"
  },

  /* LEFT PANEL */
  left: {
    width: "280px",
    background: "#0f172a",
    padding: "20px",
    borderRadius: "15px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px"
  },

  role: {
    color: "#aaa",
    marginBottom: "5px"
  },

  active: {
    background: "#00c853",
    padding: "5px 12px",
    borderRadius: "10px",
    fontSize: "12px",
    display: "inline-block",
    marginBottom: "10px"
  },

  infoBox: {
    marginTop: "10px",
    fontSize: "14px",
    color: "#ccc"
  },

  btn: {
    marginTop: "20px",
    padding: "10px",
    width: "100%",
    background: "#3b82f6",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer"
  },

  /* RIGHT PANEL */
  right: {
    flex: 1,
    background: "#020617",
    padding: "20px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.5)"
  },

  heading: {
    marginBottom: "15px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)"
  },

  label: {
    color: "#888",
    fontWeight: "bold"
  },

  value: {
    color: "white"
  },

  input: {
    background: "#0f172a",
    border: "1px solid #333",
    color: "white",
    padding: "5px",
    borderRadius: "5px"
  }
};

export default ProfileCard;