import React, { useEffect} from "react";
import MainNavigation from "../../components/MainNavigation";
import Icon from "../../components/AppIcon";
import { useNavigate } from "react-router-dom";



const OwnerDashboard = () => {

  const paymentStatus = localStorage.getItem("paymentStatus");

useEffect(() => {
  const paymentStatus = localStorage.getItem("paymentStatus");

  if (paymentStatus !== "paid") {
    navigate("/payment-page");
  }
}, []);

const navigate = useNavigate();

useEffect(() => {
  const payment = localStorage.getItem("paymentStatus");

  if (payment !== "paid") {
    navigate("/owner-plan");
  }
}, []);
  const approveTrial = (req) => {
    const updated = { ...req, status: "approved" };
    localStorage.setItem("trialRequest", JSON.stringify(updated));
    window.location.reload();
  };

  const approveTrainer = (req) => {
    const updated = { ...req, status: "approved" };
    localStorage.setItem("trainerRequest", JSON.stringify(updated));
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <div className="container-custom py-8">

        <div className="mb-8">
          <div className="flex items-center gap-3">
            <Icon name="ShieldCheck" size={32} color="var(--color-primary)" />
            <h1 className="text-4xl font-bold text-foreground">
              Owner Dashboard
            </h1>
          </div>
          <p className="text-muted-foreground">
            Manage your gym, trainers and requests
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg font-bold">Trial Requests</h3>
            <p className="text-3xl">{trialRequests.length}</p>
          </div>

          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg font-bold">Trainer Requests</h3>
            <p className="text-3xl">{trainerRequests.length}</p>
          </div>

          <div className="bg-card p-6 rounded-lg">
            <h3 className="text-lg font-bold">Gym Controls</h3>
            <p className="text-sm">Manage Trainers & Supplements</p>
          </div>

        </div>

        {/* CONTROL PANEL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

          <div className="bg-card p-6 rounded-lg cursor-pointer"
            onClick={() => navigate("/supplements")}>
            <h3 className="text-xl font-bold mb-2">Manage Supplements</h3>
            <p>Add protein, change price, upload photo</p>
          </div>

          <div className="bg-card p-6 rounded-lg cursor-pointer"
            onClick={() => navigate("/trainers")}>
            <h3 className="text-xl font-bold mb-2">Manage Trainers</h3>
            <p>Add trainer, price & photo</p>
          </div>

        </div>

        {/* FREE TRIAL REQUESTS */}
        <div className="bg-card p-6 rounded-lg mb-6">
          <h2 className="text-2xl font-bold mb-4">Free Trial Requests</h2>

          {trialRequests.map((req, i) => (
            <div key={i} className="border p-4 mb-3 rounded">
              <p>User: {req.user}</p>
              <p>Status: {req.status}</p>

              <button
                onClick={() => approveTrial(req)}
                className="bg-green-500 px-4 py-2 rounded text-white mt-2"
              >
                Approve
              </button>
            </div>
          ))}
        </div>

        {/* TRAINER REQUESTS */}
        <div className="bg-card p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Trainer Booking Requests</h2>

          {trainerRequests.map((req, i) => (
            <div key={i} className="border p-4 mb-3 rounded">
              <p>User: {req.user}</p>
              <p>Status: {req.status}</p>

              <button
                onClick={() => approveTrainer(req)}
                className="bg-green-500 px-4 py-2 rounded text-white mt-2"
              >
                Approve
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;