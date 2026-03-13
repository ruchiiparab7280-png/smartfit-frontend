import React from "react";

const TrainerRequests = () => {

const trainers = [
{ trainer:"Rahul", gym:"FitZone", status:"Pending" },
{ trainer:"Aman", gym:"Iron Gym", status:"Accepted" }
]

return (

<div className="bg-card p-6 rounded-xl border border-border shadow">

<h2 className="text-xl font-bold mb-4 text-foreground">
Trainer Requests
</h2>

<table className="w-full text-left">

<thead className="border-b border-border text-muted-foreground">

<tr>
<th className="py-2">Trainer</th>
<th className="py-2">Gym</th>
<th className="py-2">Status</th>
</tr>

</thead>

<tbody className="text-foreground">

{trainers.map((t,i)=>(

<tr key={i} className="border-b border-border">

<td className="py-2">{t.trainer}</td>

<td className="py-2">{t.gym}</td>

<td className={`py-2 font-semibold ${
t.status === "Accepted" ? "text-green-500" :
"text-yellow-500"
}`}>

{t.status}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default TrainerRequests;