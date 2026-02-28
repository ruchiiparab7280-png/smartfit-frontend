const handlePayment = async () => {

  try {

    // 1️⃣ Create Order from backend
    const res = await fetch("https://smartfit-backend-q4l6.onrender.com/payment/create-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const order = await res.json();

    // 2️⃣ Razorpay options
    const options = {
      key: "rzp_live_SLbPVWPsf30b5O",
      amount: order.amount,
      currency: order.currency,
      name: "SmartFit",
      description: "Gym Partnership",
      order_id: order.id,

      handler: async function (response) {

        // 3️⃣ Verify Payment
        const verifyRes = await fetch("https://smartfit-backend-q4l6.onrender.com/payment/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(response)
        });

        const verifyData = await verifyRes.json();

        if (verifyData.status === "success") {

          localStorage.setItem("paymentStatus", "paid");
          navigate("/owner-dashboard");

        } else {
          alert("Payment verification failed");
        }
      },

      theme: {
        color: "#ff7a00"
      }
    };

    // 4️⃣ Open Razorpay popup
    const rzp = new window.Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error(err);
    alert("Payment failed to start");
  }
};