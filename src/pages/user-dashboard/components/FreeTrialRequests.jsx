import React, { useState, useEffect } from "react";

const FreeTrialRequests = () => {
const [trials,setTrials] = useState([])

useEffect(()=>{

const fetchTrials = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/user-free-trials/${email}`
)

const data = await res.json()

setTrials(data)

}

fetchTrials()

},[])

return (

<div className="bg-card p-6 rounded-xl border border-border shadow">

<h2 className="text-xl font-bold mb-4 text-foreground">
Free Trial Requests
</h2>

<table className="w-full text-left">

<thead className="border-b border-border text-muted-foreground">

<tr>
<th className="py-2">Gym</th>
<th className="py-2">Date</th>
<th className="py-2">Time</th>
<th className="py-2">Status</th>
</tr>

</thead>

<tbody className="text-foreground">

{trials.map((trial,i)=>(

<tr key={i} className="border-b border-border">

<td className="py-2">{trial.gym_name}</td>
<td className="py-2">{trial.date}</td>
<td className="py-2">{trial.time}</td>
<td className={`py-2 font-semibold ${
trial.status === "Approved" ? "text-green-500" :
trial.status === "Rejected" ? "text-red-500" :
"text-yellow-500"
}`}>

{trial.status}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default FreeTrialRequests;