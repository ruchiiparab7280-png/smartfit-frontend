import React, { useRef, useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GymDetailsModal = ({ gym, isOpen, onClose }) => {
  if (!isOpen || !gym) return null;

 const scrollRef = useRef(null);

const [showTrainerModal,setShowTrainerModal] = useState(false);
const [selectedTrainer,setSelectedTrainer] = useState(null);

const [trainerDate,setTrainerDate] = useState("");
const [trainerTime,setTrainerTime] = useState("");
const [trainerName,setTrainerName] = useState("");
const [trainerPhone,setTrainerPhone] = useState("");

const [showTrialModal,setShowTrialModal] = useState(false)

const [trialDate,setTrialDate] = useState("")
const [trialTime,setTrialTime] = useState("")
const [trialName,setTrialName] = useState("")
const [trialPhone,setTrialPhone] = useState("")

const [showBookingModal, setShowBookingModal] = useState(false);

const [showSupplementModal,setShowSupplementModal] = useState(false)
const [selectedSupplement,setSelectedSupplement] = useState(null)

const [supplementQty,setSupplementQty] = useState(1)
const [paymentMethod,setPaymentMethod] = useState("online")
const [pickupDate,setPickupDate] = useState("")

const handleTrialBooking = async () => {

await fetch(`${import.meta.env.VITE_API_URL}/book-free-trial`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_email:localStorage.getItem("userEmail"),
gym_email:gym.email,
gym_name:gym.name,
gym_city:gym.city,
user_name:trialName,
user_phone:trialPhone,
date:trialDate,
time:trialTime
})
})

alert("Free Trial Request Sent")

setShowTrialModal(false)

}

const handleSupplementOrder = async () => {

if(paymentMethod === "online"){

const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
amount:selectedSupplement.price * supplementQty
})
})

const order = await res.json()

const options = {

key:order.key,
amount:order.amount,
currency:"INR",
name:"SmartFit",
description:selectedSupplement.name,
order_id:order.id,

handler: async function (response){

await fetch(`${import.meta.env.VITE_API_URL}/payment/verify`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(response)
})

await fetch(`${import.meta.env.VITE_API_URL}/order-supplement`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

user_email:localStorage.getItem("userEmail"),

gym_email:gym.email,
gym_name:gym.name,

supplement_name:selectedSupplement.name,

price:selectedSupplement.price,

quantity:supplementQty,

payment_method:"online",

payment_status:"paid",

pickup_date:null

})
})

alert("Payment successful 🎉")

setShowSupplementModal(false)

},

theme:{
color:"#f97316"
}

}

const rzp = new window.Razorpay(options)

rzp.open()

}else{

await fetch(`${import.meta.env.VITE_API_URL}/order-supplement`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({

user_email:localStorage.getItem("userEmail"),

gym_email:gym.email,
gym_name:gym.name,

supplement_name:selectedSupplement.name,

price:selectedSupplement.price,

quantity:supplementQty,

payment_method:"gym",

payment_status:"pending",

pickup_date:pickupDate

})
})

alert("Order placed. Pay at gym.")

setShowSupplementModal(false)

}

}


const handleTrainerBooking = async () => {

await fetch(`${import.meta.env.VITE_API_URL}/book-trainer`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
user_email:localStorage.getItem("userEmail"),
gym_email:gym.email,
gym_name:gym.name,  
trainer_name:selectedTrainer.name,
trainer_price:selectedTrainer.price,
date:trainerDate,
time:trainerTime,
full_name:trainerName,
phone:trainerPhone
})
})

alert("Trainer request sent")

setShowTrainerModal(false)

}

const handlePayment = async () => {


  if (!selectedPlan) {
  alert("Please select a plan");
  return;
}


  const res = await fetch(`${import.meta.env.VITE_API_URL}/payment/create-order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount: selectedPlan.price
    })
  });

  const order = await res.json();

const options = {
  key: order.key,
  amount: order.amount,
  currency: "INR",
  name: "SmartFit Gym",
  description: selectedPlan.name,
  order_id: order.id,

  handler: async function (response) {
   console.log("GYM OBJECT:", gym);
    // verify payment
    await fetch(`${import.meta.env.VITE_API_URL}/payment/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(response)
    });

    // save membership
   await fetch(`${import.meta.env.VITE_API_URL}/book-membership`, {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
user_email: localStorage.getItem("userEmail"),
gym_email: gym.email,
gym_name: gym.gym_name,
gym_city: gym.gym_city,
plan_name: selectedPlan.name,
duration: selectedPlan.duration,
price: selectedPlan.price,
start_date: new Date().toISOString(),
payment_id: response.razorpay_payment_id
})
});

    alert("Membership Activated 🎉");

  },

  theme: {
    color: "#f97316"
  }
};
  const rzp = new window.Razorpay(options);
  rzp.open();
};
const [selectedPlan, setSelectedPlan] = useState(null);

const scrollLeft = () => {
  scrollRef.current.scrollBy({
    left: -600,
    behavior: "smooth"
  });
};

const scrollRight = () => {
  scrollRef.current.scrollBy({
    left: 600,
    behavior: "smooth"
  });
};

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'Star' : 'StarOff'}
        size={18}
        color={index < Math.floor(rating) ? '#F59E0B' : '#D1D5DB'}
        className="fill-current"
      />
    ));
  };

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card rounded-lg card-elevation-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-background/90 backdrop-blur-sm p-2 rounded-full hover:bg-background transition-base focus-ring"
          aria-label="Close modal"
        >
          <Icon name="X" size={24} />
        </button>

        <div className="relative h-64 sm:h-80 overflow-hidden rounded-t-lg">

 {/* LEFT BUTTON */}

<button
  onClick={scrollLeft}
  className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
>
  <Icon name="ChevronLeft" size={20} />
</button>

{/* IMAGE SLIDER */}

<div
  ref={scrollRef}
  className="flex overflow-x-auto h-full scroll-smooth no-scrollbar"
>
  {gym?.images?.map((img, index) => (
    <Image
      key={index}
      src={img}
      alt="gym"
      className="min-w-full h-full object-cover flex-shrink-0"
    />
  ))}
</div>

{/* RIGHT BUTTON */}

<button
  onClick={scrollRight}
  className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white p-2 rounded-full z-10"
>
  <Icon name="ChevronRight" size={20} />
</button>

  {/* FEATURED TAG */}
  {gym?.featured && (
    <div className="absolute top-4 left-4 bg-accent text-accent-foreground px-4 py-2 rounded-md font-medium">
      Featured Gym
    </div>
  )}

</div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {gym?.name}
              </h2>
              <div className="flex items-center space-x-2 mb-2">
                {renderStars(gym?.rating)}
                <span className="text-sm text-muted-foreground">
                  {gym?.rating} ({gym?.reviews} reviews)
                </span>
              </div>
              <div className="flex items-center text-muted-foreground">
                <Icon name="MapPin" size={18} className="mr-2" />
                <span>{gym?.address}</span>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm text-muted-foreground mb-1">Starting from</p>
              <p className="text-3xl font-bold text-primary">₹{gym?.price}/month</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <Icon name="Users" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Members</p>
              <p className="font-semibold text-foreground">{gym?.members}+</p>
            </div>
            <div className="text-center">
              <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Open Hours</p>
              <p className="font-semibold text-foreground">{gym?.openTime}</p>
            </div>
            <div className="text-center">
              <Icon name="MapPin" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Distance</p>
              <p className="font-semibold text-foreground">{gym?.distance} km</p>
            </div>
            <div className="text-center">
              <Icon name="Star" size={24} className="mx-auto mb-2 text-primary" />
              <p className="text-sm text-muted-foreground">Rating</p>
              <p className="font-semibold text-foreground">{gym?.rating}/5</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Info" size={20} className="mr-2" />
              About This Gym
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {gym?.description}
            </p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Sparkles" size={20} className="mr-2" />
              Amenities & Features
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {gym?.amenities?.map((amenity, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 bg-muted rounded-lg"
                >
                  <Icon name={amenity?.icon} size={18} color="var(--color-primary)" />
                  <span className="text-sm text-foreground">{amenity?.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="CreditCard" size={20} className="mr-2" />
              Membership Plans
            </h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {gym?.memberships?.map((plan, index) => (
  <div
    key={index}
  onClick={() => {
setSelectedPlan(plan)
setShowBookingModal(true)
}}
    className="p-4 border border-border rounded-lg hover:border-primary transition-base cursor-pointer"
  >
                  <h4 className="font-semibold text-foreground mb-2">{plan?.name}</h4>
                  <p className="text-2xl font-bold text-primary mb-2">
                   ₹{plan?.price}
                    <span className="text-sm text-muted-foreground font-normal">/{plan?.duration}</span>
                  </p>
                 <p className="text-sm text-muted-foreground">
                    {plan?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FREE TRIAL */}

<div className="mb-6 bg-muted p-4 rounded-lg">

  <h3 className="text-lg font-semibold text-foreground mb-2 flex items-center">
    <Icon name="Gift" size={20} className="mr-2" />
    One Day Free Trial
  </h3>

  <p className="text-muted-foreground mb-3">
    Try this gym for free for one day before purchasing a membership.
  </p>

<button
onClick={() => setShowTrialModal(true)}
className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
>
Book Free Trial
</button>

</div>


          {/* TRAINERS */}

<div className="mb-6">
  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
    <Icon name="UserCheck" size={20} className="mr-2" />
    Available Trainers
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

    {gym?.trainers?.map((trainer, index) => (

      <div
        key={index}
        className="p-4 bg-muted rounded-lg text-center"
      >

        <img
          src={trainer.image}
          alt="trainer"
          className="w-20 h-20 mx-auto rounded-full object-cover mb-2"
        />

        <p className="font-semibold text-foreground">
          {trainer.name}
        </p>

        <p className="text-sm text-muted-foreground">
          ₹{trainer.price}/session
        </p>

        <button
         onClick={() => {
            setSelectedTrainer(trainer);
            setShowTrainerModal(true);
            }}
          className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"
        >
          Book Trainer
        </button>

      </div>

    ))}

  </div>
</div>

{/* SUPPLEMENTS */}

<div className="mb-6">
  <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
    <Icon name="ShoppingCart" size={20} className="mr-2" />
    Supplements Available
  </h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">

    {gym?.supplements?.map((item, index) => (

      <div
        key={index}
        className="p-4 bg-muted rounded-lg text-center"
      >

        <img
          src={item.image}
          alt="supplement"
          className="w-20 h-20 mx-auto rounded object-cover mb-2"
        />

        <p className="font-semibold text-foreground">
          {item.name}
        </p>

        <p className="text-sm text-muted-foreground">
          ₹{item.price}
        </p>

    <button
onClick={()=>{
setSelectedSupplement(item)
setShowSupplementModal(true)
}}
className="mt-2 bg-orange-500 text-white px-3 py-1 rounded"

>

Buy Now </button>

      </div>

    ))}

  </div>
</div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Phone" size={20} className="mr-2" />
              Contact Information
            </h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Icon name="Phone" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="text-sm font-medium text-foreground">{gym?.phone}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
                <Icon name="Mail" size={20} color="var(--color-primary)" />
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="text-sm font-medium text-foreground">{gym?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button
              variant="default"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
            >
              Book a Visit
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Phone"
              iconPosition="left"
            >
              Call Now
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Mail"
              iconPosition="left"
            >
              Send Message
            </Button>
          </div>
        </div>
      </div>
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
className="w-full mb-3 p-2 border rounded text-black"
>
<option value="9:00 AM">9:00 AM</option>
<option value="10:00 AM">10:00 AM</option>
<option value="11:00 AM">11:00 AM</option>
</select>

<input
type="text"
placeholder="Full Name"
value={trainerName}
onChange={(e)=>setTrainerName(e.target.value)}
className="w-full mb-3 p-2 border rounded text-black"
/>

<input
type="text"
placeholder="Phone Number"
value={trainerPhone}
onChange={(e)=>setTrainerPhone(e.target.value)}
className="w-full mb-4 p-2 border rounded text-black"
/>

<button
onClick={handleTrainerBooking}
className="w-full bg-orange-500 text-white py-2 rounded"
>
Confirm Booking
</button>

<button
onClick={()=>setShowTrainerModal(false)}
className="mt-2 text-sm text-gray-900"
>
Cancel
</button>

</div>

</div>

)}

{showTrialModal && (

<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

<div className="bg-card p-6 rounded-lg w-[400px]">

<h2 className="text-xl font-bold mb-4">
Book Free Trial
</h2>

<input
type="date"
value={trialDate}
onChange={(e)=>setTrialDate(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>

<select
value={trialTime}
onChange={(e)=>setTrialTime(e.target.value)}
className="w-full mb-3 p-2 border rounded text-black"
>
<option value="9:00 AM">9:00 AM</option>
<option value="10:00 AM">10:00 AM</option>
<option value="11:00 AM">11:00 AM</option>
</select>

<input
type="text"
placeholder="Full Name"
value={trialName}
onChange={(e)=>setTrialName(e.target.value)}
className="w-full mb-3 p-2 border rounded text-black"
/>

<input
type="text"
placeholder="Phone Number"
value={trialPhone}
onChange={(e)=>setTrialPhone(e.target.value)}
className="w-full mb-4 p-2 border rounded text-black"
/>

<button
onClick={handleTrialBooking}
className="w-full bg-orange-500 text-white py-2 rounded"
>
Confirm Booking
</button>

<button
onClick={()=>setShowTrialModal(false)}
className="mt-2 text-sm text-gray-900"
>
Cancel
</button>

</div>

</div>

)}

{showSupplementModal && (

<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

<div className="bg-card p-6 rounded-lg w-[400px]">

<h2 className="text-xl font-bold mb-4">
Buy Supplement
</h2>

<p className="mb-3">
{selectedSupplement?.name} - ₹{selectedSupplement?.price}
</p>

<label className="text-sm">Quantity</label>
<input
type="number"
value={supplementQty}
onChange={(e)=>setSupplementQty(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>

<label className="text-sm">Payment Method</label>
<select
value={paymentMethod}
onChange={(e)=>setPaymentMethod(e.target.value)}
className="w-full mb-3 p-2 border rounded text-black"

>

<option value="online">Pay Online</option>
<option value="gym">Pay at Gym</option>

</select>

{paymentMethod === "gym" && (

<> <label className="text-sm">Pickup Date</label>
<input
type="date"
value={pickupDate}
onChange={(e)=>setPickupDate(e.target.value)}
className="w-full mb-3 p-2 border rounded"
/>
</>

)}

<button
onClick={handleSupplementOrder}
className="w-full bg-orange-500 text-white py-2 rounded"

>

Confirm Order </button>

<button
onClick={()=>setShowSupplementModal(false)}
className="mt-2 text-sm text-gray-900"

>

Cancel </button>

</div>

</div>

)}

  {showBookingModal && (
<div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">

    <div className="bg-card p-6 rounded-lg w-[400px]">

      <h2 className="text-xl font-bold mb-4">
        Select Membership
      </h2>
      <p className="text-sm text-muted-foreground mb-3">
  {selectedPlan?.name} - ₹{selectedPlan?.price}/{selectedPlan?.duration}
</p>

      <input
        type="date"
        className="w-full mb-3 p-2 border rounded"
      />

      <select className="w-full mb-3 p-2 border rounded text-black">
        <option>9:00 AM</option>
        <option>10:00 AM</option>
        <option>11:00 AM</option>
      </select>

      <input
        type="text"
        placeholder="Full Name"
        className="w-full mb-3 p-2 border rounded  text-black"
      />

      <input
        type="text"
        placeholder="Phone Number"
        className="w-full mb-4 p-2 border rounded  text-black"
      />

     <button
  onClick={handlePayment}
  className="w-full bg-orange-500 text-white py-2 rounded"
>
  Confirm Booking
</button>

      <button
        onClick={() => setShowBookingModal(false)}
        className="mt-2 text-sm text-gray-900"
      >
        Cancel
      </button>

    </div>

  </div>

 )}
  </div>
);
};

export default GymDetailsModal;

