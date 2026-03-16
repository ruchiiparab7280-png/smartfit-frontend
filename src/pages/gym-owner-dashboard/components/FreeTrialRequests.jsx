import React, { useEffect, useState } from "react";

const FreeTrialRequests = () => {

const [trials,setTrials] = useState([])

useEffect(()=>{

const fetchTrials = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/owner-free-trials/${email}`
)

const data = await res.json()

setTrials(data)

}

fetchTrials()

},[])

const approveTrial = async (id)=>{

await fetch(
`${import.meta.env.VITE_API_URL}/approve-trial/${id}`,
{method:"PUT"}
)

setTrials(trials.map(t =>
t.id === id ? {...t,status:"approved"} : t
))

}

const rejectTrial = async (id)=>{

await fetch(
`${import.meta.env.VITE_API_URL}/reject-trial/${id}`,
{method:"PUT"}
)

setTrials(trials.map(t =>
t.id === id ? {...t,status:"rejected"} : t
))

}

return(

<div className="bg-[#111827] p-6 rounded-xl border border-slate-800 shadow-lg shadow-blue-900/40">

<h2 className="text-xl font-bold mb-4 text-white">
Free Trial Requests
</h2>

<table className="w-full text-left text-slate-300">

<thead className="border-b border-slate-800">

<tr>
<th>User</th>
<th>Phone</th>
<th>Date</th>
<th>Time</th>
<th>Status</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{trials.map((trial,i)=>(

<tr key={i} className="border-b border-slate-800">

<td className="py-2">{trial.user_name}</td>

<td>{trial.user_phone}</td>

<td>{trial.date}</td>

<td>{trial.time}</td>

<td className={`font-semibold ${
trial.status === "approved" ? "text-green-500" :
trial.status === "rejected" ? "text-red-500" :
"text-yellow-500"
}`}>
{trial.status}
</td>

<td className="space-x-2">

{trial.status === "pending" && (

<>
<button
onClick={()=>approveTrial(trial.id)}
className="bg-green-500 text-white px-3 py-1 rounded"
>
Approve
</button>

<button
onClick={()=>rejectTrial(trial.id)}
className="bg-red-500 text-white px-3 py-1 rounded"
>
Reject
</button>
</>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default FreeTrialRequests;