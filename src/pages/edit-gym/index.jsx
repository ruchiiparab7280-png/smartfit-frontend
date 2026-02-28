import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const EditGym = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    gym_name: "",
    address: "",
    city: "",
    monthly_fee: "",
    capacity: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await fetch(`${import.meta.env.VITE_API_URL}/update-gym`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: localStorage.getItem("userEmail"),
          ...formData
        })
      });

      const data = await response.json();

      if(response.ok){
        alert("Gym Updated ✅");
        navigate("/owner-dashboard");
      }
      else{
        alert(data.message);
      }

    } catch (error) {
      alert("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">

      <h1 className="text-2xl font-bold mb-6">
        Edit Gym Details
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <Input
          label="Gym Name"
          name="gym_name"
          value={formData.gym_name}
          onChange={handleChange}
        />

        <Input
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />

        <Input
          label="Monthly Fee"
          name="monthly_fee"
          value={formData.monthly_fee}
          onChange={handleChange}
        />

        <Input
          label="Capacity"
          name="capacity"
          value={formData.capacity}
          onChange={handleChange}
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />

        <Button type="submit">
          Save Gym Info
        </Button>

      </form>

    </div>
  );
};

export default EditGym;
