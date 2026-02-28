import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const OwnerPayment = () => {

  const navigate = useNavigate();

  // Razorpay Script Loader
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {

    // Step 1: Load Razorpay SDK
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {

      // Step 2: Create order from backend
      const orderRes = await fetch(
        "https://smartfit-backend-q4l6.onrender.com/payment/create-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: 4999 }),
        }
      );

      const data = await orderRes.json();

      // Step 3: Razorpay popup options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: data.amount,
        currency: data.currency,
        name: "SmartFit",
        description: "Gym Partnership Fee",
        order_id: data.id,

        handler: function (response) {

          console.log("Payment Success:", response);

          localStorage.setItem("paymentStatus", "paid");

          navigate("/owner-dashboard");
        },

        prefill: {
          name: "Gym Owner",
          email: "owner@test.com",
          contact: "9999999999",
        },

        theme: {
          color: "#6366f1",
        },
      };

      // Step 4: Open Razorpay Popup
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Something went wrong!");
    }
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

        <Button onClick={handlePayment}>
          Pay Now
        </Button>

      </div>
    </div>
  );
};

export default OwnerPayment;