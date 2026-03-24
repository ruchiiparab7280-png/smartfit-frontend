import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainNavigation from "../../../components/MainNavigation";
import Icon from "../../../components/AppIcon";

const UpdatePassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage("Please enter a new password");
      setIsError(true);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters");
      setIsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage("");

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
        setMessage("Password updated successfully! Redirecting to login...");
        setIsError(false);
        setIsSuccess(true);

        setTimeout(() => {
          navigate("/sign-in-sign-up");
        }, 3000);
      } else {
        setMessage(data.message);
        setIsError(true);
      }
    } catch {
      setMessage("Server error. Please try again later.");
      setIsError(true);
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <main className="main-content">
        <div className="container-custom py-12 lg:py-20">
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              <div className="bg-card rounded-2xl border border-border card-elevation-md p-6 lg:p-8">

                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name={isSuccess ? "ShieldCheck" : "Lock"} size={32} color="var(--color-primary)" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                  {isSuccess ? "Password Updated!" : "Set New Password"}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {isSuccess
                    ? "Your password has been reset. You'll be redirected to login shortly."
                    : "Create a strong new password for your account."}
                </p>

                {!isSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5">

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        New Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Icon name="Lock" size={18} className="text-muted-foreground" />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter new password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                            setMessage("");
                          }}
                          className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon name={showPassword ? "EyeOff" : "Eye"} size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Icon name="LockKeyhole" size={18} className="text-muted-foreground" />
                        </div>
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setMessage("");
                          }}
                          className="w-full pl-10 pr-10 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={18} />
                        </button>
                      </div>
                    </div>

                    {/* Password requirements hint */}
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Icon name="Info" size={12} />
                      Password must be at least 6 characters long
                    </p>

                    {/* Error message */}
                    {message && isError && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <Icon name="AlertCircle" size={16} className="text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-500">{message}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" size={18} className="animate-spin" />
                          Updating...
                        </>
                      ) : (
                        <>
                          <Icon name="ShieldCheck" size={18} />
                          Update Password
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4">
                    {/* Success message */}
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Icon name="CheckCircle2" size={16} className="text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-500">{message}</p>
                    </div>

                    <button
                      onClick={() => navigate("/sign-in-sign-up")}
                      className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Icon name="LogIn" size={18} />
                      Go to Login Now
                    </button>
                  </div>
                )}

                {/* Back to login */}
                <div className="mt-6 text-center">
                  <button
                    onClick={() => navigate("/sign-in-sign-up")}
                    className="text-sm text-muted-foreground hover:text-primary transition-all inline-flex items-center gap-1"
                  >
                    <Icon name="ArrowLeft" size={14} />
                    Back to Sign In
                  </button>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UpdatePassword;