import React from "react";

function ProfileCard() {
  return (
    <div style={styles.container}>
      
      {/* PROFILE IMAGE */}
      <img
        src="https://randomuser.me/api/portraits/men/75.jpg"
        alt="profile"
        style={styles.image}
      />

      {/* NAME */}
      <h2 style={styles.name}>KOPPURAVURI SAI PRANEETH</h2>

      {/* STATUS */}
      <span style={styles.status}>Active</span>

      {/* DETAILS */}
      <div style={styles.details}>
        <p><b>Course :</b> BTech - AI (Semester - 8)</p>
        <p><b>Roll No :</b> 2203031240655</p>
        <p><b>Phone :</b> 706171729277</p>
        <p><b>Section :</b> CSE-AI-8A18 | 2 | 40</p>
        <p><b>DOB :</b> 13-10-2004</p>
        <p><b>Student ID :</b> 6302723308</p>
        <p><b>Mother :</b> Koppuravuri Nagamani</p>
        <p><b>Email :</b> saipraneeth@example.com</p>
      </div>

    </div>
  );
}

const styles = {
  container: {
    width: "320px",
    margin: "20px auto",
    padding: "20px",
    background: "#ffffff",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },

  image: {
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "15px"
  },

  name: {
    fontSize: "18px",
    color: "#4a6fa5",
    marginBottom: "10px"
  },

  status: {
    display: "inline-block",
    background: "#2ecc71",
    color: "white",
    padding: "4px 10px",
    borderRadius: "5px",
    fontSize: "12px",
    marginBottom: "15px"
  },

  details: {
    textAlign: "left",
    fontSize: "14px",
    lineHeight: "1.8",
    borderTop: "1px solid #eee",
    paddingTop: "10px"
  }
};

export default ProfileCard;