import React,{useEffect,useState} from "react";
import MainNavigation from "../../components/MainNavigation";

const Earnings = () => {

const [bookings,setBookings] = useState([]);

useEffect(()=>{
setBookings(JSON.parse(localStorage.getItem("trainerRequests")) || []);
},[]);

const totalRevenue = bookings.length * 500;

return(

<div className="min-h-screen bg-background">

<MainNavigation/>

<div className="container-custom pt-24">

<h1 className="text-4xl font-bold text-orange-400">
Earnings
</h1>

<p className="mt-6 text-xl">
Total Revenue: ₹ {totalRevenue}
</p>

</div>

</div>

);

};

export default Earnings;