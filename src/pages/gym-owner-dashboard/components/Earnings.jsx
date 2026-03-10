import React from "react";
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

/* -------------------- Revenue Cards -------------------- */

const stats = [
{
title:"Total Monthly Earnings",
value:"$10,400",
growth:"+8.6%",
color:"from-blue-500 to-blue-600",
icon:"💰"
},
{
title:"Trainer Earnings",
value:"$2,900",
growth:"+11.5%",
color:"from-purple-500 to-purple-600",
icon:"🏋️"
},
{
title:"Membership Earnings",
value:"$6,400",
growth:"+10.3%",
color:"from-emerald-500 to-emerald-600",
icon:"🎟️"
},
{
title:"Supplement Earnings",
value:"$1,100",
growth:"+15.8%",
color:"from-orange-500 to-orange-600",
icon:"💊"
}
];

/* -------------------- Chart Data -------------------- */

const revenueData = [
{month:"Oct",membership:4200,trainer:1850,supplement:620},
{month:"Nov",membership:4800,trainer:2100,supplement:740},
{month:"Dec",membership:5200,trainer:2400,supplement:890},
{month:"Jan",membership:6100,trainer:2750,supplement:1020},
{month:"Feb",membership:5800,trainer:2600,supplement:950}
];

/* -------------------- Transactions -------------------- */

const transactions = [
{
id:"TXN001",
member:"Rahul Sharma",
type:"Membership",
amount:"$120",
status:"Success",
date:"12 Mar 2026"
},
{
id:"TXN002",
member:"Amit Patel",
type:"Trainer Session",
amount:"$80",
status:"Success",
date:"11 Mar 2026"
},
{
id:"TXN003",
member:"Riya Verma",
type:"Supplement",
amount:"$45",
status:"Pending",
date:"10 Mar 2026"
},
{
id:"TXN004",
member:"John Doe",
type:"Membership",
amount:"$150",
status:"Success",
date:"9 Mar 2026"
}
];

const Earnings = () => {

const tableData = revenueData.map(item => ({
...item,
total: item.membership + item.trainer + item.supplement
}));

return (

<div className="space-y-8">

{/* Header */}

<div>
<h2 className="text-2xl font-bold text-slate-800">
Earnings Overview
</h2>

<p className="text-slate-500">
Track your gym revenue performance
</p>
</div>

{/* Revenue Cards */}

<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

{stats.map((stat,i)=>(
<div
key={i}
className={`bg-gradient-to-r ${stat.color} text-white rounded-xl p-5 shadow-lg`}
>

<div className="flex justify-between items-center">
<span className="text-2xl">{stat.icon}</span>

<span className="text-xs bg-white/20 px-2 py-1 rounded">
{stat.growth}
</span>
</div>

<h3 className="text-2xl font-bold mt-4">
{stat.value}
</h3>

<p className="text-sm opacity-90 mt-1">
{stat.title}
</p>

</div>
))}

</div>

{/* Revenue Chart */}

<div className="bg-white p-6 rounded-xl shadow-sm border">

<h3 className="text-lg font-semibold mb-4">
Monthly Revenue Chart
</h3>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={revenueData}>

<CartesianGrid strokeDasharray="3 3" />

<XAxis dataKey="month" />

<YAxis />

<Tooltip />

<Legend />

<Line
type="monotone"
dataKey="membership"
stroke="#10b981"
strokeWidth={3}
/>

<Line
type="monotone"
dataKey="trainer"
stroke="#6366f1"
strokeWidth={3}
/>

<Line
type="monotone"
dataKey="supplement"
stroke="#f59e0b"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>

{/* Payment Transactions */}

<div className="bg-white rounded-xl shadow-sm border">

<div className="flex justify-between items-center px-6 py-4 border-b">

<h3 className="text-lg font-semibold">
Recent Payment Transactions
</h3>

<button className="text-sm text-blue-600 hover:underline">
View All
</button>

</div>

<div className="overflow-x-auto">

<table className="w-full text-sm">

<thead className="bg-slate-50 text-slate-500 uppercase text-xs">

<tr>
<th className="px-6 py-3 text-left">Transaction ID</th>
<th className="px-6 py-3 text-left">Member</th>
<th className="px-6 py-3 text-left">Type</th>
<th className="px-6 py-3 text-right">Amount</th>
<th className="px-6 py-3 text-center">Status</th>
<th className="px-6 py-3 text-right">Date</th>
</tr>

</thead>

<tbody className="divide-y">

{transactions.map(txn=>(
<tr key={txn.id} className="hover:bg-slate-50">

<td className="px-6 py-4 font-medium">
{txn.id}
</td>

<td className="px-6 py-4">
{txn.member}
</td>

<td className="px-6 py-4">
{txn.type}
</td>

<td className="px-6 py-4 text-right font-semibold">
{txn.amount}
</td>

<td className="px-6 py-4 text-center">

<span className={`px-2 py-1 text-xs rounded-full ${
txn.status==="Success"
?"bg-green-100 text-green-700"
:"bg-yellow-100 text-yellow-700"
}`}>
{txn.status}
</span>

</td>

<td className="px-6 py-4 text-right text-slate-500">
{txn.date}
</td>

</tr>
))}

</tbody>

</table>

</div>

</div>

{/* Monthly Revenue Table */}

<div className="bg-white rounded-xl shadow-sm border">

<div className="px-6 py-4 border-b">

<h3 className="text-lg font-semibold">
Monthly Revenue Breakdown
</h3>

</div>

<div className="overflow-x-auto">

<table className="w-full text-sm">

<thead className="bg-slate-50 text-slate-500 uppercase text-xs">

<tr>
<th className="px-6 py-3 text-left">Month</th>
<th className="px-6 py-3 text-right">Membership</th>
<th className="px-6 py-3 text-right">Trainer</th>
<th className="px-6 py-3 text-right">Supplement</th>
<th className="px-6 py-3 text-right">Total</th>
</tr>

</thead>

<tbody className="divide-y">

{tableData.map((row,i)=>(
<tr key={i} className="hover:bg-slate-50">

<td className="px-6 py-4 font-medium">
{row.month}
</td>

<td className="px-6 py-4 text-right">
${row.membership}
</td>

<td className="px-6 py-4 text-right">
${row.trainer}
</td>

<td className="px-6 py-4 text-right">
${row.supplement}
</td>

<td className="px-6 py-4 text-right font-bold">
${row.total}
</td>

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