import React, { useState, useEffect} from 'react';



const initialSupplements = [
{ id: 1, name: 'Whey Protein Gold', price: 59.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1aacf124c-1773068342201.png", description: 'Premium whey protein isolate with 25g protein per serving. Chocolate and vanilla flavors available.' },
{ id: 2, name: 'Creatine Monohydrate', price: 29.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bcabe25d-1773068341904.png", description: 'Pure micronized creatine for strength and power gains. Unflavored, mixes easily.' },
{ id: 3, name: 'Pre-Workout Blast', price: 44.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_1cf835714-1773068348655.png", description: 'High-energy pre-workout formula with caffeine, beta-alanine, and citrulline.' },
{ id: 4, name: 'BCAA Recovery', price: 34.99, image: "https://img.rocket.new/generatedImages/rocket_gen_img_15057c248-1773068340616.png", description: 'Branched-chain amino acids for muscle recovery and reduced soreness.' }];


const emptyForm = { name: '', price: '', description: '', image: '' };

const supplementOrders = [
{
id: 101,
customer: "Rahul Sharma",
supplement: "Whey Protein Gold",
quantity: 1,
total: 59.99,
paymentMethod: "Online",
paymentStatus: "Paid",
date: "12 Mar 2026"
},
{
id: 102,
customer: "Aman Verma",
supplement: "Creatine Monohydrate",
quantity: 2,
total: 59.98,
paymentMethod: "Cash on Purchase",
paymentStatus: "Pending",
date: "13 Mar 2026"
},
{
id: 103,
customer: "Priya Patel",
supplement: "BCAA Recovery",
quantity: 1,
total: 34.99,
paymentMethod: "Online",
paymentStatus: "Paid",
date: "14 Mar 2026"
}
];

const SupplementManagement = () => {
  const [supplements, setSupplements] = useState([]);

useEffect(() => {

  const fetchSupplements = async () => {

    const ownerEmail = localStorage.getItem("email");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/supplements/${ownerEmail}`
    );

    const data = await res.json();

    setSupplements(data);

  };

  fetchSupplements();

}, []);

  const [orders] = useState(supplementOrders);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imagePreview, setImagePreview] = useState('');

  const openAdd = () => {
    setForm(emptyForm);
    setImagePreview('');
    setEditId(null);
    setShowModal(true);
  };

  const openEdit = (s) => {
    setForm({ name: s?.name, price: s?.price, description: s?.description, image: s?.image });
    setImagePreview(s?.image);
    setEditId(s?.id);
    setShowModal(true);
  };

  const handleDelete = (id) => setSupplements(supplements?.filter((s) => s?.id !== id));

  const handleImageChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setForm((prev) => ({ ...prev, image: url }));
    }
  };
  const ownerEmail = localStorage.getItem("email");
  const handleSubmit = async (e) => {

  e.preventDefault();

  try {

    const ownerEmail = localStorage.getItem("email");

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/add-supplement`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          gym_email: ownerEmail,
          name: form.name,
          price: form.price,
          image: imagePreview,
          description: form.description
        })
      }
    );

    const data = await res.json();

    alert("Supplement added ✅");

    setShowModal(false);

  } catch (err) {

    console.log(err);

  }

};

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Supplement Management</h2>
          <p className="text-slate-500 mt-1">{supplements?.length} products in inventory</p>
        </div>
        <button onClick={openAdd} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Supplement
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {supplements?.map((s) =>
        <div key={s?.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="h-44 bg-slate-100 overflow-hidden">
              <img src={s?.image} alt={`${s?.name} supplement product`} className="w-full h-full object-cover" />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-800">{s?.name}</h3>
              <p className="text-blue-600 font-bold text-lg mt-1">${s?.price}</p>
              <p className="text-slate-500 text-sm mt-2 line-clamp-2">{s?.description}</p>
              <div className="flex gap-2 mt-4">
                <button onClick={() => openEdit(s)} className="flex-1 py-1.5 text-sm font-medium text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
                  Edit
                </button>
                <button onClick={() => handleDelete(s?.id)} className="flex-1 py-1.5 text-sm font-medium text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showModal &&
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-slate-800">{editId ? 'Edit Supplement' : 'Add Supplement'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Supplement Name</label>
                <input required type="text" value={form?.name} onChange={(e) => setForm({ ...form, name: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Price ($)</label>
                <input required type="number" min="0" step="0.01" value={form?.price} onChange={(e) => setForm({ ...form, price: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Description</label>
                <textarea rows={3} value={form?.description} onChange={(e) => setForm({ ...form, description: e?.target?.value })} className="w-full px-4 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Product Image</label>
                <div className="flex items-center gap-3">
                  {imagePreview && <img src={imagePreview} alt="Supplement product preview" className="w-16 h-16 rounded-lg object-cover border border-slate-200" />}
                  <label className="flex-1 text-center py-2 border-2 border-dashed border-slate-200 rounded-lg text-sm text-blue-600 font-medium cursor-pointer hover:border-blue-400 transition-colors">
                    Upload Image
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  </label>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-slate-200 text-slate-600 font-semibold rounded-lg hover:bg-slate-50 transition-colors">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors">{editId ? 'Save Changes' : 'Add Supplement'}</button>
              </div>
              
            </form>
          </div>
          
        </div>
}

{/* Supplement Orders */}

<div className="mt-10">
<h3 className="text-xl font-bold text-slate-800 mb-4">
Supplement Orders
</h3>

<div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
<table className="w-full text-sm">

<thead className="bg-slate-100 text-slate-600">
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
{orders?.map(order => (
<tr key={order?.id} className="border-t border-slate-100">

<td className="px-4 py-3 font-medium text-slate-700">
{order?.customer}
</td>

<td className="px-4 py-3 text-slate-600">
{order?.supplement}
</td>

<td className="px-4 py-3">
{order?.quantity}
</td>

<td className="px-4 py-3 font-semibold text-blue-600">
${order?.total}
</td>

<td className="px-4 py-3">
{order?.paymentMethod}
</td>

<td className="px-4 py-3">
<span className={`px-2 py-1 text-xs rounded-full font-medium ${
order?.paymentStatus === "Paid"
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}>
{order?.paymentStatus}
</span>
</td>

<td className="px-4 py-3 text-slate-500">
{order?.date}
</td>

</tr>
))}
</tbody>

</table>
</div>
</div>
        
      
    </div>);

};

export default SupplementManagement;