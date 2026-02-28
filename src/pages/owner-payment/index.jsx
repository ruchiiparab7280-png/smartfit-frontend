import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const OwnerPayment = () => {

  const navigate = useNavigate();

  const handlePayment = () => {

    // For now demo payment success
    localStorage.setItem("paymentStatus","paid");

    navigate("/owner-dashboard");
  };

 


  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="bg-card p-10 rounded-lg shadow-md text-center max-w-md">

        <Icon name="CreditCard" size={60} className="mx-auto text-primary mb-6" />

        <h2 className="text-2xl font-bold mb-4">
          Complete Your Partnership Payment
        </h2>

        <p className="text-muted-foreground mb-6">
          To activate your gym listing and access the Owner Dashboard,
          please complete the one-time partnership payment.
        </p>

        <div className="mb-6">
          <p className="text-lg font-semibold">
            SmartFit Partnership Fee
          </p>
          <p className="text-4xl font-bold text-primary">
            ₹4,999
          </p>
          <p className="text-sm text-muted-foreground">
            One-time activation
          </p>
        </div>

       <Button onClick={handlePayment}>Pay Now</Button>

      </div>
    </div>
  );
};

export default OwnerPayment;