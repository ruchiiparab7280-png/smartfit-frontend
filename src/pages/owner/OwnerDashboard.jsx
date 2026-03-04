import React, { useState, useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OwnerDashboard = () => {

  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("overview");
  const [showNotifications, setShowNotifications] = useState(false);

  const [trainers, setTrainers] = useState([]);
  const [proteins, setProteins] = useState([]);
  const [trialRequests, setTrialRequests] = useState([]);
  const [trainerRequests, setTrainerRequests] = useState([]);

  const [gymProfile, setGymProfile] = useState({
    name: "",
    owner: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    openTime: "",
    closeTime: "",
    description: "",
    image: ""
  });

  useEffect(() => {
    setTrainers(JSON.parse(localStorage.getItem("gymTrainers")) || []);
    setProteins(JSON.parse(localStorage.getItem("gymProteins")) || []);
    setTrialRequests(JSON.parse(localStorage.getItem("trialRequests")) || []);
    setTrainerRequests(JSON.parse(localStorage.getItem("trainerRequests")) || []);

    const savedProfile = JSON.parse(localStorage.getItem("gymProfile")) || {};
    setGymProfile({
      name: savedProfile.name || "",
      owner: savedProfile.owner || "",
      phone: savedProfile.phone || "",
      email: savedProfile.email || "",
      address: savedProfile.address || "",
      city: savedProfile.city || "",
      state: savedProfile.state || "",
      pincode: savedProfile.pincode || "",
      openTime: savedProfile.openTime || "",
      closeTime: savedProfile.closeTime || "",
      description: savedProfile.description || "",
      image: savedProfile.image || ""
    });

  }, []);

  const saveProfile = () => {
    localStorage.setItem("gymProfile", JSON.stringify(gymProfile));
    alert("Gym Profile Updated Successfully!");
  };

  const updateTrialStatus = (id, newStatus) => {
    const updated = trialRequests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    localStorage.setItem("trialRequests", JSON.stringify(updated));
    setTrialRequests(updated);
  };

  const updateTrainerStatus = (id, newStatus) => {
    const updated = trainerRequests.map(req =>
      req.id === id ? { ...req, status: newStatus } : req
    );
    localStorage.setItem("trainerRequests", JSON.stringify(updated));
    setTrainerRequests(updated);
  };

  const pendingTrials = trialRequests.filter(t => t.status === "pending");
  const pendingTrainerReq = trainerRequests.filter(t => t.status === "pending");

  const totalRevenue =
    trialRequests.filter(t => t.status === "approved").length * 500 +
    trainerRequests.filter(t => t.status === "approved").length * 2000 +
    proteins.length * 1000;

  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      <MainNavigation />

      <div className="flex pt-20">

        {/* SIDEBAR */}
        <div className="w-64 min-h-screen bg-[#1e293b] p-6 border-r border-gray-700">

          <h2 className="text-2xl font-bold mb-8 text-orange-400">
            SmartFit Admin
          </h2>

          {["overview","trials","trainerReq","editProfile"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`block w-full text-left p-3 mb-3 rounded transition ${
                activeTab === tab
                  ? "bg-orange-500"
                  : "hover:bg-gray-700"
              }`}
            >
              {tab === "overview" && "Dashboard"}
              {tab === "trials" && "Trial Requests"}
              {tab === "trainerReq" && "Trainer Requests"}
              {tab === "editProfile" && "Edit Profile"}
            </button>
          ))}

          <div className="mt-8 border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm mb-3">Management</p>

            <button
              onClick={() => navigate("/trainers")}
              className="block w-full text-left p-3 mb-3 rounded hover:bg-gray-700"
            >
              Manage Trainers
            </button>

            <button
              onClick={() => navigate("/supplements")}
              className="block w-full text-left p-3 mb-3 rounded hover:bg-gray-700"
            >
              Manage Supplements
            </button>
          </div>

        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-10 overflow-y-auto">

          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold">
              Owner Dashboard
            </h1>
          </div>

          {/* OVERVIEW */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-4 gap-6 mb-10">
              <div className="bg-[#1e293b] p-6 rounded-xl">
                <p>Total Trainers</p>
                <h2 className="text-3xl font-bold mt-2">{trainers.length}</h2>
              </div>

              <div className="bg-[#1e293b] p-6 rounded-xl">
                <p>Total Supplements</p>
                <h2 className="text-3xl font-bold mt-2">{proteins.length}</h2>
              </div>

              <div className="bg-[#1e293b] p-6 rounded-xl">
                <p>Pending Requests</p>
                <h2 className="text-3xl font-bold mt-2 text-yellow-400">
                  {pendingTrials.length + pendingTrainerReq.length}
                </h2>
              </div>

              <div className="bg-[#1e293b] p-6 rounded-xl">
                <p>Total Revenue</p>
                <h2 className="text-3xl font-bold mt-2 text-green-400">
                  ₹ {totalRevenue}
                </h2>
              </div>
            </div>
          )}

          {/* TRIAL REQUESTS */}
          {activeTab === "trials" && trialRequests.map(req => (
            <div key={req.id} className="bg-[#1e293b] p-6 rounded-xl mb-4">
              <p>User: {req.user}</p>
              <p>Status: {req.status}</p>
              {req.status === "pending" && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => updateTrialStatus(req.id,"approved")}
                    className="bg-green-500 px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateTrialStatus(req.id,"rejected")}
                    className="bg-red-500 px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* TRAINER REQUESTS */}
          {activeTab === "trainerReq" && trainerRequests.map(req => (
            <div key={req.id} className="bg-[#1e293b] p-6 rounded-xl mb-4">
              <p>User: {req.user}</p>
              <p>Status: {req.status}</p>
              {req.status === "pending" && (
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => updateTrainerStatus(req.id,"approved")}
                    className="bg-green-500 px-4 py-1 rounded"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateTrainerStatus(req.id,"rejected")}
                    className="bg-red-500 px-4 py-1 rounded"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* EDIT PROFILE */}
          {activeTab === "editProfile" && (
            <div className="bg-[#1e293b] p-8 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">
                Edit Gym Profile
              </h2>

              {Object.keys(gymProfile).map((key) => (
                key !== "image" ? (
                  <input
                    key={key}
                    type="text"
                    placeholder={key}
                    value={gymProfile[key]}
                    onChange={(e)=>setGymProfile({...gymProfile,[key]:e.target.value})}
                    className="w-full p-3 mb-4 rounded bg-gray-700"
                  />
                ) : null
              ))}

              <input
                type="file"
                onChange={(e)=>{
                  const file = e.target.files[0];
                  if(!file) return;
                  const reader = new FileReader();
                  reader.onloadend = ()=>{
                    setGymProfile({...gymProfile,image:reader.result});
                  };
                  reader.readAsDataURL(file);
                }}
                className="mb-4"
              />

              <button
                onClick={saveProfile}
                className="bg-orange-500 px-6 py-2 rounded"
              >
                Save Profile
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;