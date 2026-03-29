import React from "react";
import { ArrowLeft, Users, Briefcase, CreditCard } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Partnership = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Navbar */}
      <div className="sticky top-0 bg-background/80 backdrop-blur border-b px-6 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>
        <h1 className="font-semibold">Partnership Agreement</h1>
      </div>

      {/* Hero */}
      <div className="text-center py-12 px-6">
        <h1 className="text-4xl font-bold mb-3">Partner with SmartFit</h1>
        <p className="text-muted-foreground">
          Grow your gym business with our platform.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 pb-12 space-y-6">

        <Card icon={<Users />} title="Overview"
          text="SmartFit allows gyms to list their services and receive bookings." />

        <Card icon={<CreditCard />} title="Commission"
          text="SmartFit may charge a commission on bookings as agreed." />

        <Card icon={<Briefcase />} title="Responsibilities"
          text="Gym owners must maintain accurate details and service quality." />

        <Card icon={<Users />} title="Booking Rules"
          text="All confirmed bookings must be honored." />

        <Card icon={<CreditCard />} title="Payments"
          text="Payments are processed via Razorpay or SmartFit." />

        <Card icon={<Briefcase />} title="Termination"
          text="Either party can terminate with prior notice." />

        <Card icon={<Users />} title="Liability"
          text="SmartFit is not responsible for injuries or damages." />

        <Card icon={<Briefcase />} title="Branding"
          text="SmartFit may promote your gym on the platform." />

        <Card icon={<Users />} title="Contact"
          text="Email: partners@smartfit.com" />

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

export default Partnership;