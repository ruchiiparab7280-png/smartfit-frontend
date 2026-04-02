import React from 'react';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  Wallet,
  LogOut,
} from 'lucide-react';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
  { id: 'gyms', label: 'Gyms', icon: <Building2 size={18} /> },
  { id: 'users', label: 'Users', icon: <Users size={18} /> },
  { id: 'plans', label: 'Plans', icon: <CreditCard size={18} /> },
  { id: 'payments', label: 'Payments', icon: <Wallet size={18} /> },
];

const AdminSidebar = ({ activeSection, setActiveSection, sidebarOpen, setSidebarOpen }) => {
  const handleNavClick = (id) => {
    setActiveSection(id);
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-slate-900 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
          <div className="w-9 h-9 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-tight">SmartFit</p>
            <p className="text-slate-400 text-xs">Admin Panel</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg mb-1 text-sm font-medium transition-colors ${activeSection === item.id
                  ? 'bg-orange-500 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="px-3 py-4 border-t border-slate-700">
          <a
            href="/"
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <LogOut size={18} />
            <span>Back to Site</span>
          </a>
        </div>
      </aside>
    </>
  );
};

export default React.memo(AdminSidebar);
