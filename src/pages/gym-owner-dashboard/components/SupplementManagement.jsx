import React, { useState, useEffect } from "react";

const emptyForm = {
  name: "",
  price: "",
  description: "",
  image: "",
  stock_status: "in_stock"
};



const SupplementManagement = () => {

const [supplements, setSupplements] = useState([]);
const [orders,setOrders] = useState([]);


const [showModal, setShowModal] = useState(false);
const [editId, setEditId] = useState(null);
const [form, setForm] = useState(emptyForm);
const [imagePreview, setImagePreview] = useState("");

const ownerEmail = localStorage.getItem("userEmail");


// fetch supplements
const fetchSupplements = async () => {

try{

const res = await fetch(
`${import.meta.env.VITE_API_URL}/supplements/${ownerEmail}`
);

const data = await res.json();

setSupplements(data);

}catch(err){

console.log(err);

}

};

useEffect(() => {

fetchSupplements()
fetchOrders()

}, [])


const fetchOrders = async () => {

try{

const res = await fetch(
`${import.meta.env.VITE_API_URL}/supplement-orders/${ownerEmail}`
)

const data = await res.json()

setOrders(data)

}catch(err){

console.log(err)

}


}

const setPickupDate = async (id) => {

const date = prompt("Enter pickup date (YYYY-MM-DD)")

if(!date) return

await fetch(`${import.meta.env.VITE_API_URL}/set-pickup-date/${id}`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
pickup_date:date,
status:"approved"
})

})

fetchOrders()

}


// open add modal
const openAdd = () => {

setForm(emptyForm);
setImagePreview("");
setEditId(null);
setShowModal(true);

};


// edit
const openEdit = (s) => {

setForm({
name: s?.name,
price: s?.price,
description: s?.description,
image: s?.image,
stock_status: s?.stock_status  
});

setImagePreview(s?.image);
setEditId(s?.id);
setShowModal(true);

};


const handleDelete = async (id) => {

console.log("Deleting supplement id:", id);

try{

await fetch(
`${import.meta.env.VITE_API_URL}/supplement/${id}`,
{
method:"DELETE"
}
);

fetchSupplements();

}catch(err){

console.log(err);

}

};

// image preview
const handleImageChange = (e) => {

const file = e.target.files[0];

if(file){
const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const allowedMimes = new Set(["image/jpeg", "image/png", "image/webp"]);

const ext = file?.name?.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
const isAllowed = ext && allowedExts.has(ext) && allowedMimes.has(file.type);

if(!isAllowed){
  alert("Invalid image type. Allowed: jpg, jpeg, png, webp");
  return;
}

if (imagePreview?.startsWith("blob:")) {
  URL.revokeObjectURL(imagePreview);
}

const url = URL.createObjectURL(file);
console.log("Supplement selected image file:", { name: file.name, type: file.type });

setImagePreview(url);
setForm((prev) => ({
...prev,
image:file
}));

// Allow selecting the same file again.
e.target.value = "";

}

};

const handleRemoveImage = () => {
  if (imagePreview?.startsWith("blob:")) {
    URL.revokeObjectURL(imagePreview);
  }
  setImagePreview("");
  setForm((prev) => ({ ...prev, image: "" }));
  console.log("Supplement image selection cleared");
};

// add supplement
const handleSubmit = async (e) => {

e.preventDefault();

try{

if(editId){

// UPDATE API
let imageUrl = form.image;

// If user selected a new File, upload it; otherwise keep existing URL.
if (form.image instanceof File) {
  const fd = new FormData();
  fd.append("image", form.image);
  const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
    method: "POST",
    body: fd,
  });
  const uploadData = await uploadRes.json();
  console.log("✅ Supplement upload response:", uploadData);
  imageUrl = uploadData.image;
}

await fetch(`${import.meta.env.VITE_API_URL}/update-supplement/${editId}`,{
  method:"PUT",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    gym_email:ownerEmail,
    name:form.name,
    price:form.price,
    description:form.description,
    stock_status:form.stock_status,
    image:imageUrl,
  })
});

alert("Supplement updated ✅");

}else{

// ADD API
let imageUrl = form.image || imagePreview;
if (!imageUrl) {
  alert("Please upload a supplement image");
  return;
}

// If user selected a new File, upload it.
if (form.image instanceof File) {
  const fd = new FormData();
  fd.append("image", form.image);
  const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
    method: "POST",
    body: fd,
  });
  const uploadData = await uploadRes.json();
  console.log("✅ Supplement upload response:", uploadData);
  imageUrl = uploadData.image;
}

console.log("📌 Supplement image URL to save:", imageUrl);

await fetch(`${import.meta.env.VITE_API_URL}/add-supplement`,{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({
    gym_email:ownerEmail,
    name:form.name,
    price:form.price,
    image:imageUrl,
    description:form.description,
    stock_status:form.stock_status
  })
});

alert("Supplement added ✅");

}

setShowModal(false);
setEditId(null);
// refresh list
fetchSupplements();

}catch(err){

console.log(err);

}

};

return (

<div>

{/* Header */}

<div className="flex items-center justify-between mb-6">

<div>

<h2 className="text-2xl font-bold text-slate-200">
Supplement Management
</h2>

<p className="text-slate-200 mt-1">
{supplements.length} products in inventory
</p>

</div>

<button
onClick={openAdd}
className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
>

<svg
className="w-4 h-4"
fill="none"
stroke="currentColor"
viewBox="0 0 24 24"
>

<path
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth={2}
d="M12 4v16m8-8H4"
/>

</svg>

Add Supplement

</button>

</div>


{/* Supplements Grid */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

{supplements.map(s => (

<div
key={s.id}
className="relative z-10 bg-[#111827] rounded-xl shadow-sm border border-slate-800 overflow-hidden"
>

<div className="h-44 bg-[#111827] overflow-hidden">

<img
src={s.image}
alt="supplement"
className="w-full h-full object-cover"
/>

</div>

<div className="p-4">

<h3 className="font-bold text-slate-200">

{s.name}

</h3>

<p className="text-orange-500 font-bold text-lg mt-1">

₹{s.price}

</p>

<p className="text-slate-200 text-sm mt-2 line-clamp-2">

{s.description}

</p>

<div className="flex gap-2 mt-4">

<button
onClick={()=>openEdit(s)}
className="flex-1 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
>

Edit

</button>

<button
onClick={()=>handleDelete(s.id)}
className="flex-1 py-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors pointer-events-auto"
>
Delete
</button>

</div>

</div>

</div>

))}

</div>


{/* Add Modal */}

{showModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

<div className="bg-[#111827] rounded-2xl shadow-xl w-full max-w-md p-6">

<div className="flex items-center justify-between mb-5">

<h3 className="text-lg font-bold text-slate-200">

{editId ? "Edit Supplement" : "Add Supplement"}

</h3>

<button
onClick={()=>setShowModal(false)}
className="text-slate-200 hover:text-slate-600"
>

✕

</button>

</div>


<form
onSubmit={handleSubmit}
className="space-y-4"
>

<div>

<label className="block text-sm font-semibold text-slate-200 mb-1">

Supplement Name

</label>

<input
required
type="text"
value={form.name}
onChange={e=>setForm({...form,name:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
/>

</div>


<div>

<label className="block text-sm font-semibold text-slate-200 mb-1">

Price (₹)

</label>

<input
required
type="number"
value={form.price}
onChange={e=>setForm({...form,price:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500  text-slate-900"
/>

</div>


<div>

<label className="block text-sm font-semibold text-slate-200 mb-1">

Description

</label>

<textarea
rows={3}
value={form.description}
onChange={e=>setForm({...form,description:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
/>

</div>

<div>

<label className="block text-sm font-semibold text-slate-200 mb-1">
Stock Status
</label>

<select
value={form.stock_status}
onChange={(e)=>setForm({...form,stock_status:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
>

<option value="in_stock">In Stock</option>
<option value="out_of_stock">Out of Stock</option>

</select>

</div>

<div>

<label className="block text-sm font-semibold text-slate-200 mb-1">

Product Image

</label>

<div className="flex items-center gap-3">

{imagePreview && (
  <div className="flex flex-col items-center gap-1">
    <img
      src={imagePreview}
      alt="preview"
      className="w-16 h-16 rounded-lg object-cover"
    />

    <button
      type="button"
      onClick={handleRemoveImage}
      className="text-xs text-red-500 hover:underline"
    >
      Remove
    </button>
  </div>
)}

<label className="flex-1 text-center py-2 border-2 border-dashed border-slate-200 rounded-lg text-sm text-blue-600 font-medium cursor-pointer">

Upload Image

<input
type="file"
accept="image/png,image/jpeg,image/jpg,image/webp"
onChange={handleImageChange}
className="hidden"
/>

</label>

</div>

</div>


<div className="flex gap-3 pt-2">

<button
type="button"
onClick={()=>setShowModal(false)}
className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50"
>

Cancel

</button>

<button
type="submit"
className="flex-1 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-blue-700"
>

{editId ? "Update Supplement" : "Add Supplement"}

</button>

</div>

</form>

</div>

</div>

)}


{/* Orders table */}

<div className="mt-10">

<h3 className="text-xl font-bold text-slate-200 mb-4">

Supplement Orders

</h3>

<div className="bg-[#111827] rounded-xl border border-slate-800 overflow-hidden">

<table className="w-full text-sm">

<thead className="bg-slate-800 text-slate-200">

<tr>

<th className="px-4 py-3 text-left">Customer</th>

<th className="px-4 py-3 text-left">Supplement</th>

<th className="px-4 py-3 text-left">Qty</th>

<th className="px-4 py-3 text-left">Total</th>

<th className="px-4 py-3 text-left">Payment Method</th>

<th className="px-4 py-3 text-left">Status</th>

<th className="px-4 py-3 text-left">Date</th>

</tr>

</thead>

<tbody>

{orders.map(order => (

<tr key={order.id} className="border-t border-slate-800">

<td className="px-4 py-3 font-medium text-slate-200">
{order.user_email}
</td>

<td className="px-4 py-3 text-slate-200">
{order.supplement_name}
</td>

<td className="px-4 py-3">
{order.quantity}
</td>

<td className="px-4 py-3 font-semibold text-blue-600">
₹{order.price}
</td>

<td className="px-4 py-3">
{order.payment_method}
</td>

<td className="px-4 py-3">
{order.payment_status}
</td>

<td className="px-4 py-3">
{order.pickup_date || "Not set"}
</td>

<td className="px-4 py-3">

<button
onClick={()=>setPickupDate(order.id)}
className="bg-green-500 text-white px-2 py-1 rounded text-xs"

>

Set Pickup

</button>

</td>

</tr>

))}





</tbody>

</table>

</div>

</div>

</div>

);

};

export default SupplementManagement;