import React, { useEffect, useState } from 'react';
import { Users, Building2, CreditCard, DollarSign, TrendingUp, ArrowRight, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area, CartesianGrid } from 'recharts';

const formatINR = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return '0';
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
};

const AdminDashboardHome = ({ setActiveSection }) => {
  const [stats, setStats] = useState(null);
  const [recentGyms, setRecentGyms] = useState([]);
  const [recentPlans, setRecentPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiBase = import.meta.env.VITE_API_URL;

    const fetchData = async () => {
      try {
        const [statsRes, gymsRes, plansRes] = await Promise.all([
          fetch(`${apiBase}/admin/stats`).then(r => r.json()),
          fetch(`${apiBase}/admin/gyms`).then(r => r.json()),
          fetch(`${apiBase}/admin/memberships`).then(r => r.json()),
        ]);
        setStats(statsRes);
        setRecentGyms(Array.isArray(gymsRes) ? gymsRes.slice(0, 5) : []);
        setRecentPlans(Array.isArray(plansRes) ? plansRes.slice(0, 5) : []);
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
    { label: 'Total Gyms', value: stats?.totalGyms ?? '—', icon: <Building2 size={22} />, color: 'border-l-purple-500', bg: 'bg-purple-500/10', iconColor: 'text-purple-400' },
    { label: 'Active Gym Subscriptions', value: stats?.activeGyms ?? '—', icon: <CheckCircle size={22} />, color: 'border-l-emerald-500', bg: 'bg-emerald-500/10', iconColor: 'text-emerald-400' },
    { label: 'Active Memberships', value: stats?.activeMemberships ?? '—', icon: <CreditCard size={22} />, color: 'border-l-cyan-500', bg: 'bg-cyan-500/10', iconColor: 'text-cyan-400' },
    { label: 'Total Revenue', value: stats ? `₹${formatINR(stats.totalRevenue)}` : '—', icon: <DollarSign size={22} />, color: 'border-l-orange-500', bg: 'bg-orange-500/10', iconColor: 'text-orange-400' },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const revenueData = stats?.monthlyRevenue || [];
  const userData = stats?.monthlyUsers || [];

  return (
    <div>
      {/* Welcome */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Welcome back, Admin 👋</h2>
        <p className="text-slate-400 mt-1">Here's an overview of SmartFit platform</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-4 mb-8">
        {statCards.map((card) => (
          <div
            key={card.label}
            className={`bg-[#111827] rounded-xl shadow-lg border border-slate-800 border-l-4 ${card.color} p-4`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg ${card.bg}`}>
                <span className={card.iconColor}>{card.icon}</span>
              </div>
              <TrendingUp size={14} className="text-slate-600" />
            </div>
            <p className="text-xl font-bold text-white">{card.value}</p>
            <p className="text-xs text-slate-400 mt-1">{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Monthly Revenue */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-6">
          <h3 className="font-bold text-white mb-4">Monthly Revenue</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1f2937' }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1f2937' }} tickFormatter={v => `₹${formatINR(v)}`} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  formatter={(value) => [`₹${formatINR(value)}`, 'Revenue']}
                />
                <Bar dataKey="amount" fill="#f97316" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* User Growth */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-6">
          <h3 className="font-bold text-white mb-4">User Growth</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                <XAxis dataKey="month" tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1f2937' }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 12 }} axisLine={{ stroke: '#1f2937' }} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                  formatter={(value) => [value, 'New Users']}
                />
                <Area type="monotone" dataKey="count" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Gyms + Recent Plan Purchases */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Gyms */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-6">
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
                  <th className="pb-3 font-medium">Gym</th>
                  <th className="pb-3 font-medium">Owner</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentGyms.map((gym) => (
                  <tr key={gym.id} className="border-b border-slate-800/50 last:border-0">
                    <td className="py-3 text-white">{gym.gym_name || '—'}</td>
                    <td className="py-3 text-slate-400 text-xs">{gym.email}</td>
                    <td className="py-3"><GymStatusBadge status={gym.status} paymentStatus={gym.payment_status} /></td>
                  </tr>
                ))}
                {recentGyms.length === 0 && (
                  <tr><td colSpan={3} className="py-6 text-center text-slate-500">No gyms yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Plan Purchases */}
        <div className="bg-[#111827] rounded-xl border border-slate-800 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Plan Purchases</h3>
            <button
              onClick={() => setActiveSection('plans')}
              className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1"
            >
              View All <ArrowRight size={12} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500 border-b border-slate-800">
                  <th className="pb-3 font-medium">User</th>
                  <th className="pb-3 font-medium">Plan</th>
                  <th className="pb-3 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentPlans.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800/50 last:border-0">
                    <td className="py-3 text-white text-xs">{p.user_email}</td>
                    <td className="py-3 text-slate-300">{p.plan_name || '—'}</td>
                    <td className="py-3 text-emerald-400 font-medium">₹{formatINR(p.price)}</td>
                  </tr>
                ))}
                {recentPlans.length === 0 && (
                  <tr><td colSpan={3} className="py-6 text-center text-slate-500">No plans yet</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 p-6">
        <h3 className="font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Manage Gyms', section: 'gyms' },
            { label: 'View Users', section: 'users' },
            { label: 'View Plans', section: 'plans' },
            { label: 'View Payments', section: 'payments' },
          ].map((action) => (
            <button
              key={action.label}
              onClick={() => setActiveSection(action.section)}
              className="px-4 py-2.5 rounded-lg text-sm font-medium transition-colors bg-orange-500 text-white hover:bg-orange-600"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const GymStatusBadge = ({ status, paymentStatus }) => {
  if (status === 'approved' && paymentStatus === 'paid') {
    return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400">Active</span>;
  }
  if (status === 'approved') {
    return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400">Approved (No Plan)</span>;
  }
  if (status === 'pending') {
    return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400">Pending Approval</span>;
  }
  if (status === 'rejected') {
    return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-400">Rejected</span>;
  }
  return <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-700 text-slate-300">{status || '—'}</span>;
};

export default React.memo(AdminDashboardHome);
