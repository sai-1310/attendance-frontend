import { useState, useEffect } from "react";

function ProfileCard() {
  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    name: "",
    course: "",
    roll: "",
    phone: "",
    dob: "",
    email: "",
    mother: ""
  });

  // 🔹 Load from localStorage (dynamic)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("profile"));
    if (saved) setUser(saved);
    else {
      setUser({
        name: localStorage.getItem("username") || "Student",
        course: "BTech - AI (Sem 8)",
        roll: "2203031240655",
        phone: "9999999999",
        dob: "13-10-2004",
        email: "demo@gmail.com",
        mother: "Mother Name"
      });
    }
  }, []);

  // 🔹 Handle change
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // 🔹 Save
  const handleSave = () => {
    localStorage.setItem("profile", JSON.stringify(user));
    setEdit(false);
  };

  return (
    <div style={styles.container}>
      
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="profile"
        style={styles.image}
      />

      {edit ? (
        <input
          name="name"
          value={user.name}
          onChange={handleChange}
          style={styles.input}
        />
      ) : (
        <h2 style={styles.name}>{user.name}</h2>
      )}

      <span style={styles.status}>Active</span>

      <div style={styles.details}>
        {renderField("course", "Course", user, edit, handleChange)}
        {renderField("roll", "Roll No", user, edit, handleChange)}
        {renderField("phone", "Phone", user, edit, handleChange)}
        {renderField("dob", "DOB", user, edit, handleChange)}
        {renderField("email", "Email", user, edit, handleChange)}
        {renderField("mother", "Mother", user, edit, handleChange)}
      </div>

      {/* BUTTONS */}
      <div style={{ marginTop: "15px" }}>
        {edit ? (
          <button onClick={handleSave} style={styles.btnSave}>
            Save
          </button>
        ) : (
          <button onClick={() => setEdit(true)} style={styles.btnEdit}>
            Edit
          </button>
        )}
      </div>

    </div>
  );
}

// 🔹 Reusable Field
function renderField(name, label, user, edit, handleChange) {
  return (
    <p>
      <b>{label} :</b>{" "}
      {edit ? (
        <input
          name={name}
          value={user[name]}
          onChange={handleChange}
          style={styles.input}
        />
      ) : (
        user[name]
      )}
    </p>
  );
}

const styles = {
  container: {
    width: "320px",
    padding: "20px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  image: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    marginBottom: "10px"
  },

  name: {
    color: "#4a6fa5"
  },

  status: {
    background: "#2ecc71",
    color: "#fff",
    padding: "3px 10px",
    borderRadius: "5px",
    fontSize: "12px"
  },

  details: {
    textAlign: "left",
    marginTop: "10px",
    lineHeight: "1.8"
  },

  input: {
    padding: "4px",
    width: "100%",
    marginTop: "4px"
  },

  btnEdit: {
    background: "#3498db",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  },

  btnSave: {
    background: "#2ecc71",
    color: "#fff",
    padding: "8px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer"
  }
};

export default ProfileCard;