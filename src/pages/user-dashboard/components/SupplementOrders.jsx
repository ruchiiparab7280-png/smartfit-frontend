import React from "react";

const SupplementOrders = () => {

const orders = [
{ name:"Whey Protein", gym:"FitZone", price:"₹2500", status:"Delivered" },
{ name:"Mass Gainer", gym:"Iron Gym", price:"₹1800", status:"Pending" }
]

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
<th className="py-2">Status</th>
</tr>

</thead>

<tbody className="text-foreground">

{orders.map((order,i)=>(

<tr key={i} className="border-b border-border">

<td className="py-2">{order.name}</td>

<td className="py-2">{order.gym}</td>

<td className="py-2">{order.price}</td>

<td className={`py-2 font-semibold ${
order.status === "Delivered" ? "text-green-500" :
"text-yellow-500"
}`}>

{order.status}

</td>

</tr>

))}

</tbody>

</table>

</div>

)

}

export default SupplementOrders;