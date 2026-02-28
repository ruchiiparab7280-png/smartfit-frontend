import React from "react";
import Icon from "../../../components/AppIcon";

const CommissionStructure = () => {
  return (
    <div className="bg-card rounded-lg p-8 card-elevation-sm">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-foreground mb-3">
          SmartFit Growth Partnership
        </h2>
        <p className="text-muted-foreground text-lg">
          Built for gym owners who want visibility, bookings & growth
        </p>
      </div>

      {/* CENTERED GRID LIKE BENEFITS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">

        {/* Empty for spacing */}
        <div className="hidden md:block"></div>

        {/* MAIN CARD */}
        <div className="w-full max-w-md border-2 border-primary rounded-lg p-6 text-center relative">

          {/* Recommended Badge */}
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
            Recommended
          </div>

         <h3 className="text-lg font-semibold text-foreground mb-1">
  SmartFit Partnership
</h3>

<p className="text-xs text-muted-foreground mb-4">
  One-time onboarding fee
</p>

<p className="text-4xl font-bold text-primary mb-6">
  ₹4,999
</p>

<ul className="space-y-2 text-sm text-muted-foreground text-left mx-auto max-w-xs">
  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Gym listing on SmartFit marketplace
  </li>

  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Access to Owner Dashboard
  </li>

  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Lead generation & booking system
  </li>

  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Performance analytics insights
  </li>

  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Marketing visibility boost
  </li>

  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Dedicated onboarding support
  </li>

  <li className="flex items-start">
    <Icon name="Check" size={16} className="mr-2 mt-0.5 text-green-500" />
    Only 10% commission per booking
  </li>
</ul>
</div>

        {/* Empty for spacing */}
        <div className="hidden md:block"></div>

      </div>

      {/* DETAILS BOX */}
      <div className="mt-10 p-6 bg-muted/30 rounded-lg max-w-md mx-auto">
        <div className="flex items-start">
          <Icon name="Info" size={22} className="mr-3 mt-1 text-primary" />
          <div>
            <h4 className="font-semibold mb-2">Partnership Details</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• No monthly charges</li>
              <li>• One-time onboarding fee</li>
              <li>• 10% commission on successful bookings</li>
              <li>• Payments settled within 3-5 days</li>
              <li>• Cancel anytime</li>
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
};

export default CommissionStructure;