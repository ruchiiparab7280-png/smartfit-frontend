import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavigation from "../../../components/MainNavigation";
import Icon from "../../../components/AppIcon";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your email address");
      setIsError(true);
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      console.log("📧 Sending forgot-password request for:", email);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      console.log("📧 Forgot password response:", { status: res.status, data });

      if (res.ok) {
        setMessage("Reset link sent to your email! Check your inbox.");
        setIsError(false);
        setIsSent(true);
      } else {
        setMessage(data.message || "Failed to send reset email.");
        setIsError(true);
      }
    } catch (err) {
      console.error("📧 Forgot password error:", err);
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
                    <Icon name={isSent ? "MailCheck" : "KeyRound"} size={32} color="var(--color-primary)" />
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-foreground text-center mb-2">
                  {isSent ? "Check Your Email" : "Forgot Password?"}
                </h2>
                <p className="text-sm text-muted-foreground text-center mb-6">
                  {isSent
                    ? "We've sent a password reset link to your email address."
                    : "No worries! Enter your email and we'll send you a reset link."}
                </p>

                {!isSent ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-1.5">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2">
                          <Icon name="Mail" size={18} className="text-muted-foreground" />
                        </div>
                        <input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setMessage("");
                          }}
                          className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                      </div>
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
                      disabled={isLoading}
                      className="w-full bg-primary text-white py-2.5 rounded-lg font-medium hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isLoading ? (
                        <>
                          <Icon name="Loader2" size={18} className="animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Icon name="Send" size={18} />
                          Send Reset Link
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
                      onClick={() => {
                        setIsSent(false);
                        setEmail("");
                        setMessage("");
                      }}
                      className="w-full bg-muted text-foreground py-2.5 rounded-lg font-medium hover:opacity-80 transition-all flex items-center justify-center gap-2"
                    >
                      <Icon name="RotateCcw" size={18} />
                      Try Another Email
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

export default ForgotPassword;