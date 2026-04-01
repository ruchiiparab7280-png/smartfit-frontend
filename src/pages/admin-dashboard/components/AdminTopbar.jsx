import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

const sectionTitles = {
  dashboard: 'Dashboard',
  gyms: 'Gyms',
  users: 'Users',
  plans: 'Plans',
  payments: 'Payments',
};

const AdminTopbar = ({ activeSection, setSidebarOpen }) => {
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

      {/* Right — notifications + admin avatar */}
      <div className="flex items-center gap-4">
        {/* Notification bell */}
        <button
          className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={20} />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-orange-500 rounded-full" />
        </button>

        {/* Admin avatar */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-orange-500/20 border border-orange-500/40 flex items-center justify-center">
            <User size={16} className="text-orange-400" />
          </div>
          <span className="hidden sm:block text-sm font-medium text-slate-300">
            Admin
          </span>
        </div>
      </div>
    </header>
  );
};

export default React.memo(AdminTopbar);
