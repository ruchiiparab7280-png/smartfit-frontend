import React, { useEffect, useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import { useNavigate } from "react-router-dom";
import { Users, Package, ClipboardList, CalendarCheck } from "lucide-react";

const OwnerDashboard = () => {

  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [trials, setTrials] = useState([]);
  const [trainerBookings, setTrainerBookings] = useState([]);

  // 🔐 PAYMENT PROTECTION
  useEffect(() => {
    const paymentStatus = localStorage.getItem("paymentStatus");

    if (paymentStatus !== "paid") {
      navigate("/owner-payment");
    }
  }, []);

  // 📊 LOAD DATA
  useEffect(() => {
    setTrainers(JSON.parse(localStorage.getItem("gymTrainers")) || []);
    setProteins(JSON.parse(localStorage.getItem("gymProteins")) || []);
    setTrials(JSON.parse(localStorage.getItem("trialRequests")) || []);
    setTrainerBookings(JSON.parse(localStorage.getItem("trainerRequests")) || []);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <div className="flex pt-20">

        {/* SIDEBAR */}
        <div className="w-72 min-h-screen bg-gradient-to-b from-black to-gray-900 p-6 border-r border-white/10">

          <h2 className="text-3xl font-bold text-orange-400 mb-8">
            Owner Panel
          </h2>

          <div className="space-y-4">

            <button
              onClick={() => navigate("/trainers")}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-orange-500 transition"
            >
              <Users size={20} />
              Manage Trainers
            </button>

            <button
              onClick={() => navigate("/supplements")}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-orange-500 transition"
            >
              <Package size={20} />
              Manage Supplements
            </button>

            <button
              onClick={() => navigate("/trials")}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-orange-500 transition"
            >
              <ClipboardList size={20} />
              Trial Requests
            </button>

            <button
              onClick={() => navigate("/trainer-requests")}
              className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-orange-500 transition"
            >
              <CalendarCheck size={20} />
              Trainer Bookings
            </button>

          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-10 w-full bg-orange-500 p-3 rounded-lg hover:opacity-80"
          >
            ← Back to Home
          </button>

        </div>

        {/* CONTENT */}
        <div className="flex-1 p-10">

          {/* HEADER */}
          <div className="mb-10">
            <h1 className="text-5xl font-bold text-orange-400 mb-2">
              Gym Overview
            </h1>
            <p className="text-gray-400">
              Monitor your gym activity in real-time
            </p>
          </div>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <DashboardCard
              title="Total Trainers"
              value={trainers.length}
              icon={<Users />}
            />

            <DashboardCard
              title="Total Supplements"
              value={proteins.length}
              icon={<Package />}
            />

            <DashboardCard
              title="Trial Requests"
              value={trials.length}
              icon={<ClipboardList />}
            />

            <DashboardCard
              title="Trainer Bookings"
              value={trainerBookings.length}
              icon={<CalendarCheck />}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;
