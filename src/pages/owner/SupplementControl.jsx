import React,{useState,useEffect} from "react";
import MainNavigation from "../../components/MainNavigation";

const SupplementControl = () => {

const [protein,setProtein] = useState({
name:"",
price:"",
image:""
});

const [proteins,setProteins] = useState([]);

useEffect(()=>{
const saved = JSON.parse(localStorage.getItem("gymProteins")) || [];
setProteins(saved);
},[]);

const handleSave = () => {

const newProtein = {
id:Date.now(),
...protein
};

const updated = [...proteins,newProtein];

localStorage.setItem("gymProteins",JSON.stringify(updated));

setProteins(updated);

setProtein({
name:"",
price:"",
image:""
});

};

const removeProtein = (id) => {

const updated = proteins.filter(p=>p.id !== id);

localStorage.setItem("gymProteins",JSON.stringify(updated));

setProteins(updated);

};

return(

<div className="min-h-screen bg-background">

<MainNavigation/>

<div className="container-custom pt-24 pb-8">

<h1 className="text-4xl font-bold mb-8 text-orange-400">
Supplement Management
</h1>

<input
placeholder="Supplement Name"
className="p-3 mr-3 rounded bg-black/20"
onChange={(e)=>setProtein({...protein,name:e.target.value})}
/>

<input
placeholder="Price"
className="p-3 mr-3 rounded bg-black/20"
onChange={(e)=>setProtein({...protein,price:e.target.value})}
/>

<button
onClick={handleSave}
className="bg-orange-500 px-6 py-2 rounded"
>
Add Supplement
</button>

<div className="mt-10">

{proteins.map(p=>(
<div key={p.id} className="bg-white/10 p-4 mb-4 rounded flex justify-between items-center">

<div className="flex items-center gap-4">

{p.image && (
<img src={p.image} className="w-16 h-16 rounded-full object-cover"/>
)}

<div>
<p className="font-bold">{p.name}</p>
<p>₹ {p.price}</p>
</div>

</div>

<button
onClick={()=>removeProtein(p.id)}
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

export default SupplementControl;