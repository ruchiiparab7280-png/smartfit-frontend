import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdatePassword = () => {

  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage("Enter new password ❌");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password updated successfully ✅");

        // 🔥 redirect after 2 sec
        setTimeout(() => {
          navigate("/sign-in-sign-up");
        }, 2000);

      } else {
        setMessage(data.message);
      }

    } catch {
      setMessage("Server error ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 border rounded-lg w-80">

        <h2 className="text-xl mb-4">Set New Password</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border mb-3"
          />

          <button className="w-full bg-primary text-white py-2">
            Update Password
          </button>

        </form>

        {message && <p className="mt-3 text-center">{message}</p>}

      </div>
    </div>
  );
};

export default UpdatePassword;