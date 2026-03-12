import React, { useState, useEffect } from 'react';



const emptyForm = { name: '', duration: '1 Month', price: '', description: '' };

const durations = ['1 Month', '3 Months', '6 Months', '1 year'];

const membersData = [
{
id:1,
name:"Rahul Sharma",
plan:"Basic Monthly",
startDate:"1 Mar 2026",
endDate:"1 Apr 2026",
amount:49
},
{
id:2,
name:"Priya Patel",
plan:"Standard Quarterly",
startDate:"5 Mar 2026",
endDate:"5 Jun 2026",
amount:129
},
{
id:3,
name:"Aman Verma",
plan:"Premium Semi-Annual",
startDate:"10 Mar 2026",
endDate:"10 Sep 2026",
amount:229
}
];

const durationColor = (d) => {
if (d === '1 Month') return 'bg-blue-100 text-blue-700';
if (d === '3 Months') return 'bg-purple-100 text-purple-700';
return 'bg-emerald-100 text-emerald-700';
};

const MembershipManagement = () => {

const ownerEmail = localStorage.getItem("userEmail");    
const [plans, setPlans] = useState([]);
useEffect(() => {

const fetchMemberships = async () => {

try {

const res = await fetch(
`${import.meta.env.VITE_API_URL}/memberships/${ownerEmail}`
);

const data = await res.json();

setPlans(data);

} catch (err) {

console.log("Membership fetch error", err);

}

};

fetchMemberships();

}, [ownerEmail]);
const [memberships] = useState(membersData);
const [showModal, setShowModal] = useState(false);
const [editId, setEditId] = useState(null);
const [form, setForm] = useState(emptyForm);



const openAdd = () => {
setForm(emptyForm);
setEditId(null);
setShowModal(true);
};

const openEdit = (p) => {
setForm({
name: p?.name,
duration: p?.duration,
price: p?.price,
description: p?.description
});
setEditId(p?.id);
setShowModal(true);
};

const handleDelete = async (id) => {

try {

await fetch(
`${import.meta.env.VITE_API_URL}/membership/${id}`,
{
method: "DELETE"
}
);

setPlans(plans.filter(p => p.id !== id));

} catch (err) {

console.log("Delete error", err);

}

};

const handleSubmit = async (e) => {

e.preventDefault();

try {

if (editId) {

await fetch(
`${import.meta.env.VITE_API_URL}/update-membership/${editId}`,
{
method: "PUT",
headers: { "Content-Type": "application/json" },
body: JSON.stringify(form)
}
);

} else {

await fetch(
`${import.meta.env.VITE_API_URL}/add-membership`,
{
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
gym_email: ownerEmail,
...form
})
}
);

}

window.location.reload();

} catch (err) {

console.log("Save error", err);

}

};

return (

<div>

{/* Header */}

<div className="flex items-center justify-between mb-6">
<div>
<h2 className="text-2xl font-bold text-slate-800">
Membership Management
</h2>
<p className="text-slate-500 mt-1">
{plans?.length} active membership plans
</p>
</div>

<button
onClick={openAdd}
className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
>
Add Plan
</button>
</div>

{/* Plans */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-5">

{plans?.map(plan => (

<div
key={plan?.id}
className="bg-white rounded-xl shadow-sm border border-slate-200 p-6"
>

<div className="flex items-start justify-between mb-3">

<div>
<h3 className="font-bold text-slate-800 text-lg">
{plan?.name}
</h3>

<span className={`text-xs font-semibold px-2 py-1 rounded-full ${durationColor(plan?.duration)}`}>
{plan?.duration}
</span>

</div>

<div className="text-right">
<p className="text-2xl font-bold text-blue-600">
${plan?.price}
</p>
<p className="text-xs text-slate-400">per plan</p>
</div>

</div>

<p className="text-slate-500 text-sm mb-4">
{plan?.description}
</p>

<div className="flex gap-2 pt-3 border-t">

<button
onClick={() => openEdit(plan)}
className="flex-1 py-1.5 text-sm text-blue-600 border border-blue-200 rounded-lg"
>
Edit
</button>

<button
onClick={() => handleDelete(plan?.id)}
className="flex-1 py-1.5 text-sm text-red-500 border border-red-200 rounded-lg"
>
Delete
</button>

</div>

</div>

))}

</div>

{/* Modal */}

{showModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

<div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

<h3 className="text-lg font-bold mb-4">
{editId ? 'Edit Plan' : 'Add Membership Plan'}
</h3>

<form onSubmit={handleSubmit} className="space-y-4">

<input
type="text"
placeholder="Plan Name"
value={form?.name}
onChange={(e) =>
setForm({ ...form, name: e.target.value })
}
className="w-full border px-4 py-2 rounded  text-slate-900"
/>

<select
value={form?.duration}
onChange={(e) =>
setForm({ ...form, duration: e.target.value })
}
className="w-full border px-4 py-2 rounded text-slate-900"
>

{durations?.map(d => (
<option key={d} value={d}>
{d}
</option>
))}

</select>

<input
type="number"
placeholder="Price"
value={form?.price}
onChange={(e) =>
setForm({ ...form, price: e.target.value })
}
className="w-full border px-4 py-2 rounded  text-slate-900"
/>

<textarea
placeholder="Description"
value={form?.description}
onChange={(e) =>
setForm({ ...form, description: e.target.value })
}
className="w-full border px-4 py-2 rounded  text-slate-900"
/>

<div className="flex gap-3">

<button
type="button"
onClick={() => setShowModal(false)}
className="flex-1 border py-2 rounded"
>
Cancel
</button>

<button
type="submit"
className="flex-1 bg-blue-600 text-white py-2 rounded"
>
Save
</button>

</div>

</form>

</div>

</div>

)}

{/* Active Members */}

<div className="mt-10">

<h3 className="text-xl font-bold text-slate-800 mb-4">
Active Members
</h3>

<div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

<table className="w-full text-sm">

<thead className="bg-slate-100 text-slate-600">

<tr>
<th className="px-4 py-3 text-left">Member</th>
<th className="px-4 py-3 text-left">Plan</th>
<th className="px-4 py-3 text-left">Start</th>
<th className="px-4 py-3 text-left">End</th>
<th className="px-4 py-3 text-left">Payment</th>
</tr>

</thead>

<tbody>

{memberships?.map(member => (

<tr key={member?.id} className="border-t">

<td className="px-4 py-3 font-medium">
{member?.name}
</td>

<td className="px-4 py-3">
{member?.plan}
</td>

<td className="px-4 py-3">
{member?.startDate}
</td>

<td className="px-4 py-3">
{member?.endDate}
</td>

<td className="px-4 py-3 font-semibold text-blue-600">
${member?.amount}
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

export default MembershipManagement;