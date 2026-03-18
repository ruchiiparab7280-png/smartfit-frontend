import React, { useEffect, useState } from "react";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import GymDetailsModal from "../../gym-listing/components/GymDetailsModal";

const RecommendedGymCard = () => {

const [gyms,setGyms] = useState([])
const [selectedGym,setSelectedGym] = useState(null)
const [showModal,setShowModal] = useState(false)


// FETCH GYMS

useEffect(()=>{

const fetchGyms = async ()=>{

const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gyms`)
const data = await res.json()

setGyms(data)

}

fetchGyms()

},[])


// 🔥 RENEW AUTO OPEN

useEffect(()=>{

const renewGym = localStorage.getItem("renewGym")

if(renewGym && gyms.length > 0){

const gym = gyms.find(g => g.email === renewGym)

if(gym){

setSelectedGym(gym)
setShowModal(true)

localStorage.removeItem("renewGym")

}

}

},[gyms])


// OPEN MODAL

const openGym = (gym)=>{
setSelectedGym(gym)
setShowModal(true)
}


return(

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

{gyms.map((gym,index)=>(

<div
key={index}
className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition"
>

<Image
src={gym?.image || "https://images.unsplash.com/photo-1571902943202-507ec2618e8f"}
alt={gym?.name}
className="h-48 w-full object-cover"
/>

<div className="p-5">

<h3 className="text-lg font-bold mb-1">{gym?.name}</h3>

<p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
<Icon name="MapPin" size={14}/>
{gym?.city || gym?.address}
</p>

<Button
fullWidth
iconName="Eye"
iconPosition="left"
onClick={()=>openGym(gym)}
>
View Details
</Button>

</div>

</div>

))}


<GymDetailsModal
gym={selectedGym}
isOpen={showModal}
onClose={()=>setShowModal(false)}
/>

</div>

)

}

export default RecommendedGymCard;