import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/ui/Button";
import Icon from "../components/AppIcon";

const ApprovalPending = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/sign-in-sign-up");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="bg-card p-10 rounded-lg shadow-md text-center max-w-md">

        <div className="mb-6">
          <Icon name="Clock" size={60} className="mx-auto text-yellow-500" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Approval Pending ⏳
        </h2>

        <p className="text-muted-foreground mb-6">
          Your gym partnership request is currently under review by our admin team.
          <br /><br />
          You will get access to the Owner Dashboard once approved.
        </p>

        <Button onClick={handleLogout}>
          Logout
        </Button>

      </div>

    </div>
  );
};

export default ApprovalPending;
