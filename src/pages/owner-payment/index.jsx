import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const OwnerPayment = () => {

  const navigate = useNavigate();

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

    const loaded = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!loaded) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {

      // 🔹 Step 1: Create order
      const orderRes = await fetch(
        "https://smartfit-backend-q4l6.onrender.com/payment/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: 4999 }),
        }
      );

      const orderData = await orderRes.json();

      if (!orderData.id) {
        alert("Order failed");
        return;
      }

      // 🔹 Step 2: Razorpay Options
      const options = {
        key: orderData.key,      // ✅ FIXED
        amount: orderData.amount,
        currency: orderData.currency,
        name: "SmartFit",
        description: "Gym Partnership Fee",
        order_id: orderData.id,

        handler: async function (response) {

          // 🔹 Step 3: Verify payment
          const verifyRes = await fetch(
            "https://smartfit-backend-q4l6.onrender.com/payment/verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(response),
            }
          );

          const verifyData = await verifyRes.json();

          if (verifyData.success) {
            localStorage.setItem("paymentStatus", "paid");
            navigate("/owner-dashboard");
          } else {
            alert("Payment verification failed ❌");
          }
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

      // 🔹 Step 4: Open popup
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      alert("Payment failed");
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
          Activate your gym listing with one-time payment.
        </p>

        <div className="mb-6">
          <p className="text-lg font-semibold">SmartFit Partnership Fee</p>
          <p className="text-4xl font-bold text-primary">₹4,999</p>
        </div>

        <Button onClick={handlePayment}>
          Pay Now
        </Button>

      </div>
    </div>
  );
};

export default OwnerPayment;