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
  const [isExpired, setIsExpired] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Password strength checker
  const getPasswordStrength = (pwd) => {
    if (!pwd) return { level: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 6) score++;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;

    if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
    if (score <= 2) return { level: 2, label: "Fair", color: "bg-orange-500" };
    if (score <= 3) return { level: 3, label: "Good", color: "bg-yellow-500" };
    if (score <= 4) return { level: 4, label: "Strong", color: "bg-green-500" };
    return { level: 5, label: "Very Strong", color: "bg-emerald-500" };
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password) {
      setMessage("Please enter a new password.");
      setIsError(true);
      return;
    }

    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      setIsError(true);
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
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
        setMessage(data.message || "Password reset successful!");
        setIsError(false);
        setIsSuccess(true);

        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/sign-in-sign-up");
        }, 3000);
      } else {
        setMessage(data.message || "Failed to reset password.");
        setIsError(true);
        if (data.expired) {
          setIsExpired(true);
        }
      }
    } catch (err) {
      if (err.name === "TypeError" && err.message.includes("fetch")) {
        setMessage("Cannot reach the server. It may be starting up — please wait 30 seconds and try again.");
      } else {
        setMessage("Something went wrong. Please try again later.");
      }
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
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isSuccess
                      ? "bg-green-500/10"
                      : isExpired
                        ? "bg-orange-500/10"
                        : "bg-primary/10"
                  }`}>
                    <Icon
                      name={isSuccess ? "ShieldCheck" : isExpired ? "TimerOff" : "LockKeyhole"}
                      size={32}
                      color={
                        isSuccess
                          ? "var(--color-success, #22c55e)"
                          : isExpired
                            ? "#f97316"
                            : "var(--color-primary)"
                      }
                    />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                  {isSuccess
                    ? "Password Updated!"
                    : isExpired
                      ? "Link Expired"
                      : "Set New Password"}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {isSuccess
                    ? "Your password has been reset successfully. Redirecting to sign in..."
                    : isExpired
                      ? "This reset link has expired. Please request a new one."
                      : "Create a strong password for your SmartFit account."}
                </p>

                {/* Success State */}
                {isSuccess && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <Icon name="CheckCircle2" size={16} className="text-green-500 flex-shrink-0" />
                      <p className="text-sm text-green-500">{message}</p>
                    </div>

                    <button
                      onClick={() => navigate("/sign-in-sign-up")}
                      className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Icon name="LogIn" size={18} />
                      Go to Sign In
                    </button>
                  </div>
                )}

                {/* Expired State */}
                {isExpired && !isSuccess && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <Icon name="AlertTriangle" size={16} className="text-orange-500 flex-shrink-0" />
                      <p className="text-sm text-orange-500">{message}</p>
                    </div>

                    <button
                      onClick={() => navigate("/forgot-password")}
                      className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center gap-2"
                    >
                      <Icon name="Send" size={18} />
                      Request New Reset Link
                    </button>
                  </div>
                )}

                {/* Form State */}
                {!isSuccess && !isExpired && (
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

                      {/* Password Strength Indicator */}
                      {password && (
                        <div className="mt-2">
                          <div className="flex gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <div
                                key={i}
                                className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                                  i <= strength.level ? strength.color : "bg-border"
                                }`}
                              />
                            ))}
                          </div>
                          <p className={`text-xs ${
                            strength.level <= 1 ? "text-red-500" :
                            strength.level <= 2 ? "text-orange-500" :
                            strength.level <= 3 ? "text-yellow-500" :
                            "text-green-500"
                          }`}>
                            {strength.label}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Icon name="ShieldCheck" size={18} className="text-muted-foreground" />
                        </div>
                        <input
                          type={showConfirm ? "text" : "password"}
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
                          onClick={() => setShowConfirm(!showConfirm)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Icon name={showConfirm ? "EyeOff" : "Eye"} size={18} />
                        </button>
                      </div>

                      {/* Match indicator */}
                      {confirmPassword && (
                        <div className="flex items-center gap-1 mt-1.5">
                          <Icon
                            name={password === confirmPassword ? "CheckCircle2" : "XCircle"}
                            size={14}
                            className={password === confirmPassword ? "text-green-500" : "text-red-500"}
                          />
                          <p className={`text-xs ${password === confirmPassword ? "text-green-500" : "text-red-500"}`}>
                            {password === confirmPassword ? "Passwords match" : "Passwords do not match"}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Error message */}
                    {message && isError && (
                      <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                        <Icon name="AlertCircle" size={16} className="text-red-500 flex-shrink-0" />
                        <p className="text-sm text-red-500">{message}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isLoading || !password || !confirmPassword}
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