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
        console.log("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();

    const interval = setInterval(fetchDashboard, 10000);
    return () => clearInterval(interval);

  }, []);

  // ✅ moved statCards here (inside component)
  const statCards = [
    {
      label: 'Monthly Revenue',
      value: `₹${dashboardStats.revenue}`,
      change: 'Live',
      positive: true,
      icon: '💰',
      color: 'border-l-blue-600'
    },
    {
      label: 'Active Trainers',
      value: dashboardStats.trainers,
      change: 'Live',
      positive: true,
      icon: '🏋️',
      color: 'border-l-purple-600'
    },
    {
      label: 'Active Members',
      value: dashboardStats.members,
      change: 'Live',
      positive: true,
      icon: '👥',
      color: 'border-l-emerald-600'
    },
    {
      label: 'Supplement Sales',
      value: `₹${dashboardStats.supplements}`,
      change: 'Live',
      positive: true,
      icon: '💊',
      color: 'border-l-amber-500'
    },
  ];

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
            statCards={statCards}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-[#0b1220] text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 hidden lg:block">
        <div className="p-5 font-bold">SmartFit</div>
        <nav className="p-3">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full text-left px-3 py-2 mb-2 rounded ${
                activeSection === item.id
                  ? 'bg-orange-500'
                  : 'hover:bg-slate-800'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

const DashboardHome = ({ setActiveSection, loading, activities, statCards }) => {

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-6">
        Welcome back, Gym Owner 👋
      </h2>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map(card => (
          <div key={card.label} className="bg-[#111827] p-5 rounded-lg">
            <p className="text-2xl">{card.icon}</p>
            <p className="text-xl font-bold">{card.value}</p>
            <p className="text-sm text-slate-400">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Activity */}
      <div className="bg-[#111827] p-5 rounded-lg mb-6">
        <h3 className="mb-3 font-bold">Recent Activity</h3>

        {activities.length === 0 && <p>No activity</p>}

        {activities.map((a, i) => (
          <p key={i} className="text-sm mb-2">
            {a.text}
          </p>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button onClick={() => setActiveSection('trainers')} className="bg-orange-500 px-4 py-2 rounded w-full">
          Add Trainer
        </button>

        <button onClick={() => setActiveSection('trainer-requests')} className="bg-orange-500 px-4 py-2 rounded w-full">
          Review Requests
        </button>
      </div>

    </div>
  );
};

export default GymOwnerDashboard;