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

const AdminPayments = () => {
  const [payments, setPayments] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/payments`);
        const data = await res.json();
        setPayments(Array.isArray(data) ? data : []);
      } catch (err) {
        console.log('Fetch payments error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const filtered = payments.filter(p => {
    const q = search.toLowerCase();
    return (p.email || '').toLowerCase().includes(q) ||
      (p.type || '').toLowerCase().includes(q) ||
      (p.payment_id || '').toLowerCase().includes(q);
  });

  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

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
          <h2 className="text-xl font-bold text-white">All Payments</h2>
          <p className="text-sm text-slate-400">
            {payments.length} transactions &middot; Total: ₹{formatINR(totalAmount)}
          </p>
        </div>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search payments..."
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
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Amount</th>
                <th className="px-4 py-3 font-medium hidden md:table-cell">Payment ID</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium hidden sm:table-cell">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-b border-slate-800/50 last:border-0 hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 text-white font-medium">{p.email}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${p.type === 'Owner Registration' ? 'bg-purple-500/10 text-purple-400' : 'bg-blue-500/10 text-blue-400'
                      }`}>
                      {p.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-white font-medium">₹{formatINR(p.amount)}</td>
                  <td className="px-4 py-3 text-slate-400 font-mono text-xs hidden md:table-cell max-w-[180px] truncate">
                    {p.payment_id}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold capitalize ${p.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                        p.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' :
                          p.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                            'bg-amber-500/10 text-amber-400'
                      }`}>
                      {p.status || '—'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 hidden sm:table-cell">{formatDate(p.date)}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No payments found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminPayments);
