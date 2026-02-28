import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/ui/Input";
import Button from "../../../components/ui/Button";
import { Checkbox } from "../../../components/ui/Checkbox";
import Icon from "../../../components/AppIcon";

const LoginForm = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ---------------- VALIDATION ----------------
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ---------------- INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // ---------------- LOGIN SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (response.ok) {
          console.log(data.user);

        // Save login info
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("userName", data.user.name);
        localStorage.setItem("userRole", data.user.role);
        localStorage.setItem("userStatus", data.user.status);
        localStorage.setItem("userId", data.user.id);

        // ROLE + APPROVAL BASED NAVIGATION
       // ROLE + STATUS BASED NAVIGATION

if (data.user.role === "owner") {

  if (data.user.status === "not_submitted") {
    navigate("/partner-with-us");
  }

  else if (data.user.status === "pending") {
    navigate("/approval-pending");
  }

  else if (data.user.status === "approved") {

    const payment = localStorage.getItem("paymentStatus");

    if(payment === "paid"){
      navigate("/owner-dashboard");
    } else {
      navigate("/owner-approved");
    }
  }

  else if (data.user.status === "rejected") {
    navigate("/owner-rejected");
  }

}
else {
  navigate("/user-dashboard");
}

      } else {
        setErrors({ submit: data.message });
      }

    } catch (error) {
      console.log("Login Error:", error);
      setErrors({ submit: "Server error ❌" });
    }

    setIsLoading(false);
  };

  // ---------------- UI ----------------
  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
      />

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9"
        >
          <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
        </button>
      </div>

      <Checkbox
        label="Remember me"
        name="rememberMe"
        checked={formData.rememberMe}
        onChange={handleChange}
      />

      {errors.submit && (
        <p className="text-red-500 text-sm">{errors.submit}</p>
      )}

      <Button type="submit" fullWidth loading={isLoading}>
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>

    </form>
  );
};

export default LoginForm;
