import React, { useEffect, useState } from 'react';
import { Users, Building2, CreditCard, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

const formatINR = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return '0';
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
};

const AdminDashboardHome = ({ setActiveSection }) => {
  const [stats, setStats] = useState(null);
  const [recentGyms, setRecentGyms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        const [statsRes, gymsRes] = await Promise.all([
          fetch(`${apiBase}/admin/stats`).then(r => r.json()),
          fetch(`${apiBase}/admin/gyms`).then(r => r.json()),
        ]);
        setStats(statsRes);
        setRecentGyms(Array.isArray(gymsRes) ? gymsRes.slice(0, 5) : []);
      } catch (err) {
        console.log('Admin dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    { label: 'Total Users', value: stats?.totalUsers ?? '—', icon: <Users size={22} />, color: 'border-l-blue-500', bg: 'bg-blue-500/10', iconColor: 'text-blue-400' },
    { label: 'Active Gyms', value: stats?.activeGyms ?? '—', icon: <Building2 size={22} />, color: 'border-l-emerald-500', bg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
    { label: 'Active Memberships', value: stats?.activeMemberships ?? '—', icon: <CreditCard size={22} />, color: 'border-l-purple-500', bg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
    { label: 'Total Revenue', value: stats ? `₹${formatINR(stats.totalRevenue)}` : '—', icon: <DollarSign size={22} />, color: 'border-l-orange-500', bg: 'bg-orange-500/10', iconColor: 'text-orange-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Welcome back, Admin 👋</h2>
        <p className="text-slate-400 mt-1">Here's an overview of SmartFit platform</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-[#111827] rounded-xl shadow-lg border border-slate-800 border-l-4 ${card.color} p-5`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <span className={card.iconColor}>{card.icon}</span>
              </div>
              <TrendingUp size={16} className="text-slate-600" />
            </div>
            <p className="text-2xl font-bold text-white">{card.value}</p>
            <p className="text-sm text-slate-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Gyms + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Gyms */}
        <div className="lg:col-span-2 bg-[#111827] rounded-xl shadow-sm border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Gyms</h3>
            <button
              onClick={() => setActiveSection('gyms')}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-800">
                  <th className="pb-3 font-medium">Gym Name</th>
                  <th className="pb-3 font-medium">Owner</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentGyms.map((gym) => (
                  <tr key={gym.id} className="border-b border-slate-800/50 last:border-0">
                    <td className="py-3 text-white">{gym.gym_name || '—'}</td>
                    <td className="py-3 text-slate-400">{gym.email}</td>
                    <td className="py-3">
                      <StatusBadge status={gym.status} />
                    </td>
                  </tr>
                ))}
                {recentGyms.length === 0 && (
                  <tr><td colSpan={3} className="py-6 text-center text-slate-500">No gyms found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#111827] rounded-xl shadow-sm border border-slate-800 p-6">
          <h3 className="font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {[
              { label: 'Manage Gyms', section: 'gyms' },
              { label: 'View Users', section: 'users' },
              { label: 'View Plans', section: 'plans' },
              { label: 'View Payments', section: 'payments' },
            ].map((action) => (
              <button
                key={action.label}
                onClick={() => setActiveSection(action.section)}
                className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors bg-orange-500 text-white hover:bg-orange-600"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles = {
    approved: 'bg-emerald-500/10 text-emerald-400',
    pending: 'bg-amber-500/10 text-amber-400',
    rejected: 'bg-red-500/10 text-red-400',
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${styles[status] || 'bg-slate-700 text-slate-300'}`}>
      {status || '—'}
    </span>
  );
};

export default React.memo(AdminDashboardHome);
