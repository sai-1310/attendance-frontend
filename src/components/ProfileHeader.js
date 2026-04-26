import React from "react";

function ProfileHeader() {
  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "student";

  // 🔹 Different image for role
  const avatar =
    role === "admin"
      ? "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
      : "https://cdn-icons-png.flaticon.com/512/3135/3135768.png";

  return (
    <div style={styles.container}>
      
      <img src={avatar} alt="profile" style={styles.image} />

      <h2 style={styles.text}>
        <span style={{ color: "#666" }}>Hi, </span>
        <span style={{ color: "#1abc9c", fontWeight: "bold" }}>
          {username.toUpperCase()}
        </span>
      </h2>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px 20px",
    background: "#f4f4f4",
    borderRadius: "10px",
    marginBottom: "20px"
  },

  image: {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    objectFit: "cover"
  },

  text: {
    fontSize: "20px",
    margin: 0
  }
};

export default ProfileHeader;