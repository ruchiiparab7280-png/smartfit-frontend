import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const SupplementOrders = () => {

const [orders,setOrders] = useState([])

useEffect(()=>{

const fetchOrders = async () => {

const email = localStorage.getItem("userEmail")

const res = await fetch(
`${import.meta.env.VITE_API_URL}/user-supplement-orders/${email}`
)

const data = await res.json()

setOrders(data)

}

fetchOrders()

},[])

return (

<div className="bg-card p-6 rounded-xl border border-border shadow">

<h2 className="text-xl font-bold mb-4 text-foreground">
Supplement Orders
</h2>

<table className="w-full text-left">

<thead className="border-b border-border text-muted-foreground">

<tr>
<th className="py-2">Supplement</th>
<th className="py-2">Gym</th>
<th className="py-2">Price</th>
<th className="py-2">Payment</th>
<th className="py-2">Pickup Date</th>
<th className="py-2">Invoice</th>
</tr>

</thead>

<tbody className="text-foreground">

{orders.map((order)=> (

<tr key={order.id} className="border-b border-border">

<td className="py-2">
{order.supplement_name}
</td>

<td className="py-2">
{order.gym_name}
</td>

<td className="py-2">
₹{order.price}
</td>

<td className={`py-2 font-semibold ${
order.payment_status === "paid"
? "text-green-500"
: "text-yellow-500"
}`}>
{order.payment_status}
</td>

<td className="py-2">
{order.pickup_date || "Waiting for owner"}
</td>

<td className="py-2">

{order.payment_status === "paid" ? (

<button
onClick={()=>downloadInvoice(order)}
className="bg-blue-500 text-white px-3 py-1 rounded text-xs"

>

Download

</button>

):(

<span className="text-gray-400 text-xs">
No Invoice
</span>

)}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

const downloadInvoice = (order) => {

const doc = new jsPDF()

// Title
doc.setFontSize(20)
doc.text("SmartFit Invoice", 20, 20)

// Divider
doc.setLineWidth(0.5)
doc.line(20, 25, 190, 25)

// Order info
doc.setFontSize(12)

doc.text(`Order ID: ${order.id}`,20,40)

doc.text(`Gym: ${order.gym_name}`,20,50)

doc.text(`Supplement: ${order.supplement_name}`,20,60)

doc.text(`Price: ₹${order.price}`,20,70)

doc.text(`Quantity: ${order.quantity}`,20,80)

doc.text(`Payment Status: ${order.payment_status}`,20,90)

doc.text(`Pickup Date: ${order.pickup_date || "Not set"}`,20,100)

doc.text(`Customer: ${order.user_email}`,20,110)

// Footer
doc.setFontSize(10)

doc.text(
"Thank you for purchasing from SmartFit!",
20,
140
)

doc.text(
"SmartFit Fitness Platform",
20,
150
)

doc.save(`smartfit-invoice-${order.id}.pdf`)

}


export default SupplementOrders;
