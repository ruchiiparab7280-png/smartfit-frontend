import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Wallet,
} from 'lucide-react';

const sectionMeta = {
  dashboard: { label: 'Dashboard', icon: <LayoutDashboard size={48} className="text-slate-600" />, description: 'Overview & analytics will appear here.' },
  gyms: { label: 'Gyms', icon: <Building2 size={48} className="text-slate-600" />, description: 'Manage all registered gyms.' },
  users: { label: 'Users', icon: <Users size={48} className="text-slate-600" />, description: 'View and manage platform users.' },
  plans: { label: 'Plans', icon: <CreditCard size={48} className="text-slate-600" />, description: 'Configure membership plans.' },
  payments: { label: 'Payments', icon: <Wallet size={48} className="text-slate-600" />, description: 'Track payment records.' },
};

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const meta = sectionMeta[activeSection] || sectionMeta.dashboard;

  return (
    <div className="flex h-screen bg-[#0b1220] overflow-hidden text-white">
      {/* Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <AdminTopbar
          activeSection={activeSection}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Page content — placeholder per section */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          <div className="flex flex-col items-center justify-center h-full text-center">
            {meta.icon}
            <h2 className="text-xl font-bold text-white mt-4">{meta.label}</h2>
            <p className="text-slate-400 mt-2 max-w-md">{meta.description}</p>
            <span className="mt-6 inline-block px-4 py-2 rounded-lg bg-slate-800 text-xs text-slate-400 font-medium">
              Page content coming soon
            </span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
