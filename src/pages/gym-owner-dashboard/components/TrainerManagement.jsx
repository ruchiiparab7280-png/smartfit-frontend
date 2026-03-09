import React, { useState } from 'react';

const initialTrainers = [
  { id: 1, name: 'Marcus Johnson', photo: 'https://randomuser.me/api/portraits/men/32.jpg', specialization: 'Strength & Conditioning', pricePerSession: 75 },
  { id: 2, name: 'Priya Sharma', photo: 'https://randomuser.me/api/portraits/women/44.jpg', specialization: 'Yoga & Flexibility', pricePerSession: 60 },
  { id: 3, name: 'Carlos Rivera', photo: 'https://randomuser.me/api/portraits/men/55.jpg', specialization: 'HIIT & Cardio', pricePerSession: 65 },
  { id: 4, name: 'Aisha Patel', photo: 'https://randomuser.me/api/portraits/women/68.jpg', specialization: 'Nutrition & Weight Loss', pricePerSession: 80 },
];

const emptyForm = { name: '', photo: '', specialization: '', pricePerSession: '' };

const TrainerManagement = () => {
  const [trainers, setTrainers] = useState(initialTrainers);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [photoPreview, setPhotoPreview] = useState('');

  const openAdd = () => {
    setForm(emptyForm);
    setPhotoPreview('');
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (trainer) => {
    setForm({ name: trainer?.name, photo: trainer?.photo, specialization: trainer?.specialization, pricePerSession: trainer?.pricePerSession });
    setPhotoPreview(trainer?.photo);
    setEditId(trainer?.id);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    setTrainers(trainers?.filter(t => t?.id !== id));
  };

  const handlePhotoChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
      setForm(prev => ({ ...prev, photo: url }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (editId) {
      setTrainers(trainers?.map(t => t?.id === editId ? { ...t, ...form, pricePerSession: Number(form?.pricePerSession) } : t));
    } else {
      setTrainers([...trainers, { id: Date.now(), ...form, pricePerSession: Number(form?.pricePerSession), photo: photoPreview || 'https://randomuser.me/api/portraits/lego/1.jpg' }]);
    }
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Trainer Management</h2>
          <p className="text-slate-500 mt-1">{trainers?.length} trainers in your gym</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Trainer
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {trainers?.map(trainer => (
          <div key={trainer?.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col items-center text-center">
            <img
              src={trainer?.photo}
              alt={`${trainer?.name} - ${trainer?.specialization} trainer`}
              className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-3"
            />
            <h3 className="font-bold text-slate-800 text-base">{trainer?.name}</h3>
            <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full mt-1">{trainer?.specialization}</span>
            <p className="text-slate-600 text-sm mt-2 font-semibold">${trainer?.pricePerSession}<span className="font-normal text-slate-400">/session</span></p>
            <div className="flex gap-2 mt-4 w-full">
              <button
                onClick={() => openEdit(trainer)}
                className="flex-1 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(trainer?.id)}
                className="flex-1 py-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800">{editId ? 'Edit Trainer' : 'Add New Trainer'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col items-center gap-3">
                <div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Trainer photo preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
                <label className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Trainer Name</label>
                <input
                  required
                  type="text"
                  value={form?.name}
                  onChange={e => setForm({ ...form, name: e?.target?.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Specialization</label>
                <input
                  required
                  type="text"
                  value={form?.specialization}
                  onChange={e => setForm({ ...form, specialization: e?.target?.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Price per Session ($)</label>
                <input
                  required
                  type="number"
                  min="0"
                  value={form?.pricePerSession}
                  onChange={e => setForm({ ...form, pricePerSession: e?.target?.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
                  {editId ? 'Save Changes' : 'Add Trainer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerManagement;
 