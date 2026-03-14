import React, { useRef, useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GymDetailsModal = ({ gym, isOpen, onClose }) => {

if (!isOpen || !gym) return null;

const scrollRef = useRef(null);

/* ================= STATES ================= */

const [showTrainerModal,setShowTrainerModal] = useState(false);
const [selectedTrainer,setSelectedTrainer] = useState(null);

const [trainerDate,setTrainerDate] = useState("");
const [trainerTime,setTrainerTime] = useState("");
const [trainerName,setTrainerName] = useState("");
const [trainerPhone,setTrainerPhone] = useState("");

const [showBookingModal,setShowBookingModal] = useState(false);
const [selectedPlan,setSelectedPlan] = useState(null);

/* ================= TRAINER BOOKING ================= */

const handleTrainerBooking = async ()=>{

await fetch(`${import.meta.env.VITE_API_URL}/book-trainer`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_email:localStorage.getItem("userEmail"),
gym_email:gym.email,
trainer_name:selectedTrainer.name,
trainer_price:selectedTrainer.price,
booking_date:trainerDate,
booking_time:trainerTime,
full_name:trainerName,
phone:trainerPhone
})
})

alert("Trainer request sent")

setShowTrainerModal(false)

}

/* ================= MEMBERSHIP PAYMENT ================= */

const handlePayment = async ()=>{

if(!selectedPlan){
alert("Please select a plan")
return
}

const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
amount:selectedPlan.price
})
})

const order = await res.json()

const options = {

key:order.key,
amount:order.amount,
currency:"INR",
name:"SmartFit Gym",
description:selectedPlan.name,
order_id:order.id,

handler:async function(response){

await fetch(`${import.meta.env.VITE_API_URL}/payment/verify`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(response)
})

await fetch(`${import.meta.env.VITE_API_URL}/book-membership`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_email:localStorage.getItem("userEmail"),
gym_email:gym.email,
gym_name:gym.name,
gym_city:gym.city,
plan_name:selectedPlan.name,
duration:selectedPlan.duration,
price:selectedPlan.price,
start_date:new Date(),
payment_id:response.razorpay_payment_id
})
})

alert("Membership Activated 🎉")

},

theme:{
color:"#f97316"
}

}

const rzp = new window.Razorpay(options)
rzp.open()

}

/* ================= SCROLL ================= */

const scrollLeft = ()=>{
scrollRef.current.scrollBy({
left:-600,
behavior:"smooth"
})
}

const scrollRight = ()=>{
scrollRef.current.scrollBy({
left:600,
behavior:"smooth"
})
}

/* ================= UI ================= */

return(

<div className="fixed inset-0 z-300 flex items-center justify-center p-4">

<div
className="absolute inset-0 bg-background/80 backdrop-blur-sm"
onClick={onClose}
/>

<div className="relative bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">

<button
onClick={onClose}
className="absolute top-4 right-4 p-2 rounded-full"
>
<Icon name="X" size={24}/>
</button>

{/* ================= IMAGE SLIDER ================= */}

<div className="relative h-64 overflow-hidden">

<button
onClick={scrollLeft}
className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
>
<Icon name="ChevronLeft" size={20}/>
</button>

<div
ref={scrollRef}
className="flex overflow-x-auto h-full scroll-smooth no-scrollbar"
>

{gym?.images?.map((img,index)=>(
<Image
key={index}
src={img}
alt="gym"
className="min-w-full h-full object-cover"
/>
))}

</div>

<button
onClick={scrollRight}
className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full"
>
<Icon name="ChevronRight" size={20}/>
</button>

</div>

<div className="p-6">

<h2 className="text-2xl font-bold mb-4">
{gym?.name}
</h2>

{/* ================= MEMBERSHIPS ================= */}

<h3 className="text-lg font-semibold mb-3">
Membership Plans
</h3>

<div className="grid grid-cols-3 gap-4">

{gym?.memberships?.map((plan,index)=>(

<div
key={index}
onClick={()=>{
setSelectedPlan(plan)
setShowBookingModal(true)
}}
className="p-4 border rounded cursor-pointer"
>

<h4 className="font-semibold">
{plan.name}
</h4>

<p className="text-primary font-bold">
₹{plan.price}/{plan.duration}
</p>

<p className="text-sm">
{plan.description}
</p>

</div>

))}

</div>

{/* ================= TRAINERS ================= */}

<h3 className="text-lg font-semibold mt-6 mb-3">
Available Trainers
</h3>

<div className="grid grid-cols-3 gap-4">

{gym?.trainers?.map((trainer,index)=>(

<div
key={index}
className="p-4 bg-muted rounded text-center"
>

<img
src={trainer.image}
alt="trainer"
className="w-20 h-20 mx-auto rounded-full mb-2"
/>

<p className="font-semibold">
{trainer.name}
</p>

<p className="text-sm">
₹{trainer.price}/session
</p>

<button
onClick={()=>{
setSelectedTrainer(trainer)
setShowTrainerModal(true)
}}
className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
>
Book Trainer
</button>

</div>

))}

</div>

</div>

</div>

{/* ================= TRAINER MODAL ================= */}

{showTrainerModal && (

<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

<div className="bg-card p-6 rounded-lg w-[400px]">

<h2 className="text-xl font-bold mb-4">
Book Training Session
</h2>

<input
type="date"
value={trainerDate}
onChange={(e)=>setTrainerDate(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>

<select
value={trainerTime}
onChange={(e)=>setTrainerTime(e.target.value)}
className="w-full mb-3 p-2 border rounded"
>
<option>9:00 AM</option>
<option>10:00 AM</option>
<option>11:00 AM</option>
</select>

<input
type="text"
placeholder="Full Name"
value={trainerName}
onChange={(e)=>setTrainerName(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>

<input
type="text"
placeholder="Phone Number"
value={trainerPhone}
onChange={(e)=>setTrainerPhone(e.target.value)}
className="w-full mb-4 p-2 border rounded"
/>

<button
onClick={handleTrainerBooking}
className="w-full bg-orange-500 text-white py-2 rounded"
>
Confirm Booking
</button>

<button
onClick={()=>setShowTrainerModal(false)}
className="mt-2 text-sm"
>
Cancel
</button>

</div>

</div>

)}

{/* ================= MEMBERSHIP MODAL ================= */}

{showBookingModal && (

<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

<div className="bg-card p-6 rounded-lg w-[400px]">

<h2 className="text-xl font-bold mb-4">
Select Membership
</h2>

<p className="mb-3">
{selectedPlan?.name} - ₹{selectedPlan?.price}/{selectedPlan?.duration}
</p>

<button
onClick={handlePayment}
className="w-full bg-orange-500 text-white py-2 rounded"
>
Confirm Booking
</button>

<button
onClick={()=>setShowBookingModal(false)}
className="mt-2 text-sm"
>
Cancel
</button>

</div>

</div>

)}

</div>

)

}

export default GymDetailsModal;