import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MembershipCard = ({ membership, goToGyms }) => {

const getStatusColor = (status) => {
switch (status) {
case 'Active':
return 'bg-success/10 text-success border-success/20';
case 'Expiring Soon':
return 'bg-warning/10 text-warning border-warning/20';
case 'Expired':
return 'bg-error/10 text-error border-error/20';
default:
return 'bg-muted text-muted-foreground border-border';
}
};

const getDaysRemaining = (expiryDate) => {
const today = new Date();
const expiry = new Date(expiryDate);
const diffTime = expiry - today;
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
return diffDays;
};

const daysRemaining = getDaysRemaining(membership?.expiryDate);

return (

<div className="bg-card rounded-lg overflow-hidden border border-border">

{/* Gym Image */}

<div className="h-40 overflow-hidden relative">
<Image
src={membership?.gymImage}
alt="Gym"
className="w-full h-full object-cover"
/>

<div className="absolute top-3 right-3">
<span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(membership?.status)}`}>
{membership?.status}
</span>
</div>
</div>

{/* Card Content */}

<div className="p-6">

{/* Gym Name */}

<div className="flex items-center gap-2 mb-2">
<Icon name="Building" size={16}/>
<span className="font-semibold text-lg">{membership?.gymName}</span>
</div>

{/* Location */}

<div className="flex items-center gap-2 text-muted-foreground mb-4">
<Icon name="MapPin" size={16}/>
<span>{membership?.location}</span>
</div>

{/* Membership Details */}

<div className="space-y-3 mb-6">

<div className="flex justify-between">
<span className="text-muted-foreground flex items-center gap-2">
<Icon name="CreditCard" size={14}/>
Plan Type
</span>
<span className="font-semibold">{membership?.planType}</span>
</div>

<div className="flex justify-between">
<span className="text-muted-foreground flex items-center gap-2">
<Icon name="Calendar" size={14}/>
Start Date
</span>
<span className="font-semibold">{membership?.startDate}</span>
</div>

<div className="flex justify-between">
<span className="text-muted-foreground flex items-center gap-2">
<Icon name="CalendarCheck" size={14}/>
Expiry Date
</span>
<span className="font-semibold">{membership?.expiryDate}</span>
</div>

{daysRemaining > 0 && (

<div className="flex justify-between">
<span className="text-muted-foreground flex items-center gap-2">
<Icon name="Clock" size={14}/>
Days Remaining
</span>

<span className={`font-semibold ${daysRemaining <= 7 ? 'text-warning' : ''}`}>
{daysRemaining} days </span>

</div>
)}

</div>

{/* Buttons */}

<div className="flex gap-3">

{(membership?.status === 'Active' || membership?.status === 'Expiring Soon') ? (
<> <Button onClick={()=>goToGyms(membership?.gymEmail)}>
Renew
</Button>
<Button
variant="outline"
iconName="Eye"
iconPosition="left"

>

View </Button>
</>
) : (
<Button
iconName="RotateCcw"
iconPosition="left"
fullWidth
onClick={goToGyms}

>

Reactivate </Button>
)}

</div>

</div>
</div>
);
};

export default MembershipCard;
