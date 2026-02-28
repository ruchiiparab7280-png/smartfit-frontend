import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const OwnerApproved = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="bg-card p-10 rounded-lg shadow-md text-center max-w-md">

        <div className="mb-6">
          <Icon name="CheckCircle" size={60} className="mx-auto text-green-500" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          🎉 Congratulations!
        </h2>

        <p className="text-muted-foreground mb-6">
          Your Gym Partnership has been <b>Approved</b> ✅ <br /><br />
          You can now login and complete your gym details from your dashboard.
        </p>

<Button onClick={() => navigate("/owner-payment")}>
  Complete Payment
</Button>

      </div>

    </div>
  );
};

export default OwnerApproved;
