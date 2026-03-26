import React, { useEffect, useState } from 'react';
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

const formatINR = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "0";
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    num
  );
};

const formatRelativeTime = (dateLike) => {
  if (!dateLike) return "";
  const d = new Date(dateLike);
  if (Number.isNaN(d.getTime())) return "";

  const diffMs = Date.now() - d.getTime();
  const diffSec = Math.floor(diffMs / 1000);

  if (diffSec < 60) return "just now";
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;

  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24)
    return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
};

const GymOwnerDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'gym-details': return <GymDetails />;
      case "trial-requests": return <FreeTrialRequests />;
      case 'trainers': return <TrainerManagement />;
      case 'trainer-requests': return <TrainerRequests />;
      case 'supplements': return <SupplementManagement />;
      case 'memberships': return <MembershipManagement />;
      case 'earnings': return <Earnings />;
      default: return <DashboardHome setActiveSection={setActiveSection} />;
    }
  };

  return (
    <div className="flex h-screen bg-[#0b1220] overflow-hidden text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
          <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">SmartFit</p>
            <p className="text-slate-400 text-xs">Owner Dashboard</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems?.map(item => (
            <button
              key={item?.id}
              onClick={() => { setActiveSection(item?.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${activeSection === item.id
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              {item?.icon}
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-700">
          <a href="/" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Back to Site</span>
          </a>
        </div>
      </aside>
      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header className="bg-[#0f172a] border-b border-slate-800 px-4 lg:px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-lg font-bold text-white">
                {menuItems?.find(m => m?.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">SmartFit Multi Gym Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3"></div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const DashboardHome = ({ setActiveSection }) => {
  const [statCards, setStatCards] = useState([
    {
      label: "Monthly Revenue",
      value: "Loading...",
      change: "",
      positive: true,
      icon: "💰",
      color: "border-l-blue-600",
    },
    {
      label: "Active Trainers",
      value: "Loading...",
      change: "",
      positive: true,
      icon: "🏋️",
      color: "border-l-purple-600",
    },
    {
      label: "Active Members",
      value: "Loading...",
      change: "",
      positive: true,
      icon: "👥",
      color: "border-l-emerald-600",
    },
    {
      label: "Supplement Sales",
      value: "Loading...",
      change: "",
      positive: true,
      icon: "💊",
      color: "border-l-amber-500",
    },
  ]);

  const [recentActivity, setRecentActivity] = useState([
    { text: "Loading...", time: "", type: "loading" },
    { text: "Loading...", time: "", type: "loading" },
    { text: "Loading...", time: "", type: "loading" },
    { text: "Loading...", time: "", type: "loading" },
    { text: "Loading...", time: "", type: "loading" },
  ]);

  useEffect(() => {
    const ownerEmail = localStorage.getItem("userEmail");
    if (!ownerEmail) return;

    const apiBase = import.meta.env.VITE_API_URL;

    const fetchDashboardHome = async () => {
      try {
        const [
          earningsRes,
          trainersRes,
          gymMembersRes,
          supplementOrdersRes,
          supplementsRes,
          trainerRequestsRes,
        ] = await Promise.all([
          fetch(`${apiBase}/owner-earnings/${ownerEmail}`).then((r) =>
            r.json()
          ),
          fetch(`${apiBase}/trainers/${ownerEmail}`).then((r) => r.json()),
          fetch(`${apiBase}/gym-members/${ownerEmail}`).then((r) => r.json()),
          fetch(`${apiBase}/supplement-orders/${ownerEmail}`).then((r) =>
            r.json()
          ),
          fetch(`${apiBase}/supplements/${ownerEmail}`).then((r) => r.json()),
          fetch(`${apiBase}/trainer-requests/${ownerEmail}`).then((r) =>
            r.json()
          ),
        ]);

        // 1) Monthly Revenue
        const monthlyData = Array.isArray(earningsRes?.monthlyData)
          ? earningsRes.monthlyData
          : [];
        const now = new Date();
        const currentMonth = now.toLocaleString("en-US", { month: "short" });
        const prevMonthDate = new Date(now);
        prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
        const prevMonth = prevMonthDate.toLocaleString("en-US", {
          month: "short",
        });

        const currMonthObj = monthlyData.find((m) => m?.month === currentMonth);
        const prevMonthObj = monthlyData.find((m) => m?.month === prevMonth);

        const monthlyRevenue =
          Number(currMonthObj?.membership || 0) +
          Number(currMonthObj?.trainer || 0) +
          Number(currMonthObj?.supplement || 0);

        const prevTotal =
          Number(prevMonthObj?.membership || 0) +
          Number(prevMonthObj?.trainer || 0) +
          Number(prevMonthObj?.supplement || 0);

        const changePct =
          prevTotal > 0 ? ((monthlyRevenue - prevTotal) / prevTotal) * 100 : 0;

        const monthlyChangeText = `${changePct >= 0 ? "+" : ""}${changePct.toFixed(
          1
        )}%`;
        const monthlyPositive = changePct >= 0;

        // 2) Active Trainers
        const activeTrainersCount = Array.isArray(trainersRes)
          ? trainersRes.length
          : 0;

        // 3) Active Members
        const activeMembers = (Array.isArray(gymMembersRes) ? gymMembersRes : [])
          .filter((m) => (m?.status || "").toLowerCase() === "active");
        const activeMembersCount = activeMembers.length;

        // Members added this week (for badge)
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        const newMembersThisWeek = activeMembers.filter((m) => {
          const start = m?.start_date ? new Date(m.start_date) : null;
          return start && !Number.isNaN(start.getTime()) && start >= weekAgo;
        }).length;

        // 4) Supplement Sales (paid orders)
        const paidOrders = (Array.isArray(supplementOrdersRes)
          ? supplementOrdersRes
          : []
        ).filter((o) => (o?.payment_status || "").toLowerCase() === "paid");

        const supplementsPaidThisMonth = paidOrders.filter((o) => {
          const d = o?.pickup_date ? new Date(o.pickup_date) : null;
          if (!d || Number.isNaN(d.getTime())) return false;
          const monthShort = d.toLocaleString("en-US", { month: "short" });
          return monthShort === currentMonth;
        });
        const supplementsPaidPrevMonth = paidOrders.filter((o) => {
          const d = o?.pickup_date ? new Date(o.pickup_date) : null;
          if (!d || Number.isNaN(d.getTime())) return false;
          const monthShort = d.toLocaleString("en-US", { month: "short" });
          return monthShort === prevMonth;
        });

        const supplementSalesThisMonth = supplementsPaidThisMonth.reduce(
          (sum, o) => sum + Number(o?.price || 0),
          0
        );
        const supplementSalesPrevMonth = supplementsPaidPrevMonth.reduce(
          (sum, o) => sum + Number(o?.price || 0),
          0
        );

        const supplementChangePct =
          supplementSalesPrevMonth > 0
            ? ((supplementSalesThisMonth - supplementSalesPrevMonth) /
              supplementSalesPrevMonth) *
            100
            : 0;
        const supplementPositive = supplementChangePct >= 0;
        const supplementChangeText = `${supplementChangePct >= 0 ? "+" : ""}${supplementChangePct.toFixed(
          1
        )}%`;

        // 5) Recent Activity
        const activities = [];

        // Trainer requests (pending)
        (Array.isArray(trainerRequestsRes) ? trainerRequestsRes : [])
          .filter((r) => (r?.status || "").toLowerCase() === "pending")
          .slice(0, 3)
          .forEach((r) => {
            activities.push({
              text: `New trainer request from ${r?.full_name || r?.user_email || r?.trainer_name || "Unknown"
                }`,
              time: formatRelativeTime(r?.date || r?.created_at || r?.requested_at),
              _sortTime: r?.date || r?.created_at || r?.requested_at || null,
              type: "request",
            });
          });

        // New member joins (active memberships)
        activeMembers
          .slice()
          .sort((a, b) => new Date(b?.start_date || 0) - new Date(a?.start_date || 0))
          .slice(0, 3)
          .forEach((m) => {
            activities.push({
              text: `New member ${m?.user_email || "Unknown"} joined`,
              time: formatRelativeTime(m?.start_date),
              _sortTime: m?.start_date || null,
              type: "member",
            });
          });

        // Supplement sales (paid)
        paidOrders
          .slice()
          .sort(
            (a, b) =>
              new Date(b?.pickup_date || 0) - new Date(a?.pickup_date || 0)
          )
          .slice(0, 3)
          .forEach((o) => {
            activities.push({
              text: `Supplement sold ₹${formatINR(o?.price || 0)}`,
              time: formatRelativeTime(o?.pickup_date),
              _sortTime: o?.pickup_date || null,
              type: "sale",
            });
          });

        // Supplement stock (out of stock)
        const stockItems = (Array.isArray(supplementsRes) ? supplementsRes : [])
          .filter((s) => (s?.stock_status || "").toLowerCase() === "out_of_stock")
          .slice(0, 2);

        stockItems.forEach((s) => {
          activities.push({
            text: `${s?.name || "Supplement"} stock is running low`,
            time: "recently",
            _sortTime: null,
            type: "stock",
          });
        });

        const sorted = activities
          .slice()
          .sort((a, b) => new Date(b?._sortTime || 0) - new Date(a?._sortTime || 0))
          .slice(0, 5)
          .map(({ _sortTime, ...rest }) => rest);

        setStatCards([
          {
            label: "This Month Revenue",
            value: `₹${formatINR(monthlyRevenue)}`,
            change: monthlyChangeText,
            positive: monthlyPositive,
            icon: "💰",
            color: "border-l-blue-600",
          },
          {
            label: "Active Trainers",
            value: String(activeTrainersCount),
            change: `+${activeTrainersCount} active`,
            positive: true,
            icon: "🏋️",
            color: "border-l-purple-600",
          },
          {
            label: "Active Members",
            value: String(activeMembersCount),
            change: `+${newMembersThisWeek} this week`,
            positive: true,
            icon: "👥",
            color: "border-l-emerald-600",
          },
          {
            label: "Supplement Sales",
            value: `₹${formatINR(supplementSalesThisMonth)}`,
            change: supplementChangeText,
            positive: supplementPositive,
            icon: "💊",
            color: "border-l-amber-500",
          },
        ]);

        setRecentActivity(sorted);
      } catch (err) {
        console.log("Gym owner dashboard fetch error:", err);
      }
    };

    fetchDashboardHome();
  }, []);

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">
          Welcome back, Gym Owner 👋
        </h2>
        <p className="text-slate-400 mt-1">
          Here's what's happening at SmartFit Multi Gym today
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards?.map((card) => (
          <div
            key={card?.label}
            className={`bg-[#111827] rounded-xl shadow-lg border border-slate-800 border-l-4 ${card?.color} p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card?.icon}</span>
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-full ${card?.positive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-600"
                  }`}
              >
                {card?.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{card?.value}</p>
            <p className="text-sm text-slate-400 mt-1">{card?.label}</p>
          </div>
        ))}
      </div>

      {/* Quick actions + Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#111827] rounded-xl shadow-sm border border-slate-800 p-6">
          <h3 className="font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {recentActivity?.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 py-2 border-b border-slate-800 last:border-0"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{item?.text}</p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {item?.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#111827] rounded-xl shadow-sm border border-slate-800 p-6">
          <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              {
                label: "Add New Trainer",
                section: "trainers",
                color: "bg-orange-500 text-white hover:bg-orange-600",
              },
              {
                label: "Review Requests",
                section: "trainer-requests",
                color: "bg-orange-500 text-white hover:bg-orange-600",
              },
              {
                label: "Add Supplement",
                section: "supplements",
                color: "bg-orange-500 text-white hover:bg-orange-600",
              },
              {
                label: "New Membership Plan",
                section: "memberships",
                color:
                  "bg-orange-500 text-white hover:bg-orange-600bg-orange-500 text-white hover:bg-orange-600",
              },
              {
                label: "View Earnings",
                section: "earnings",
                color: "bg-orange-500 text-white hover:bg-orange-600",
              },
            ]?.map((action) => (
              <button
                key={action?.label}
                onClick={() => setActiveSection(action?.section)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${action?.color}`}
              >
                {action?.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GymOwnerDashboard;