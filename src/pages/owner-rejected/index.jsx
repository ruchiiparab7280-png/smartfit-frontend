import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Icon from "../../components/AppIcon";

const OwnerRejected = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">

      <div className="bg-card p-10 rounded-lg shadow-md text-center max-w-md">

        <div className="mb-6">
          <Icon name="XCircle" size={60} className="mx-auto text-red-500" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          ❌ Application Rejected
        </h2>

        <p className="text-muted-foreground mb-6">
          Unfortunately, your gym partnership request was not approved.
          <br /><br />
          Please contact support or apply again.
        </p>

        <Button onClick={() => navigate("/partner-with-us")}>
          Apply Again
        </Button>

      </div>

    </div>
  );
};

export default OwnerRejected;
