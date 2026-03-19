import React, { useState } from "react";

const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email) {
    setMessage("Please enter email ❌");
    return;
  }

  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Reset link sent to your email 📧");
    } else {
      setMessage(data.message);
    }

  } catch (err) {
    console.log(err);
    setMessage("Server error ❌");
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="bg-card p-8 rounded-2xl border border-border w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          Forgot Password
        </h2>

        <p className="text-sm text-muted-foreground mb-6 text-center">
          Enter your email to receive reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg bg-background"
          />

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg"
          >
            Send Reset Link
          </button>

        </form>

        {message && (
          <p className="text-center text-sm mt-4 text-green-500">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};

export default ForgotPassword;