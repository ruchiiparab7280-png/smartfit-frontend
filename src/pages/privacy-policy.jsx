import React from "react";
import { ArrowLeft, Shield, Database, Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}
      <div className="sticky top-0 bg-background/80 backdrop-blur border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="font-semibold">Privacy Policy</h1>
      </div>

      {/* Hero */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold mb-3">Your Privacy Matters</h1>
        <p className="text-muted-foreground">
          SmartFit is committed to protecting your personal data.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12 space-y-6">

        <Card icon={<Database />} title="Information We Collect"
          text="We collect personal details like name, email, phone number, gym preferences, and booking data. Payments are securely processed via Razorpay." />

        <Card icon={<User />} title="How We Use Your Data"
          text="Your data helps us manage bookings, connect users with gyms/trainers, and improve platform experience." />

        <Card icon={<Shield />} title="Data Sharing"
          text="We never sell your data. Information may be shared with gym owners for bookings and payment providers for transactions." />

        <Card icon={<Lock />} title="Security"
          text="We use industry-level security practices to protect your data, but no system is 100% secure." />

        <Card icon={<User />} title="Your Rights"
          text="You can access, update, or delete your personal data anytime." />

        <Card icon={<Database />} title="Cookies"
          text="We use cookies to enhance user experience and performance." />

        <Card icon={<Shield />} title="Contact Us"
          text="Email: support@smartfit.com" />

      </div>
    </div>
  );
};

const Card = ({ icon, title, text }) => (
  <div className="bg-card border rounded-xl p-6 flex gap-4 hover:shadow-lg transition">
    <div className="text-primary">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <p className="text-muted-foreground">{text}</p>
    </div>
  </div>
);

export default PrivacyPolicy;