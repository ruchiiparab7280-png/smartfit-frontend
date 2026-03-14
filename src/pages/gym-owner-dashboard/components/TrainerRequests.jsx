import React, { useEffect, useState } from "react";



const TrainerRequests = () => {
  
  const [requests,setRequests] = useState([])

  useEffect(()=>{

const fetchRequests = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/trainer-requests/${email}`
)

const data = await res.json()

const formatted = data.map((item)=>({
id: item.id,
photo: "https://randomuser.me/api/portraits/men/32.jpg",
name: item.trainer_name,
experience: item.date,
certification: item.time,
status: item.status
}))

setRequests(formatted)
}

fetchRequests()

},[])

const approveTrainer = async (id)=>{

await fetch(
`${import.meta.env.VITE_API_URL}/approve-trainer/${id}`,
{
method:"PUT"
}
)

alert("Trainer approved")

window.location.reload()

}

const rejectTrainer = async (id)=>{

await fetch(
`${import.meta.env.VITE_API_URL}/reject-trainer/${id}`,
{
method:"PUT"
}
)

alert("Trainer rejected")

window.location.reload()

}

  

  const total = requests?.length;
  const pending = requests?.filter((r) => r?.status === 'pending')?.length;
  const approved = requests?.filter((r) => r?.status === 'approved')?.length;
  const rejected = requests?.filter((r) => r?.status === 'rejected')?.length;

  const statusColor = (status) => {
    if (status === 'approved') return 'bg-green-100 text-green-700';
    if (status === 'rejected') return 'bg-red-100 text-red-600';
    return 'bg-amber-100 text-amber-700';
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Trainer Requests</h2>
        <p className="text-slate-500 mt-1">Review and manage trainer applications</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
        { label: 'Total Requests', value: total, color: 'bg-blue-600', icon: '📋' },
        { label: 'Pending Approval', value: pending, color: 'bg-amber-500', icon: '⏳' },
        { label: 'Approved', value: approved, color: 'bg-green-600', icon: '✅' },
        { label: 'Rejected', value: rejected, color: 'bg-red-500', icon: '❌' }]?.
        map((card) =>
        <div key={card?.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{card?.icon}</span>
              <span className={`text-2xl font-bold text-white ${card?.color} w-10 h-10 rounded-lg flex items-center justify-center text-lg`}>{card?.value}</span>
            </div>
            <p className="text-sm font-medium text-slate-600">{card?.label}</p>
          </div>
        )}
      </div>
      <div className="space-y-4">
       {requests.map((req) =>
        <div key={req?.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <img
            src={req?.photo}
            alt={`${req?.name} trainer application photo`}
            className="w-14 h-14 rounded-full object-cover border-2 border-slate-200 flex-shrink-0" />
          
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h3 className="font-bold text-slate-800">{req?.name}</h3>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full capitalize ${statusColor(req?.status)}`}>{req?.status}</span>
                <p className={`text-sm font-semibold ${
                     req.payment_status === "paid" ? "text-green-600" : "text-red-500"
                              }`}>
                        Payment: {req.payment_status === "paid" ? "Paid" : "Unpaid"}
                                           </p>
              </div>
              <p className="text-sm text-slate-500"><span className="font-medium text-slate-600">Experience:</span> {req?.experience}</p>
              <p className="text-sm text-slate-500 mt-0.5"><span className="font-medium text-slate-600">Certification:</span> {req?.certification}</p>
            </div>
            {req?.status === 'pending' &&
          <div className="flex gap-2 flex-shrink-0">
                <button
             onClick={() => approveTrainer(req?.id)}
              className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
              
                  Approve
                </button>
                <button
              onClick={() => rejectTrainer(req?.id)}
              className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg hover:bg-red-600 transition-colors">
              
                  Reject
                </button>
              </div>
          }
          </div>
        )}
      </div>
    </div>);

};

export default TrainerRequests;