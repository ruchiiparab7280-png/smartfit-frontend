import React,{useState,useEffect} from "react";
import MainNavigation from "../../components/MainNavigation";

const TrainerControl = () => {

const [trainer,setTrainer] = useState({
name:"",
price:"",
image:""
});

const [trainers,setTrainers] = useState([]);

useEffect(()=>{
const saved = JSON.parse(localStorage.getItem("gymTrainers")) || [];
setTrainers(saved);
},[]);

const handleSave = () => {

const newTrainer = {
id:Date.now(),
...trainer
};

const updated = [...trainers,newTrainer];

localStorage.setItem("gymTrainers",JSON.stringify(updated));

setTrainers(updated);

setTrainer({
name:"",
price:"",
image:""
});

};

const removeTrainer = (id) => {

const updated = trainers.filter(t=>t.id !== id);

localStorage.setItem("gymTrainers",JSON.stringify(updated));

setTrainers(updated);

};

return(

<div className="min-h-screen bg-background">

<MainNavigation/>

<div className="container-custom pt-24 pb-8">

<h1 className="text-4xl font-bold mb-8 text-orange-400">
Trainer Management
</h1>

<input
placeholder="Trainer Name"
className="p-3 mr-3 rounded bg-black/20"
onChange={(e)=>setTrainer({...trainer,name:e.target.value})}
/>

<input
placeholder="Session Price"
className="p-3 mr-3 rounded bg-black/20"
onChange={(e)=>setTrainer({...trainer,price:e.target.value})}
/>

<button
onClick={handleSave}
className="bg-orange-500 px-6 py-2 rounded"
>
Add Trainer
</button>

<div className="mt-10">

{trainers.map(t=>(
<div key={t.id} className="bg-white/10 p-4 mb-4 rounded flex justify-between items-center">

<div className="flex items-center gap-4">

{t.image && (
<img src={t.image} className="w-16 h-16 rounded-full object-cover"/>
)}

<div>
<p className="font-bold">{t.name}</p>
<p>₹ {t.price} / session</p>
</div>

</div>

<button
onClick={()=>removeTrainer(t.id)}
className="bg-red-500 px-3 py-1 rounded text-white"
>
Remove
</button>

</div>
))}

</div>

</div>

</div>

);

};

export default TrainerControl;