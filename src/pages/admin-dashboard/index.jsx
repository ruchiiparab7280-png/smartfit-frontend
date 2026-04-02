import React, { useState } from 'react';
import AdminSidebar from './components/AdminSidebar';
import AdminTopbar from './components/AdminTopbar';
import AdminDashboardHome from './components/AdminDashboardHome';
import AdminGyms from './components/AdminGyms';
import AdminUsers from './components/AdminUsers';
import AdminPlans from './components/AdminPlans';
import AdminPayments from './components/AdminPayments';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeSection) {
      case 'gyms':      return <AdminGyms />;
      case 'users':     return <AdminUsers />;
      case 'plans':     return <AdminPlans />;
      case 'payments':  return <AdminPayments />;
      default:          return <AdminDashboardHome setActiveSection={setActiveSection} />;
    }
  };

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

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
