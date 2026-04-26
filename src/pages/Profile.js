import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState({});
  const [edit, setEdit] = useState(false);
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/profile")
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setImage(data.avatar || "");
      });
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await fetch("http://localhost:5000/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...user, avatar: image })
    });

    setEdit(false);
    alert("Profile saved ✅");
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // base64 preview
    };

    if (file) reader.readAsDataURL(file);
  };

  return (
    <div style={styles.page}>

      {/* BACK BUTTON */}
      <button onClick={() => navigate("/dashboard")} style={styles.back}>
        ⬅ Back
      </button>

      <div style={styles.container}>

        {/* LEFT */}
        <div style={styles.left}>
          <img
            src={image || "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
            alt="profile"
            style={styles.image}
          />

          {edit && (
            <input type="file" onChange={handleImage} />
          )}

          <h2>{user.name}</h2>
          <p>{user.role}</p>

          <button
            onClick={edit ? handleSave : () => setEdit(true)}
            style={styles.btn}
          >
            {edit ? "Save" : "Edit"}
          </button>
        </div>

        {/* RIGHT */}
        <div style={styles.right}>
          <h2>Details</h2>

          {Object.keys(user).map((key) => (
            key !== "avatar" && (
              <div key={key} style={styles.row}>
                <span>{key.toUpperCase()}</span>

                {edit ? (
                  <input
                    name={key}
                    value={user[key]}
                    onChange={handleChange}
                  />
                ) : (
                  <span>{user[key]}</span>
                )}
              </div>
            )
          ))}
        </div>

      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#020617",
    minHeight: "100vh",
    padding: "20px",
    color: "white"
  },

  back: {
    marginBottom: "15px",
    padding: "8px 15px",
    background: "#444",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer"
  },

  container: {
    display: "flex",
    gap: "20px"
  },

  left: {
    width: "250px",
    background: "#111",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center"
  },

  right: {
    flex: 1,
    background: "#111",
    padding: "20px",
    borderRadius: "10px"
  },

  image: {
    width: "100px",
    height: "100px",
    borderRadius: "50%"
  },

  btn: {
    marginTop: "10px",
    padding: "8px",
    background: "#3b82f6",
    border: "none",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    margin: "10px 0"
  }
};

export default Profile;