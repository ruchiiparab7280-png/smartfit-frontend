import React, { useState, useEffect } from "react";

const TrainerControl = () => {

  const [trainer, setTrainer] = useState({
    name: "",
    price: "",
    image: ""
  });

  useEffect(() => {
    const savedTrainer = JSON.parse(localStorage.getItem("gymTrainer"));
    if (savedTrainer) {
      setTrainer(savedTrainer);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("gymTrainer", JSON.stringify(trainer));
    alert("Trainer Updated Successfully!");
  };

  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h2>Trainer Control</h2>

      {/* Trainer Name */}
      <input
        type="text"
        placeholder="Trainer Name"
        value={trainer.name}
        onChange={(e) => setTrainer({ ...trainer, name: e.target.value })}
        style={{
          padding: "10px",
          marginBottom: "10px",
          width: "300px",
          color: "black"
        }}
      />

      <br />

      {/* Session Price */}
      <input
        type="number"
        placeholder="Session Price"
        value={trainer.price}
        onChange={(e) => setTrainer({ ...trainer, price: e.target.value })}
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
            setTrainer({ ...trainer, image: reader.result });
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

export default TrainerControl;