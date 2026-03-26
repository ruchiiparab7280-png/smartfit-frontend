import React, { useState, useEffect } from 'react';
import { normalizeImageUrl } from '../../../utils/gymImageUtils';

const emptyForm = { name: '', photo: '', specialization: '', pricePerSession: '' };

const TrainerManagement = () => {

const [trainers,setTrainers] = useState([]);
const [showModal,setShowModal] = useState(false);
const [editId,setEditId] = useState(null);
const [form,setForm] = useState(emptyForm);
const [photoPreview,setPhotoPreview] = useState('');

useEffect(() => {

  const fetchTrainers = async () => {

    try{

      const email = localStorage.getItem("userEmail");

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/trainers/${email}`
      );

      const data = await res.json();

      setTrainers(
        data.map((t)=>({
          id:t.id,
          name:t.name,
          photo:normalizeImageUrl(t.image) || '',
          specialization:t.specialization,
          pricePerSession:t.price
        }))
      );

    }catch(error){
      console.log("Trainer fetch error:",error);
    }

  };

  fetchTrainers();

},[]);

const openAdd = () => {
  setForm(emptyForm);
  setPhotoPreview('');
  setEditId(null);
  setShowModal(true);
};

const openEdit = (trainer) => {
  setForm({
    name:trainer?.name,
    photo:trainer?.photo,
    specialization:trainer?.specialization,
    pricePerSession:trainer?.pricePerSession
  });
  setPhotoPreview(trainer?.photo);
  setEditId(trainer?.id);
  setShowModal(true);
};

const handleDelete = async (id) => {

  try{

    await fetch(`${import.meta.env.VITE_API_URL}/trainer/${id}`,{
      method:"DELETE"
    });

    const email = localStorage.getItem("userEmail");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/trainers/${email}`
    );

    const data = await res.json();

    setTrainers(
      data.map((t)=>({
        id:t.id,
        name:t.name,
        photo:normalizeImageUrl(t.image) || '',
        specialization:t.specialization,
        pricePerSession:t.price
      }))
    );

  }catch(error){
    console.log("Delete trainer error:",error);
  }

};

const handlePhotoChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const allowedExts = new Set([".jpg", ".jpeg", ".png", ".webp"]);
  const allowedMimes = new Set(["image/jpeg", "image/png", "image/webp"]);

  const ext = file?.name?.toLowerCase().match(/\.[a-z0-9]+$/)?.[0];
  const isAllowed = ext && allowedExts.has(ext) && allowedMimes.has(file.type);

  if (!isAllowed) {
    alert("Invalid image type. Allowed: jpg, jpeg, png, webp");
    return;
  }

  if (photoPreview?.startsWith("blob:")) {
    URL.revokeObjectURL(photoPreview);
  }

  setForm((prev) => ({ ...prev, photo: file }));
  const previewUrl = URL.createObjectURL(file);
  setPhotoPreview(previewUrl);
  console.log("Trainer selected image file:", { name: file.name, type: file.type });

  // Allow selecting the same file again.
  e.target.value = "";
};

const handleSubmit = async (e) => {

  e.preventDefault();

  try {
    const email = localStorage.getItem("userEmail");
    let imageUrl = form.photo;

    // If user picked a new File, upload it; otherwise keep existing URL.
    if (form.photo instanceof File) {
      const fd = new FormData();
      fd.append("image", form.photo);

      const uploadRes = await fetch(`${import.meta.env.VITE_API_URL}/upload`, {
        method: "POST",
        body: fd,
      });
      const uploadData = await uploadRes.json();
      console.log("✅ Trainer upload response:", uploadData);
      imageUrl = normalizeImageUrl(uploadData.image) || uploadData.image;
    }

    if (!imageUrl) {
      alert("Please upload a trainer image");
      return;
    }

    if (editId) {
      await fetch(`${import.meta.env.VITE_API_URL}/update-trainer/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gym_email: email,
          name: form.name,
          specialization: form.specialization,
          price: Number(form.pricePerSession),
          image: imageUrl,
        }),
      });
    } else {
      await fetch(`${import.meta.env.VITE_API_URL}/add-trainer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          gym_email: email,
          name: form.name,
          specialization: form.specialization,
          price: Number(form.pricePerSession),
          image: imageUrl,
        }),
      });
    }

    const res = await fetch(`${import.meta.env.VITE_API_URL}/trainers/${email}`);
    const data = await res.json();

    setTrainers(
      data.map((t) => ({
        id: t.id,
        name: t.name,
        photo: normalizeImageUrl(t.image) || '',
        specialization: t.specialization,
        pricePerSession: t.price,
      }))
    );

    setShowModal(false);
  } catch (error) {
    console.log("Trainer save error:", error);
  }

};

const handleRemovePhoto = () => {
  if (photoPreview?.startsWith("blob:")) {
    URL.revokeObjectURL(photoPreview);
  }
  setPhotoPreview("");
  setForm((prev) => ({ ...prev, photo: "" }));
  console.log("Trainer image selection cleared");
};

return (

<div>

<div className="flex items-center justify-between mb-6">

<div>
<h2 className="text-2xl font-bold text-white">
Trainer Management
</h2>

<p className="text-slate-400 mt-1">
{trainers?.length} trainers in your gym
</p>

</div>

<button
onClick={openAdd}
className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
>

<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
</svg>

Add Trainer

</button>

</div>

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

{trainers?.map(trainer => (

<div
key={trainer?.id}
className="bg-[#111827] rounded-xl shadow-lg shadow-blue-900/40 border border-slate-800 p-5 flex flex-col items-center text-center"
>

<img
src={trainer?.photo || '/assets/images/no_image.png'}
alt={trainer?.name || 'Trainer'}
onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/no_image.png'; }}
className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 mb-3"
/>

<h3 className="font-bold text-white text-base">
{trainer?.name}
</h3>

<span className="text-xs text-blue-600 font-medium bg-blue-50 px-2 py-1 rounded-full mt-1">
{trainer?.specialization}
</span>

<p className="text-slate-300 text-sm mt-2 font-semibold">
₹{trainer?.pricePerSession}
<span className="font-normal text-slate-500">
/session
</span>
</p>

<div className="flex gap-2 mt-4 w-full">

<button
onClick={()=>openEdit(trainer)}
className="flex-1 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
>
Edit
</button>

<button
onClick={()=>handleDelete(trainer?.id)}
className="flex-1 py-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
>
Delete
</button>

</div>

</div>

))}

</div>

{showModal && (

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

<div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

<div className="flex items-center justify-between mb-5">

<h3 className="text-lg font-bold text-slate-800">
{editId ? 'Edit Trainer' : 'Add New Trainer'}
</h3>

<button
onClick={()=>setShowModal(false)}
className="text-slate-900 hover:text-slate-600"
>
✕
</button>

</div>

<form onSubmit={handleSubmit} className="space-y-4">

<div className="flex flex-col items-center gap-3">

<div className="w-20 h-20 rounded-full bg-slate-100 overflow-hidden border-2 border-slate-200">

{photoPreview ? (
<>
  <img src={photoPreview} className="w-full h-full object-cover" />
  <button
    type="button"
    onClick={handleRemovePhoto}
    className="mt-2 w-full text-xs text-red-500 hover:underline"
  >
    Remove
  </button>
</>
):null}

</div>

<label className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">

Upload Photo

<input
type="file"
accept="image/png,image/jpeg,image/jpg,image/webp"
onChange={handlePhotoChange}
className="hidden"
/>

</label>

</div>

<div>

<label className="block text-sm font-semibold text-slate-700 mb-1">
Trainer Name
</label>

<input
required
type="text"
value={form?.name}
onChange={(e)=>setForm({...form,name:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
/>

</div>

<div>

<label className="block text-sm font-semibold text-slate-700 mb-1">
Specialization
</label>

<input
required
type="text"
value={form?.specialization}
onChange={(e)=>setForm({...form,specialization:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
/>

</div>

<div>

<label className="block text-sm font-semibold text-slate-700 mb-1">
Price per Session (₹)
</label>

<input
required
type="number"
min="0"
value={form?.pricePerSession}
onChange={(e)=>setForm({...form,pricePerSession:e.target.value})}
className="w-full px-4 py-2.5 rounded-lg border border-slate-200 text-slate-800"
/>

</div>

<div className="flex gap-3 pt-2">

<button
type="button"
onClick={()=>setShowModal(false)}
className="flex-1 py-2.5 border border-slate-200 text-slate-900 font-semibold rounded-lg hover:bg-slate-50"
>
Cancel
</button>

<button
type="submit"
className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
>
{editId ? 'Save Changes' : 'Add Trainer'}
</button>

</div>

</form>

</div>

</div>

)}

</div>

);

};

export default TrainerManagement;