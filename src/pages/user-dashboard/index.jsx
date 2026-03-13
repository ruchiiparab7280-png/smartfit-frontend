import React, { useState } from "react";
import MainNavigation from "../../components/MainNavigation";
import Icon from "../../components/AppIcon";

import StatsOverview from "./components/StatsOverview";
import ProfileCard from "./components/ProfileCard";
import MembershipCard from "./components/MembershipCard";
import WorkoutPlanCard from "./components/WorkoutPlanCard";
import ProgressChart from "./components/ProgressChart";
import BMICalculator from "./components/BMICalculator";
import RecommendedGymCard from "./components/RecommendedGymCard";

import FreeTrialRequests from "./components/FreeTrialRequests";
import TrainerRequests from "./components/TrainerRequests";
import SupplementOrders from "./components/SupplementOrders";

const UserDashboard = () => {

const [activeTab,setActiveTab] = useState("dashboard")

const renderContent = () => {

switch(activeTab){

case "dashboard":
return(
<>
<StatsOverview/>
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
<WorkoutPlanCard/>
<ProgressChart/>
</div>
</>
)

case "profile":
return <ProfileCard/>

case "membership":
return <MembershipCard/>

case "trial":
return <FreeTrialRequests/>

case "trainer":
return <TrainerRequests/>

case "supplements":
return <SupplementOrders/>

case "workout":
return (
<div className="max-w-4xl">
<WorkoutPlanCard/>
</div>
)

case "bmi":
return <BMICalculator/>

case "gyms":
return <RecommendedGymCard/>

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

<button onClick={()=>setActiveTab("gyms")} className="flex gap-3 items-center hover:text-primary">
<Icon name="MapPin"/> Recommended Gyms
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