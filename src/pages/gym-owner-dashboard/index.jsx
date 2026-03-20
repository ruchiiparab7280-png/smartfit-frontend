import React, { useState, useEffect } from 'react';
import GymDetails from './components/GymDetails';
import FreeTrialRequests from "./components/FreeTrialRequests";
import TrainerManagement from './components/TrainerManagement';
import TrainerRequests from './components/TrainerRequests';
import SupplementManagement from './components/SupplementManagement';
import MembershipManagement from './components/MembershipManagement';
import Earnings from './components/Earnings';

import {
  LayoutDashboard,
  Building2,
  Users,
  UserPlus,
  Gift,
  Pill,
  CreditCard,
  DollarSign
} from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard size={18} /> },
  { id: "gym-details", label: "Edit Gym Details", icon: <Building2 size={18} /> },
  { id: "trial-requests", label: "Free Trial Requests", icon: <Gift size={18} /> },
  { id: "trainers", label: "Trainer Management", icon: <Users size={18} /> },
  { id: "trainer-requests", label: "Trainer Requests", icon: <UserPlus size={18} /> },
  { id: "supplements", label: "Supplement Management", icon: <Pill size={18} /> },
  { id: "memberships", label: "Membership Management", icon: <CreditCard size={18} /> },
  { id: "earnings", label: "Earnings", icon: <DollarSign size={18} /> },
];

const GymOwnerDashboard = () => {

  const [dashboardStats, setDashboardStats] = useState({
    revenue: 0,
    trainers: 0,
    members: 0,
    supplements: 0
  });

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ================= FETCH ================= */

  useEffect(() => {

    const fetchDashboard = async () => {
      try {
        setLoading(true);

        const email = localStorage.getItem("userEmail");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/owner-dashboard/${email}`
        );

        const data = await res.json();

        setDashboardStats({
          revenue: data.revenue || 0,
          trainers: data.trainers || 0,
          members: data.members || 0,
          supplements: data.supplements || 0
        });

        setActivities(data.activities || []);

      } catch (err) {
        console.log("Dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);

  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case 'gym-details': return <GymDetails />;
      case "trial-requests": return <FreeTrialRequests />;
      case 'trainers': return <TrainerManagement />;
      case 'trainer-requests': return <TrainerRequests />;
      case 'supplements': return <SupplementManagement />;
      case 'memberships': return <MembershipManagement />;
      case 'earnings': return <Earnings />;
      default:
        return (
          <DashboardHome
            setActiveSection={setActiveSection}
            loading={loading}
            activities={activities}
            dashboardStats={dashboardStats}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#0b1220] overflow-hidden text-white">
      <aside className="w-64 bg-slate-900 flex flex-col">
        <div className="p-5 border-b border-slate-700 font-bold">
          SmartFit Owner Dashboard
        </div>

        <nav className="flex-1 p-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-2 p-2 rounded ${
                activeSection === item.id
                  ? "bg-orange-500"
                  : "hover:bg-slate-800"
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};

/* ================= DASHBOARD HOME ================= */

const DashboardHome = ({ loading, activities, dashboardStats, setActiveSection }) => {

  if (loading) {
    return (
      <div className="text-white text-center mt-20 text-xl">
        Loading dashboard...
      </div>
    );
  }

  const statCards = [
    {
      label: 'Monthly Revenue',
      value: `₹${dashboardStats.revenue}`,
      icon: '💰'
    },
    {
      label: 'Active Trainers',
      value: dashboardStats.trainers,
      icon: '🏋️'
    },
    {
      label: 'Active Members',
      value: dashboardStats.members,
      icon: '👥'
    },
    {
      label: 'Supplement Sales',
      value: `₹${dashboardStats.supplements}`,
      icon: '💊'
    },
  ];

  return (
    <div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((card, i) => (
          <div key={i} className="bg-[#111827] p-5 rounded-xl border border-slate-800">
            <div className="text-2xl">{card.icon}</div>
            <p className="text-2xl font-bold mt-2">{card.value}</p>
            <p className="text-slate-400">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="bg-[#111827] p-6 rounded-xl border border-slate-800">
        <h3 className="font-bold mb-4">Recent Activity</h3>

        {activities.length === 0 && (
          <p className="text-slate-400">No recent activity</p>
        )}

        {activities.map((item, i) => (
          <div key={i} className="border-b border-slate-800 py-2">
            <p>{item.text}</p>
            <p className="text-xs text-slate-400">
              {item.time ? new Date(item.time).toLocaleString() : "Now"}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default GymOwnerDashboard;