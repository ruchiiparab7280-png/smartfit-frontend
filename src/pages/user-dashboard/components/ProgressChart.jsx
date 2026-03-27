import React, { useState } from "react";
import {
LineChart,
Line,
BarChart,
Bar,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
Legend,
ResponsiveContainer
} from "recharts";

import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";

const ProgressChart = ({ workouts }) => {

const [chartType,setChartType] = useState("workouts")

/* WORKOUT SESSIONS DATA – group by day */

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const workoutData = DAYS.map(d => ({
  month: d.slice(0, 3),
  sessions: (workouts || []).filter(w => w.day === d).length
}));


/* CALORIES AUTO CALCULATION – estimate 8 cal per set */

const caloriesData = DAYS.map(d => {
  let calories = 0;
  (workouts || []).filter(w => w.day === d).forEach(w => {
    calories += (w.sets || 1) * 8;
  });
  return { month: d.slice(0, 3), burned: calories };
});


/* WEIGHT DATA (placeholder until weight tracking added) */

const weightData = DAYS.map((d, index) => ({
  month: d.slice(0, 3),
  weight: 180 - index,
  target: 170
}));


const chartOptions = [
{ id:"weight",label:"Weight Progress",icon:"TrendingDown" },
{ id:"workouts",label:"Workout Sessions",icon:"Activity" },
{ id:"calories",label:"Calorie Tracking",icon:"Flame" }
]


return(

<div className="bg-card rounded-lg p-6 w-full overflow-hidden">

{/* HEADER */}

<div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">

<h2 className="text-2xl font-bold text-foreground">
Progress Tracking
</h2>

<div className="flex flex-wrap gap-2">

{chartOptions.map(option=>(
<Button
key={option.id}
variant={chartType === option.id ? "default" : "outline"}
size="sm"
iconName={option.icon}
iconPosition="left"
onClick={()=>setChartType(option.id)}
>
{option.label}
</Button>
))}

</div>

</div>


{/* CHART */}

<div className="w-full h-[320px]">


{/* WEIGHT CHART */}

{chartType === "weight" && (

<ResponsiveContainer width="100%" height="100%">

<LineChart data={weightData}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

<XAxis dataKey="month" stroke="var(--color-muted-foreground)" />

<YAxis stroke="var(--color-muted-foreground)" />

<Tooltip
contentStyle={{
backgroundColor:"var(--color-card)",
border:"1px solid var(--color-border)",
borderRadius:"8px"
}}
/>

<Legend/>

<Line
type="monotone"
dataKey="weight"
stroke="var(--color-primary)"
strokeWidth={3}
name="Current Weight"
/>

<Line
type="monotone"
dataKey="target"
stroke="var(--color-success)"
strokeWidth={2}
strokeDasharray="5 5"
name="Target Weight"
/>

</LineChart>

</ResponsiveContainer>

)}


{/* WORKOUT SESSIONS */}

{chartType === "workouts" && (

<ResponsiveContainer width="100%" height="100%">

<BarChart data={workoutData}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

<XAxis dataKey="month" stroke="var(--color-muted-foreground)" />

<YAxis stroke="var(--color-muted-foreground)" />

<Tooltip
contentStyle={{
backgroundColor:"var(--color-card)",
border:"1px solid var(--color-border)",
borderRadius:"8px"
}}
/>

<Legend/>

<Bar
dataKey="sessions"
fill="var(--color-accent)"
radius={[6,6,0,0]}
name="Workout Sessions"
/>

</BarChart>

</ResponsiveContainer>

)}


{/* CALORIES */}

{chartType === "calories" && (

<ResponsiveContainer width="100%" height="100%">

<LineChart data={caloriesData}>

<CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />

<XAxis dataKey="month" stroke="var(--color-muted-foreground)" />

<YAxis stroke="var(--color-muted-foreground)" />

<Tooltip
contentStyle={{
backgroundColor:"var(--color-card)",
border:"1px solid var(--color-border)",
borderRadius:"8px"
}}
/>

<Legend/>

<Line
type="monotone"
dataKey="burned"
stroke="var(--color-error)"
strokeWidth={3}
name="Calories Burned"
/>

</LineChart>

</ResponsiveContainer>

)}

</div>

</div>

)

}

export default ProgressChart