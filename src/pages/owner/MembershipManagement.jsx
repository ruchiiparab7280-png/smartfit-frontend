import React from "react";
import MainNavigation from "../../components/MainNavigation";

const MembershipManagement = () => {

return(

<div className="min-h-screen bg-background">

<MainNavigation/>

<div className="container-custom pt-24">

<h1 className="text-4xl font-bold text-orange-400">
Membership Management
</h1>

<p className="mt-6 opacity-70">
Create and manage gym membership plans.
</p>

</div>

</div>

);

};

export default MembershipManagement;