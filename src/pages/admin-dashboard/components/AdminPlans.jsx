import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';

const formatINR = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return '0';
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(num);
};

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const AdminPlans = () => {
  const [memberships, setMemberships] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/memberships`);
        const data = await res.json();
        setMemberships(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log('Fetch memberships error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  const filtered = memberships.filter(m => {
    const q = search.toLowerCase();
    return (m.user_email || '').toLowerCase().includes(q) ||
           (m.gym_name || '').toLowerCase().includes(q) ||
           (m.plan_name || '').toLowerCase().includes(q);
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">All Memberships</h2>
          <p className="text-sm text-slate-400">{memberships.length} total memberships</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search plans..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="pl-9 pr-4 py-2 rounded-lg bg-slate-800 border border-slate-700 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-orange-500 w-full sm:w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-800 bg-slate-900/50">
                <th className="px-4 py-3 font-medium">User</th>
                <th className="px-4 py-3 font-medium">Gym</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Plan</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Duration</th>
                <th className="px-4 py-3 font-medium">Price</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Start</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((m) => (
                <tr key={m.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{m.user_email}</td>
                  <td className="px-4 py-3 text-slate-400">{m.gym_name || '—'}</td>
                  <td className="px-4 py-3 text-slate-300 hidden md:table-cell">{m.plan_name || '—'}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{m.duration || '—'}</td>
                  <td className="px-4 py-3 text-white font-medium">₹{formatINR(m.price)}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${
                      m.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                      m.status === 'expired' ? 'bg-red-500/10 text-red-400' :
                      'bg-slate-700 text-slate-300'
                    }`}>
                      {m.status || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{formatDate(m.start_date)}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell">{formatDate(m.expiry_date)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={8} className="px-4 py-8 text-center text-slate-500">No memberships found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminPlans);
