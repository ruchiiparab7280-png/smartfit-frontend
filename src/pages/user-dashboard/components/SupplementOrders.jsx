import React, { useEffect, useState } from "react";

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

const content = `
SmartFit Invoice

Gym: ${order.gym_name}

Supplement: ${order.supplement_name}

Price: ₹${order.price}

Payment: ${order.payment_status}

Pickup Date: ${order.pickup_date}
`

const blob = new Blob([content],{type:"text/plain"})

const url = URL.createObjectURL(blob)

const a = document.createElement("a")

a.href = url

a.download = "invoice.txt"

a.click()

}

export default SupplementOrders;
