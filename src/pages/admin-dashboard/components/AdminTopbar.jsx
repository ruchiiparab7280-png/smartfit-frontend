import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu, } from 'lucide-react';

const sectionTitles = {
  dashboard: 'Dashboard',
  gyms: 'Gyms',
  users: 'Users',
  plans: 'Plans',
  payments: 'Payments',
};

const AdminTopbar = ({ activeSection, setSidebarOpen }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <header className="bg-[#0f172a] border-b border-slate-800 px-4 lg:px-6 py-4 flex items-center justify-between flex-shrink-0">
      {/* Left — hamburger + title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-lg font-bold text-white">
            {sectionTitles[activeSection] || 'Dashboard'}
          </h1>
          <p className="text-xs text-slate-400 hidden sm:block">
            SmartFit Administration
          </p>
        </div>
      </div>
      {/* Right side */}
      <div className="flex items-center gap-4">

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white text-sm font-medium transition"
        >
          Logout
        </button>

      </div>
    </header>
  );
};

export default React.memo(AdminTopbar);
