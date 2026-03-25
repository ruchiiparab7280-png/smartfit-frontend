import React, { useState, useEffect } from "react";
import MainNavigation from "../../components/MainNavigation";
import Icon from "../../components/AppIcon";

import StatsOverview from "./components/StatsOverview";
import ProfileCard from "./components/ProfileCard";
import MembershipCard from "./components/MembershipCard";
import WorkoutPlanCard from "./components/WorkoutPlanCard";
import ProgressChart from "./components/ProgressChart";
import BMICalculator from "./components/BMICalculator";


import FreeTrialRequests from "./components/FreeTrialRequests";
import TrainerRequests from "./components/TrainerRequests";
import SupplementOrders from "./components/SupplementOrders";

const UserDashboard = () => {
const [workouts,setWorkouts] = useState([])
const [profile,setProfile] = useState(null)  
const updateProfile = (newData) => {
setProfile(newData)
}
const [membership,setMembership] = useState(null)
useEffect(()=>{

const parseDurationMonths = (duration) => {
if (duration === null || duration === undefined) return 1;
const str = String(duration).toLowerCase();

// "1 year", "2 years"
const yearMatch = str.match(/(\d+)\s*year/);
if (yearMatch) {
const years = Number(yearMatch[1]);
return Number.isNaN(years) ? 1 : years * 12;
}

// "year" (no number)
if (str.includes("year")) return 12;

// "3 months", "12 month"
const monthMatch = str.match(/(\d+)\s*month/);
if (monthMatch) {
const months = Number(monthMatch[1]);
return Number.isNaN(months) ? 1 : months;
}

const digits = str.match(/\d+/);
const months = digits ? Number(digits[0]) : 1;
return Number.isNaN(months) ? 1 : months;
};

const formatUTCDate = (dateLike) => {
if (!dateLike) return null;
const d = dateLike instanceof Date ? dateLike : new Date(dateLike);
if (Number.isNaN(d.getTime())) return null;

const y = d.getUTCFullYear();
const m = String(d.getUTCMonth() + 1).padStart(2, "0");
const day = String(d.getUTCDate()).padStart(2, "0");
return `${y}-${m}-${day}`;
};

const calculateExpiryDate = (startDateValue, durationValue) => {
const startDateStr = formatUTCDate(startDateValue);
if (!startDateStr) return null;

const [yStr, mStr, dStr] = startDateStr.split("-");
const y = Number(yStr);
const m = Number(mStr);
const d = Number(dStr);
if ([y, m, d].some((n) => Number.isNaN(n))) return null;

const monthsToAdd = parseDurationMonths(durationValue);

// Month math in UTC avoids timezone "off by one day" errors.
const expiry = new Date(Date.UTC(y, m - 1, d));
const originalDay = expiry.getUTCDate();

expiry.setUTCDate(1);
expiry.setUTCMonth(expiry.getUTCMonth() + monthsToAdd);

const lastDayOfTargetMonth = new Date(
  Date.UTC(expiry.getUTCFullYear(), expiry.getUTCMonth() + 1, 0)
).getUTCDate();

expiry.setUTCDate(Math.min(originalDay, lastDayOfTargetMonth));
return formatUTCDate(expiry);
};

const getMembershipStatus = (expiryDateValue) => {
if (!expiryDateValue) return "Active";

const toUTCDateMidnight = (value) => {
const dateStr =
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)
    ? value
    : formatUTCDate(value);

if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return null;
const [y, m, d] = dateStr.split("-").map(Number);
return new Date(Date.UTC(y, m - 1, d));
};

const expiryUTC = toUTCDateMidnight(expiryDateValue);
if (!expiryUTC) return "Active";

const today = new Date();
const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

const diff = Math.ceil((expiryUTC - todayUTC) / (1000 * 60 * 60 * 24));
if (diff <= 0) return "Expired";
if (diff <= 7) return "Expiring Soon";
return "Active";
};

const fetchMembership = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(`${import.meta.env.VITE_API_URL}/user-memberships/${email}`)

const data = await res.json()
console.log("user-memberships API response:", data)

if(data.length > 0){
const firstMembership = data[0];
const computedExpiry = calculateExpiryDate(firstMembership.start_date, firstMembership.duration);
const resolvedExpiryDate = firstMembership.expiry_date || computedExpiry;

setMembership({
...firstMembership,
expiry_date: resolvedExpiryDate,
status:getMembershipStatus(resolvedExpiryDate),
gymImage:"https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
})

console.log("Normalized membership (dashboard):", {
  gym_name: firstMembership?.gym_name,
  gym_city: firstMembership?.gym_city,
  start_date: firstMembership?.start_date,
  expiry_date: resolvedExpiryDate,
  duration: firstMembership?.duration,
});

}

}

fetchMembership()

},[])

useEffect(()=>{

const fetchWorkouts = async ()=>{

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/user-workouts/${email}`
)

const data = await res.json()

setWorkouts(data)

}

fetchWorkouts()

},[])
useEffect(()=>{

const fetchProfile = async ()=>{

const email = localStorage.getItem("userEmail")

try{

const res = await fetch(`${import.meta.env.VITE_API_URL}/user-profile/${email}`)

const data = await res.json()

setProfile(data)

}catch(err){

console.log("Profile fetch error",err)

}

}

fetchProfile()

},[])

const calculateStreak = (workouts) => {

let streak = 0

for(let i = 0; i < workouts.length; i++){

const allCompleted = workouts[i].exercises?.every(ex => ex.completed)

if(allCompleted){
streak++
}else{
break
}

}

return streak

}
const calculateCalories = (workouts) => {

let total = 0

workouts.forEach(day=>{
if(day.exercises){
day.exercises.forEach(ex=>{
if(ex.completed){
total += 8
}
})
}
})

return total

}

const [activeTab,setActiveTab] = useState("dashboard")

const renderContent = () => {

switch(activeTab){

case "dashboard":
return(
<>
<StatsOverview
stats={{
active_memberships: membership ? 1 : 0,
workouts_this_month: workouts.length,
calories_burned: calculateCalories(workouts),
streak: calculateStreak(workouts)
}}
/>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
<WorkoutPlanCard workouts={workouts} setWorkouts={setWorkouts}/>
<ProgressChart workouts={workouts}/>
</div>

</>
)

case "profile":
return <ProfileCard data={profile} updateProfile={updateProfile}/>

case "membership":
return membership ? (
<MembershipCard 
membership={membership} 
goToGyms={(gymEmail)=>{
localStorage.setItem("renewGym",gymEmail)
setActiveTab("gyms")
}}
/>
) : (
  <div className="bg-card p-10 rounded-lg text-center">
    <h2 className="text-xl font-semibold mb-2">No Active Membership</h2>
    <p className="text-muted-foreground mb-4">
      You haven't purchased any membership yet.
    </p>

    <button
      onClick={()=>setActiveTab("gyms")}
      className="bg-orange-500 text-white px-5 py-2 rounded"
    >
      Explore Gyms
    </button>
  </div>
)

case "trial":
return <FreeTrialRequests/>

case "trainer":
return <TrainerRequests/>

case "supplements":
return <SupplementOrders/>

case "workout":
return (
<div className="max-w-4xl">
<WorkoutPlanCard workouts={workouts} setWorkouts={setWorkouts}/>
</div>
)

case "bmi":
return <BMICalculator/>



default:
return <StatsOverview/>

}

}

return(

<div className="min-h-screen bg-background">

<MainNavigation/>

{/* 👇 Navbar ke niche space */}

<div className="flex pt-20">

{/* SIDEBAR */}

<div className="w-64 bg-card border-r border-border min-h-screen p-6">

<h2 className="text-xl font-bold mb-6">User Dashboard</h2>

<div className="space-y-3">

<button onClick={()=>setActiveTab("dashboard")} className="flex gap-3 items-center hover:text-primary">
<Icon name="LayoutDashboard"/> Dashboard
</button>

<button onClick={()=>setActiveTab("profile")} className="flex gap-3 items-center hover:text-primary">
<Icon name="User"/> Profile
</button>

<button onClick={()=>setActiveTab("membership")} className="flex gap-3 items-center hover:text-primary">
<Icon name="CreditCard"/> Membership
</button>

<button onClick={()=>setActiveTab("trial")} className="flex gap-3 items-center hover:text-primary">
<Icon name="Clock"/> Free Trial
</button>

<button onClick={()=>setActiveTab("trainer")} className="flex gap-3 items-center hover:text-primary">
<Icon name="Users"/> Trainer Requests
</button>

<button onClick={()=>setActiveTab("supplements")} className="flex gap-3 items-center hover:text-primary">
<Icon name="ShoppingBag"/> Supplements
</button>

<button onClick={()=>setActiveTab("workout")} className="flex gap-3 items-center hover:text-primary">
<Icon name="Dumbbell"/> Workout Plan
</button>

<button onClick={()=>setActiveTab("bmi")} className="flex gap-3 items-center hover:text-primary">
<Icon name="Activity"/> BMI Calculator
</button>


</div>

</div>

{/* RIGHT CONTENT */}

<div className="flex-1 p-8">

{renderContent()}

</div>

</div>

</div>

)

}

export default UserDashboard;