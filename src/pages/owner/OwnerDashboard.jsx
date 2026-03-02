import React, { useEffect, useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {

  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [trials, setTrials] = useState([]);
  const [trainerBookings, setTrainerBookings] = useState([]);

  // 🔐 PAYMENT GUARD
  useEffect(() => {
    const status = localStorage.getItem("paymentStatus");

    if (!status || status !== "paid") {
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <MainNavigation />

      <div className="flex pt-20">

        {/* SIDEBAR */}
        <div className="w-72 min-h-screen bg-black/70 border-r border-orange-500/20 p-6 backdrop-blur-xl shadow-lg">

          <h2 className="text-3xl font-bold mb-8 text-orange-400">
            Owner Panel
          </h2>

          <div className="space-y-3">

            <button
              onClick={() => navigate("/trainers")}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition"
            >
              🧑‍🏫 Manage Trainers
            </button>

            <button
              onClick={() => navigate("/supplements")}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition"
            >
              🥤 Manage Supplements
            </button>

            <button
              onClick={() => navigate("/trials")}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition"
            >
              🎟 Trial Requests
            </button>

            <button
              onClick={() => navigate("/trainer-requests")}
              className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-orange-500 hover:text-white transition"
            >
              📅 Trainer Bookings
            </button>

          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-10 w-full bg-orange-500/20 p-2 rounded hover:bg-orange-500 transition"
          >
            ← Back to Home
          </button>

        </div>

        {/* CONTENT */}
        <div className="flex-1 p-10">

          <h1 className="text-4xl font-bold mb-10 text-orange-400">
            Gym Overview
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            <div className="bg-white/5 p-6 rounded-xl border border-orange-500/20 shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Total Trainers</p>
              <h2 className="text-4xl font-bold text-orange-400">
                {trainers.length}
              </h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-orange-500/20 shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Total Supplements</p>
              <h2 className="text-4xl font-bold text-orange-400">
                {proteins.length}
              </h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-orange-500/20 shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Trial Requests</p>
              <h2 className="text-4xl font-bold text-orange-400">
                {trials.length}
              </h2>
            </div>

            <div className="bg-white/5 p-6 rounded-xl border border-orange-500/20 shadow-lg hover:scale-105 transition">
              <p className="text-gray-400">Trainer Bookings</p>
              <h2 className="text-4xl font-bold text-orange-400">
                {trainerBookings.length}
              </h2>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;