import React from "react";
import { ArrowLeft, FileText, AlertTriangle, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}
      <div className="sticky top-0 bg-background/80 backdrop-blur border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="font-semibold">Terms of Service</h1>
      </div>

      {/* Hero */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold mb-3">Terms & Conditions</h1>
        <p className="text-muted-foreground">
          Please read these terms carefully before using SmartFit.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12 space-y-6">

        <Card icon={<FileText />} title="Platform Usage"
          text="SmartFit connects users with gyms and trainers. We do not own or operate gyms." />

        <Card icon={<AlertTriangle />} title="User Responsibilities"
          text="Users must provide accurate information and follow gym rules." />

        <Card icon={<CreditCard />} title="Payments"
          text="Payments are handled via Razorpay. Refunds depend on gym policies." />

        <Card icon={<FileText />} title="Gym Owners"
          text="Gym owners must maintain accurate details and honor bookings." />

        <Card icon={<AlertTriangle />} title="Prohibited Activities"
          text="Fraud, misuse, or abuse of the platform is strictly prohibited." />

        <Card icon={<FileText />} title="Termination"
          text="Accounts may be suspended for violating terms." />

        <Card icon={<AlertTriangle />} title="Liability"
          text="SmartFit is not responsible for injuries or gym-related issues." />

        <Card icon={<FileText />} title="Contact"
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

export default Terms;