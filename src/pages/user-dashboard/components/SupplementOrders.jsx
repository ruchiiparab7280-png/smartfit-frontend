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

// Invoice title
doc.setFont("helvetica","bold")
doc.setFontSize(22)
doc.text("SmartFit Invoice",20,20)

// divider line
doc.setLineWidth(0.5)
doc.line(20,25,190,25)

// invoice date
const now = new Date()
const date = now.toLocaleDateString()
const time = now.toLocaleTimeString()

doc.setFont("helvetica","normal")
doc.setFontSize(11)

doc.text(`Invoice Date: ${date}`,150,35)
doc.text(`Time: ${time}`,150,42)

// table headers
doc.setFont("helvetica","bold")

let y = 60

doc.text("Item",20,y)
doc.text("Gym",60,y)
doc.text("Qty",110,y)
doc.text("Price",130,y)
doc.text("Payment",160,y)

doc.line(20,y+2,190,y+2)

// table data
doc.setFont("helvetica","normal")

y += 12

doc.text(order.supplement_name,20,y)
doc.text(order.gym_name,60,y)
doc.text(String(order.quantity),110,y)
doc.text(`₹ ${order.price}`,130,y)
doc.text(order.payment_status,160,y)

y += 15

// pickup info
doc.setFont("helvetica","bold")
doc.text("Pickup Date:",20,y)

doc.setFont("helvetica","normal")
doc.text(order.pickup_date || "Not set",60,y)

y += 10

doc.setFont("helvetica","bold")
doc.text("Customer:",20,y)

doc.setFont("helvetica","normal")
doc.text(order.user_email,60,y)

// footer
doc.setFontSize(10)

doc.text(
`Thank you for purchasing from ${order.gym_name}!`,
20,
170
)

doc.text(
"SmartFit Fitness Platform",
20,
180
)

doc.save(`smartfit-invoice-${order.id}.pdf`)

}



export default SupplementOrders;
