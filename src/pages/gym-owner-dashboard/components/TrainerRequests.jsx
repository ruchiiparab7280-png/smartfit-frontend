import React, { useEffect, useState } from "react";

const TrainerRequests = () => {

const [requests,setRequests] = useState([])
const [filter,setFilter] = useState("all")
const [search,setSearch] = useState("")
const [sort,setSort] = useState("latest")

const fetchRequests = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/trainer-requests/${email}`
)

const data = await res.json()

const formatted = data.map((item)=>({
id: item.id,

trainer: item.trainer_name,
user: item.full_name,
phone: item.phone,

date: item.date,
time: item.time,

status: item.status
}))

setRequests(formatted)

}

useEffect(()=>{

fetchRequests()

// ⚡ live update every 5 sec
const interval = setInterval(()=>{
fetchRequests()
},5000)

return ()=>clearInterval(interval)

},[])

const approveTrainer = async (id)=>{

await fetch(
`${import.meta.env.VITE_API_URL}/approve-trainer/${id}`,
{
method:"PUT"
}
)

alert("Trainer approved")
fetchRequests()

}

const rejectTrainer = async (id)=>{

await fetch(
`${import.meta.env.VITE_API_URL}/reject-trainer/${id}`,
{
method:"PUT"
}
)

alert("Trainer rejected")
fetchRequests()

}

const total = requests.length
const pending = requests.filter(r=>r.status==="pending").length
const approved = requests.filter(r=>r.status==="approved").length
const rejected = requests.filter(r=>r.status==="rejected").length

// 🔎 filter + search
let filteredRequests = requests.filter((r)=>{

if(filter!=="all" && r.status!==filter) return false

if(search && !r.user.toLowerCase().includes(search.toLowerCase()))
return false

return true

})

// 📅 sorting
filteredRequests.sort((a,b)=>{

if(sort==="latest") return new Date(b.date) - new Date(a.date)
if(sort==="oldest") return new Date(a.date) - new Date(b.date)

return 0

})

const statusColor = (status)=>{
if(status==="approved") return "bg-green-100 text-green-700"
if(status==="rejected") return "bg-red-100 text-red-600"
return "bg-amber-100 text-amber-700"
}

return (

<div>

<h2 className="text-2xl font-bold mb-6">Trainer Requests</h2>

{/* 🔔 Notification */}
{pending > 0 && (
<div className="mb-4 bg-amber-100 text-amber-700 p-3 rounded-lg">
🔔 You have {pending} pending trainer requests
</div>
)}

{/* Search + Sort */}
<div className="flex gap-4 mb-6">

<input
type="text"
placeholder="Search user..."
value={search}
onChange={(e)=>setSearch(e.target.value)}
className="border p-2 rounded-lg"
/>

<select
value={sort}
onChange={(e)=>setSort(e.target.value)}
className="border p-2 rounded-lg"
>
<option value="latest">Latest</option>
<option value="oldest">Oldest</option>
</select>

</div>

<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

<div
onClick={()=>setFilter("all")}
className="cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 p-4"
>
Total Requests: {total}
</div>

<div
onClick={()=>setFilter("pending")}
className="cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 p-4"
>
Pending: {pending}
</div>

<div
onClick={()=>setFilter("approved")}
className="cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 p-4"
>
Approved: {approved}
</div>

<div
onClick={()=>setFilter("rejected")}
className="cursor-pointer bg-white rounded-xl shadow-sm border border-slate-200 p-4"
>
Rejected: {rejected}
</div>

</div>

<div className="space-y-4">

{filteredRequests.map((req)=>(
<div key={req.id} className="bg-[#111827] text-white rounded-xl shadow-lg border border-slate-800 p-5 flex justify-between items-center">

<div>

<h3 className="font-bold text-slate-800">
Trainer: {req.trainer}
</h3>

<p className="text-sm text-slate-600">
User: {req.user}
</p>

<p className="text-sm text-slate-600">
Phone: {req.phone}
</p>

<p className="text-sm text-slate-500">
Date: {req.date}
</p>

<p className="text-sm text-slate-500">
Time: {req.time}
</p>

<span className={`text-xs font-semibold px-2 py-1 rounded ${statusColor(req.status)}`}>
{req.status}
</span>

</div>

{req.status==="pending" && (

<div className="flex gap-2">

<button
onClick={()=>approveTrainer(req.id)}
className="px-4 py-2 bg-green-600 text-white rounded-lg"
>
Approve
</button>

<button
onClick={()=>rejectTrainer(req.id)}
className="px-4 py-2 bg-red-500 text-white rounded-lg"
>
Reject
</button>

</div>

)}

</div>
))}

</div>

</div>

)

}

export default TrainerRequests;