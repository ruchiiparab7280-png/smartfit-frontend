import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MainNavigation from "../../components/MainNavigation";

const OwnerDashboard = () => {

const navigate = useNavigate();

const [trainers,setTrainers] = useState([]);
const [proteins,setProteins] = useState([]);
const [trials,setTrials] = useState([]);
const [bookings,setBookings] = useState([]);

useEffect(()=>{

const paymentStatus = localStorage.getItem("paymentStatus");

if(paymentStatus !== "paid"){
navigate("/owner-payment");
return;
}

setTrainers(JSON.parse(localStorage.getItem("gymTrainers")) || []);
setProteins(JSON.parse(localStorage.getItem("gymProteins")) || []);
setTrials(JSON.parse(localStorage.getItem("trialRequests")) || []);
setBookings(JSON.parse(localStorage.getItem("trainerRequests")) || []);

},[]);

return(

<div className="min-h-screen bg-background">

<MainNavigation/>

<div className="flex pt-20">

{/* SIDEBAR */}

<div className="w-64 min-h-screen bg-black border-r border-white/10 p-6">

<h2 className="text-2xl font-bold mb-8 text-orange-400">
Owner Panel
</h2>

<button onClick={()=>navigate("/owner-dashboard")} className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500">
Dashboard
</button>

<button onClick={()=>navigate("/trainers")} className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500">
Trainer Management
</button>

<button onClick={()=>navigate("/supplements")} className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500">
Supplement Management
</button>

<button onClick={()=>navigate("/membership")} className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500">
Membership Management
</button>

<button onClick={()=>navigate("/earnings")} className="block w-full text-left mb-3 p-3 rounded hover:bg-orange-500">
Earnings
</button>

<button onClick={()=>navigate("/")} className="mt-10 w-full bg-white/20 p-2 rounded">
← Back
</button>

</div>

{/* CONTENT */}

<div className="flex-1 p-10">

<h1 className="text-4xl font-bold mb-8 text-orange-400">
Gym Overview
</h1>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

<div className="bg-white/10 p-6 rounded-xl border border-white/20">
<p>Total Trainers</p>
<h2 className="text-3xl font-bold text-orange-400">{trainers.length}</h2>
</div>

<div className="bg-white/10 p-6 rounded-xl border border-white/20">
<p>Total Supplements</p>
<h2 className="text-3xl font-bold text-orange-400">{proteins.length}</h2>
</div>

<div className="bg-white/10 p-6 rounded-xl border border-white/20">
<p>Trial Requests</p>
<h2 className="text-3xl font-bold text-orange-400">{trials.length}</h2>
</div>

<div className="bg-white/10 p-6 rounded-xl border border-white/20">
<p>Trainer Bookings</p>
<h2 className="text-3xl font-bold text-orange-400">{bookings.length}</h2>
</div>

</div>

</div>

</div>

</div>

);

};

export default OwnerDashboard;