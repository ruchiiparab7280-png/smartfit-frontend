import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";

const Earnings = () => {

  const [statsData, setStatsData] = useState({
    total: 0,
    membership: 0,
    trainer: 0,
    supplement: 0
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {

    const fetchEarnings = async () => {

      try {

        const email = localStorage.getItem("userEmail");

        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/owner-earnings/${email}`
        );

        const data = await res.json();

        setStatsData({
          total: data.total || 0,
          membership: data.membershipTotal || 0,
          trainer: data.trainerTotal || 0,
          supplement: data.supplementTotal || 0
        });

        setChartData(data.monthlyData || []);

      } catch (err) {
        console.log("Earnings fetch error:", err);
      }

    };

    fetchEarnings();

  }, []);

  /* -------------------- Revenue Cards -------------------- */

  const stats = [
    {
      title: "Total Earnings",
      value: `₹${statsData.total}`,
      color: "from-blue-500 to-blue-600",
      icon: "💰"
    },
    {
      title: "Trainer Earnings",
      value: `₹${statsData.trainer}`,
      color: "from-purple-500 to-purple-600",
      icon: "🏋️"
    },
    {
      title: "Membership Earnings",
      value: `₹${statsData.membership}`,
      color: "from-emerald-500 to-emerald-600",
      icon: "🎟️"
    },
    {
      title: "Supplement Earnings",
      value: `₹${statsData.supplement}`,
      color: "from-orange-500 to-orange-600",
      icon: "💊"
    }
  ];

  /* -------------------- Table Data -------------------- */

  const tableData = chartData.map(item => ({
    ...item,
    total: item.membership + item.trainer + item.supplement
  }));

  return (

    <div className="space-y-8">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-white">
          Earnings Overview
        </h2>
        <p className="text-slate-400">
          Track your gym revenue performance
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-gradient-to-r ${stat.color} text-white rounded-xl p-5`}>
            <div className="text-2xl">{stat.icon}</div>
            <h3 className="text-2xl font-bold mt-4">{stat.value}</h3>
            <p className="text-sm opacity-90">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#111827] p-6 rounded-xl">
        <h3 className="text-lg font-semibold mb-4 text-white">
          Monthly Revenue Chart
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="membership" stroke="#10b981" />
            <Line type="monotone" dataKey="trainer" stroke="#6366f1" />
            <Line type="monotone" dataKey="supplement" stroke="#f59e0b" />

          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="bg-[#111827] rounded-xl">

        <div className="px-6 py-4 border-b border-slate-700">
          <h3 className="text-lg font-semibold text-white">
            Monthly Revenue Breakdown
          </h3>
        </div>

        <table className="w-full text-sm text-white">

          <thead className="bg-[#1f2937]">
            <tr>
              <th className="px-6 py-3 text-left">Month</th>
              <th className="px-6 py-3 text-right">Membership</th>
              <th className="px-6 py-3 text-right">Trainer</th>
              <th className="px-6 py-3 text-right">Supplement</th>
              <th className="px-6 py-3 text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {tableData.map((row, i) => (
              <tr key={i} className="border-b border-slate-800">
                <td className="px-6 py-3">{row.month}</td>
                <td className="px-6 py-3 text-right">₹{row.membership}</td>
                <td className="px-6 py-3 text-right">₹{row.trainer}</td>
                <td className="px-6 py-3 text-right">₹{row.supplement}</td>
                <td className="px-6 py-3 text-right font-bold">₹{row.total}</td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Earnings;