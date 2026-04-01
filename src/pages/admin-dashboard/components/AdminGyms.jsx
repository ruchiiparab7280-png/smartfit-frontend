import React, { useEffect, useState } from 'react';
import { Search, CheckCircle, XCircle, Building2 } from 'lucide-react';

const AdminGyms = () => {
  const [gyms, setGyms] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const apiBase = import.meta.env.VITE_API_URL;

  const fetchGyms = async () => {
    try {
      const res = await fetch(`${apiBase}/admin/gyms`);
      const data = await res.json();
      setGyms(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log('Fetch gyms error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchGyms(); }, []);

  const handleApprove = async (email) => {
    setActionLoading(email);
    try {
      await fetch(`${apiBase}/approve-gym/${email}`, { method: 'PUT' });
      await fetchGyms();
    } catch (err) {
      console.log('Approve error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (email) => {
    setActionLoading(email);
    try {
      await fetch(`${apiBase}/reject-gym/${email}`, { method: 'PUT' });
      await fetchGyms();
    } catch (err) {
      console.log('Reject error:', err);
    } finally {
      setActionLoading(null);
    }
  };

  const filtered = gyms.filter(g => {
    const q = search.toLowerCase();
    return (g.gym_name || '').toLowerCase().includes(q) ||
           (g.email || '').toLowerCase().includes(q) ||
           (g.address || '').toLowerCase().includes(q);
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
          <h2 className="text-xl font-bold text-white">All Gyms</h2>
          <p className="text-sm text-slate-400">{gyms.length} total gyms registered</p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search gyms..."
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
                <th className="px-4 py-3 font-medium">Gym Name</th>
                <th className="px-4 py-3 font-medium">Owner Email</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Phone</th>
                <th className="px-4 py-3 font-medium hidden lg:table-cell">Address</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Payment</th>
                <th className="px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((gym) => (
                <tr key={gym.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Building2 size={16} className="text-slate-500 flex-shrink-0" />
                      <span className="text-white font-medium">{gym.gym_name || '—'}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{gym.email}</td>
                  <td className="px-4 py-3 text-slate-400 hidden md:table-cell">{gym.phone || '—'}</td>
                  <td className="px-4 py-3 text-slate-400 hidden lg:table-cell max-w-[200px] truncate">{gym.address || '—'}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={gym.status} />
                  </td>
                  <td className="px-4 py-3">
                    <PaymentBadge status={gym.payment_status} />
                  </td>
                  <td className="px-4 py-3">
                    {gym.status === 'pending' ? (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleApprove(gym.email)}
                          disabled={actionLoading === gym.email}
                          className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
                          title="Approve"
                        >
                          <CheckCircle size={16} />
                        </button>
                        <button
                          onClick={() => handleReject(gym.email)}
                          disabled={actionLoading === gym.email}
                          className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors disabled:opacity-50"
                          title="Reject"
                        >
                          <XCircle size={16} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-600">—</span>
                    )}
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">No gyms found</td></tr>
              )}
            </tbody>
          </table>
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

const PaymentBadge = ({ status }) => {
  const isPaid = status === 'paid';
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${isPaid ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-700 text-slate-400'}`}>
      {isPaid ? 'Paid' : 'Unpaid'}
    </span>
  );
};

export default React.memo(AdminGyms);
