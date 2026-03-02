import React, { useEffect, useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import { useNavigate } from "react-router-dom";
import { Users, Dumbbell, ClipboardList, CalendarCheck } from "lucide-react";

const OwnerDashboard = () => {

  const navigate = useNavigate();

  const [trainers, setTrainers] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [trials, setTrials] = useState([]);
  const [trainerBookings, setTrainerBookings] = useState([]);

  useEffect(() => {

    // 🚨 PAYMENT SECURITY
    const paymentStatus = localStorage.getItem("paymentStatus");

    if (paymentStatus !== "paid") {
      navigate("/owner-payment");
      return;
    }

    setTrainers(JSON.parse(localStorage.getItem("gymTrainers")) || []);
    setProteins(JSON.parse(localStorage.getItem("gymProteins")) || []);
    setTrials(JSON.parse(localStorage.getItem("trialRequests")) || []);
    setTrainerBookings(JSON.parse(localStorage.getItem("trainerRequests")) || []);

  }, []);

  const stats = [
    {
      title: "Total Trainers",
      value: trainers.length,
      icon: <Users size={28} />,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Total Supplements",
      value: proteins.length,
      icon: <Dumbbell size={28} />,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: "Trial Requests",
      value: trials.length,
      icon: <ClipboardList size={28} />,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Trainer Bookings",
      value: trainerBookings.length,
      icon: <CalendarCheck size={28} />,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#020617] text-white">

      <MainNavigation />

      <div className="flex pt-20">

        {/* SIDEBAR */}
        <div className="w-64 min-h-screen bg-black/40 border-r border-white/10 p-6 backdrop-blur-lg">

          <h2 className="text-2xl font-bold mb-6 text-orange-400">
            Owner Panel
          </h2>

          <button
            onClick={() => navigate("/trainers")}
            className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500 transition"
          >
            Manage Trainers
          </button>

          <button
            onClick={() => navigate("/supplements")}
            className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500 transition"
          >
            Manage Supplements
          </button>

          <button
            onClick={() => navigate("/trials")}
            className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500 transition"
          >
            Trial Requests
          </button>

          <button
            onClick={() => navigate("/trainer-requests")}
            className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500 transition"
          >
            Trainer Bookings
          </button>

          <button
            onClick={() => navigate("/")}
            className="mt-10 w-full bg-white/20 p-2 rounded hover:bg-white/30"
          >
            ← Back
          </button>

        </div>

        {/* MAIN */}
        <div className="flex-1 p-10">

          <h1 className="text-4xl font-bold mb-10 text-orange-400">
            Gym Overview
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {stats.map((stat, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-gradient-to-br ${stat.color} shadow-xl hover:scale-105 transition`}
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="bg-white/20 p-2 rounded-lg">
                    {stat.icon}
                  </div>
                </div>

                <p className="text-sm opacity-80">
                  {stat.title}
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {stat.value}
                </h2>
              </div>
            ))}

          </div>

        </div>

      </div>
    </div>
  );
};

export default OwnerDashboard;