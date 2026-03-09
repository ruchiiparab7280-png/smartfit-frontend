import React, { useState } from 'react';

const initialPlans = [
  { id: 1, name: 'Basic Monthly', duration: '1 Month', price: 49, description: 'Access to gym floor, basic equipment, and locker rooms. Perfect for casual fitness enthusiasts.' },
  { id: 2, name: 'Standard Quarterly', duration: '3 Months', price: 129, description: 'All Basic features plus group classes, sauna access, and one free personal training session.' },
  { id: 3, name: 'Premium Semi-Annual', duration: '6 Months', price: 229, description: 'Full access to all facilities, unlimited group classes, 3 personal training sessions, and nutrition consultation.' },
  { id: 4, name: 'Elite Annual', duration: '6 Months', price: 399, description: 'VIP access, unlimited personal training, priority booking, guest passes, and exclusive member events.' },
];

const emptyForm = { name: '', duration: '1 Month', price: '', description: '' };
const durations = ['1 Month', '3 Months', '6 Months'];

const durationColor = (d) => {
  if (d === '1 Month') return 'bg-blue-100 text-blue-700';
  if (d === '3 Months') return 'bg-purple-100 text-purple-700';
  return 'bg-emerald-100 text-emerald-700';
};

const MembershipManagement = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const openAdd = () => { setForm(emptyForm); setEditId(null); setShowModal(true); };
  const openEdit = (p) => { setForm({ name: p?.name, duration: p?.duration, price: p?.price, description: p?.description }); setEditId(p?.id); setShowModal(true); };
  const handleDelete = (id) => setPlans(plans?.filter(p => p?.id !== id));

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editId) {
      setPlans(plans?.map(p => p?.id === editId ? { ...p, ...form, price: Number(form?.price) } : p));
    } else {
      setPlans([...plans, { id: Date.now(), ...form, price: Number(form?.price) }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Membership Management</h2>
          <p className="text-slate-500 mt-1">{plans?.length} active membership plans</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Plan
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {plans?.map(plan => (
          <div key={plan?.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{plan?.name}</h3>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full mt-1 inline-block ${durationColor(plan?.duration)}`}>{plan?.duration}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${plan?.price}</p>
                <p className="text-xs text-slate-400">per plan</p>
              </div>
            </div>
            <p className="text-slate-500 text-sm mb-4">{plan?.description}</p>
            <div className="flex gap-2 pt-3 border-t border-slate-100">
              <button onClick={() => openEdit(plan)} className="flex-1 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">Edit</button>
              <button onClick={() => handleDelete(plan?.id)} className="flex-1 py-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800">{editId ? 'Edit Plan' : 'Add Membership Plan'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Plan Name</label>
                <input required type="text" value={form?.name} onChange={e => setForm({ ...form, name: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Duration</label>
                <select value={form?.duration} onChange={e => setForm({ ...form, duration: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800">
                  {durations?.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                <input required type="number" min="0" value={form?.price} onChange={e => setForm({ ...form, price: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea rows={3} value={form?.description} onChange={e => setForm({ ...form, description: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">{editId ? 'Save Changes' : 'Add Plan'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipManagement;
