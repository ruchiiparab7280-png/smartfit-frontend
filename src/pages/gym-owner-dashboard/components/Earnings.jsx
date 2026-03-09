import React from 'react';

const earningsData = [
  { month: 'October 2025', membership: 4200, trainer: 1850, supplement: 620, total: 6670 },
  { month: 'November 2025', membership: 4800, trainer: 2100, supplement: 740, total: 7640 },
  { month: 'December 2025', membership: 5200, trainer: 2400, supplement: 890, total: 8490 },
  { month: 'January 2026', membership: 6100, trainer: 2750, supplement: 1020, total: 9870 },
  { month: 'February 2026', membership: 5800, trainer: 2600, supplement: 950, total: 9350 },
  { month: 'March 2026', membership: 6400, trainer: 2900, supplement: 1100, total: 10400 },
];

const currentMonth = earningsData?.[earningsData?.length - 1];

const Earnings = () => {
  const summaryCards = [
    { label: 'Total Monthly Earnings', value: `$${currentMonth?.total?.toLocaleString()}`, icon: '💰', color: 'from-blue-600 to-blue-700', change: '+8.6%' },
    { label: 'Earnings from Trainers', value: `$${currentMonth?.trainer?.toLocaleString()}`, icon: '🏋️', color: 'from-purple-600 to-purple-700', change: '+11.5%' },
    { label: 'Earnings from Memberships', value: `$${currentMonth?.membership?.toLocaleString()}`, icon: '🎫', color: 'from-emerald-600 to-emerald-700', change: '+10.3%' },
    { label: 'Earnings from Supplements', value: `$${currentMonth?.supplement?.toLocaleString()}`, icon: '💊', color: 'from-amber-500 to-amber-600', change: '+15.8%' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Earnings Overview</h2>
        <p className="text-slate-500 mt-1">Track your gym's revenue performance</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {summaryCards?.map(card => (
          <div key={card?.label} className={`bg-gradient-to-br ${card?.color} rounded-xl p-5 text-white`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{card?.icon}</span>
              <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">{card?.change}</span>
            </div>
            <p className="text-2xl font-bold">{card?.value}</p>
            <p className="text-sm text-white/80 mt-1">{card?.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h3 className="font-bold text-slate-800">Monthly Revenue Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Month</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Membership</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Trainer</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Supplement</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {earningsData?.map((row, i) => (
                <tr key={row?.month} className={`hover:bg-slate-50 transition-colors ${i === earningsData?.length - 1 ? 'bg-blue-50' : ''}`}>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-800">{row?.month}</span>
                    {i === earningsData?.length - 1 && <span className="ml-2 text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded-full">Current</span>}
                  </td>
                  <td className="px-6 py-4 text-right text-slate-600">${row?.membership?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-slate-600">${row?.trainer?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right text-slate-600">${row?.supplement?.toLocaleString()}</td>
                  <td className="px-6 py-4 text-right font-bold text-slate-800">${row?.total?.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Earnings;
