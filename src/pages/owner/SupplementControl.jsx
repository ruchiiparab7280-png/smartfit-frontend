import React, { useState, useEffect } from "react";

const SupplementControl = () => {

  const [protein, setProtein] = useState({
    name: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    const savedProtein = JSON.parse(localStorage.getItem("gymProtein"));
    if (savedProtein) {
      setProtein(savedProtein);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("gymProtein", JSON.stringify(protein));
    alert("Protein Updated Successfully!");
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Supplement Control</h2>

      {/* Protein Name */}
      <input
        type="text"
        placeholder="Protein Name"
        value={protein.name}
        onChange={(e) => setProtein({ ...protein, name: e.target.value })}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "300px",
          color: "black"
        }}
      />

      <br />

      {/* Price */}
      <input
        type="number"
        placeholder="Price"
        value={protein.price}
        onChange={(e) => setProtein({ ...protein, price: e.target.value })}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "300px",
          color: "black"
        }}
      />

      <br />

      {/* Image Upload */}
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            setProtein({ ...protein, image: reader.result });
          };
          reader.readAsDataURL(file);
        }}
        style={{ marginBottom: "10px" }}
      />

      <br />

      {/* Save Button */}
      <button
        onClick={handleSave}
        style={{
          padding: "10px 20px",
          background: "orange",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Save
      </button>
    </div>
  );
};

export default SupplementControl;