import React, { useState } from 'react';

const GymDetails = () => {
  const [formData, setFormData] = useState({
    gymName: 'SmartFit Multi Gym',
    address: '123 Fitness Avenue, Downtown, NY 10001',
    contactNumber: '+1 (555) 234-5678',
    email: 'owner@multigym.com',
    openingTime: '06:00',
    closingTime: '22:00',
    description: 'A premium fitness facility offering state-of-the-art equipment, expert trainers, and a motivating environment for all fitness levels.',
  });
  const [images, setImages] = useState([]);
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e?.target?.name]: e?.target?.value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e?.target?.files);
    const previews = files?.map(f => URL.createObjectURL(f));
    setImages(prev => [...prev, ...previews]);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Edit Gym Details</h2>
        <p className="text-slate-500 mt-1">Update your gym's information and settings</p>
      </div>
      <form onSubmit={handleSave} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Gym Name</label>
            <input
              type="text"
              name="gymName"
              value={formData?.gymName}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              value={formData?.contactNumber}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Gym Address</label>
            <input
              type="text"
              name="address"
              value={formData?.address}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Opening Time</label>
              <input
                type="time"
                name="openingTime"
                value={formData?.openingTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Closing Time</label>
              <input
                type="time"
                name="closingTime"
                value={formData?.closingTime}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800"
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Gym Description</label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-800 resize-none"
            />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">Gym Images</label>
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-blue-400 transition-colors">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="gym-images"
              />
              <label htmlFor="gym-images" className="cursor-pointer">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-500">Click to upload gym images</p>
                  <p className="text-xs text-slate-400">PNG, JPG up to 10MB each</p>
                </div>
              </label>
            </div>
            {images?.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {images?.map((src, i) => (
                  <img key={i} src={src} alt={`Gym image ${i + 1}`} className="w-24 h-24 object-cover rounded-lg border border-slate-200" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
          <button
            type="submit"
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-green-600 text-sm font-medium flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Changes saved successfully!
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default GymDetails;
