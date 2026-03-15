import React, { useEffect, useState } from "react";

const TrainerRequests = () => {



const [bookings,setBookings] = useState([])

useEffect(()=>{

const fetchBookings = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/user-trainer-bookings/${email}`
)

const data = await res.json()

setBookings(data)

}

fetchBookings()

},[])

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

{bookings.map((t,i)=>(


<tr key={t.id} className="border-b border-border">

<td className="py-2">{t.trainer_name}</td>

<td className="py-2">{t.gym_name}</td>

<td className={`py-2 font-semibold ${
t.status === "approved" ? "text-green-500" :
t.status === "rejected" ? "text-red-500" :
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