import React, { useState } from 'react';
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


const statCards = [
  { label: 'Monthly Revenue', value: '$10,400', change: '+8.6%', positive: true, icon: '💰', color: 'border-l-blue-600' },
  { label: 'Active Trainers', value: '4', change: '+1 this month', positive: true, icon: '🏋️', color: 'border-l-purple-600' },
  { label: 'Active Members', value: '248', change: '+12 this week', positive: true, icon: '👥', color: 'border-l-emerald-600' },
  { label: 'Supplement Sales', value: '$1,100', change: '+15.8%', positive: true, icon: '💊', color: 'border-l-amber-500' },
];

const recentActivity = [
  { text: 'New trainer request from David Kim', time: '2 hours ago', type: 'request' },
  { text: 'Marcus Johnson completed 3 sessions today', time: '4 hours ago', type: 'session' },
  { text: 'New member John Doe joined Basic Monthly plan', time: '6 hours ago', type: 'member' },
  { text: 'Whey Protein Gold stock running low (5 units)', time: '1 day ago', type: 'stock' },
  { text: 'Monthly earnings report generated', time: '2 days ago', type: 'report' },
];

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
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
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

        {/* Owner info */}
        <div className="px-6 py-4 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">GO</div>
            <div className="min-w-0">
              <p className="text-white text-sm font-semibold truncate">Gym Owner</p>
              <p className="text-slate-400 text-xs truncate">SmartFit Multi Gym</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems?.map(item => (
            <button
              key={item?.id}
              onClick={() => { setActiveSection(item?.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${
                activeSection === item?.id
                  ? 'bg-blue-600 text-white' :'text-slate-400 hover:text-white hover:bg-slate-800'
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
        <header className="bg-white border-b border-slate-200 px-4 lg:px-6 py-4 flex items-center justify-between flex-shrink-0">
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
              <h1 className="text-lg font-bold text-slate-800">
                {menuItems?.find(m => m?.id === activeSection)?.label || 'Dashboard'}
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">SmartFit Multi Gym Management</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">GO</div>
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

const DashboardHome = ({ setActiveSection }) => (
  <div>
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-slate-800">Welcome back, Gym Owner 👋</h2>
      <p className="text-slate-500 mt-1">Here's what's happening at SmartFit Multi Gym today</p>
    </div>

    {/* Stat cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
      {statCards?.map(card => (
        <div key={card?.label} className={`bg-white rounded-xl shadow-sm border border-slate-200 border-l-4 ${card?.color} p-5`}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{card?.icon}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              card?.positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
            }`}>{card?.change}</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{card?.value}</p>
          <p className="text-sm text-slate-500 mt-1">{card?.label}</p>
        </div>
      ))}
    </div>

    {/* Quick actions + Activity */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {recentActivity?.map((item, i) => (
            <div key={i} className="flex items-start gap-3 py-2 border-b border-slate-50 last:border-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-slate-700">{item?.text}</p>
                <p className="text-xs text-slate-400 mt-0.5">{item?.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="font-bold text-slate-800 mb-4">Quick Actions</h3>
        <div className="space-y-2">
          {[
            { label: 'Add New Trainer', section: 'trainers', color: 'bg-blue-50 text-blue-700 hover:bg-blue-100' },
            { label: 'Review Requests', section: 'trainer-requests', color: 'bg-amber-50 text-amber-700 hover:bg-amber-100' },
            { label: 'Add Supplement', section: 'supplements', color: 'bg-purple-50 text-purple-700 hover:bg-purple-100' },
            { label: 'New Membership Plan', section: 'memberships', color: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' },
            { label: 'View Earnings', section: 'earnings', color: 'bg-slate-50 text-slate-700 hover:bg-slate-100' },
          ]?.map(action => (
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

export default GymOwnerDashboard;
