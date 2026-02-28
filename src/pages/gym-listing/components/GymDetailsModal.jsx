import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from "react-router-dom";

  const GymDetailsModal = ({ gym, isOpen, onClose }) => {
  const navigate = useNavigate();
  const [showPlanSelect, setShowPlanSelect] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const savedProtein = JSON.parse(localStorage.getItem("gymProtein"));
  const savedTrainer = JSON.parse(localStorage.getItem("gymTrainer"));

  if (!isOpen || !gym) return null;

  const plans = [
  { name: "Basic", price: 999, duration: "1 Month" },
  { name: "Standard", price: 2499, duration: "3 Months" },
  { name: "Premium", price: 4499, duration: "6 Months" }
];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'Star' : 'StarOff'}
        size={18}
        color={index < Math.floor(rating) ? '#F59E0B' : '#D1D5DB'}
      />
    ));
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black/60" onClick={onClose} />

        <div className="relative bg-card rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">

          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-background p-2 rounded-full"
          >
            <Icon name="X" size={20} />
          </button>

          {/* IMAGE */}
          <div className="h-64 overflow-hidden">
            <Image
              src={gym?.image}
              alt={gym?.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-6">

            <h2 className="text-2xl font-bold mb-2">{gym?.name}</h2>

            <div className="flex items-center mb-2">
              {renderStars(gym?.rating)}
              <span className="ml-2 text-sm">{gym?.rating}</span>
            </div>

            <p className="text-muted-foreground mb-4">{gym?.description}</p>

            {/* MEMBERSHIP */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Membership Plans</h3>
              {plans.map((plan, index) => (
                <div
  key={index}
  className="p-3 mb-2 rounded bg-orange-500 text-white font-semibold"
>
                 <p className="font-bold text-white">
                    ₹{plan?.price}/{plan?.duration}
                  </p>
                  <p>{plan?.name}</p>
                </div>
              ))}
            </div>

            {/* FREE TRIAL */}
            <div className="mb-6 bg-gray-800 p-4 rounded-xl">
              <h3 className="text-lg font-semibold text-white mb-2">
                Free Trial
              </h3>
              <p className="text-green-400 mb-2">
                1 Day Free Trial Available
              </p>
              <button
                onClick={() => {
  const trialRequest = {
    user: localStorage.getItem("userName"),
    gym: gym.name,
    status: "pending"
  };

  localStorage.setItem("trialRequest", JSON.stringify(trialRequest));
  alert("Trial Request Sent!");
}}

                className="bg-orange-500 px-4 py-2 rounded"
              >
                Book Free Trial
              </button>
            </div>

            {/* TRAINERS */}
           <div className="mb-6 bg-gray-800 p-4 rounded-xl">
  <h3 className="text-lg font-semibold text-white mb-3">
    Available Trainers
  </h3>

  {savedTrainer ? (
    <div>
      <p className="text-white font-semibold">{savedTrainer.name}</p>
      <p className="text-orange-400">₹{savedTrainer.price} / session</p>

      {savedTrainer.image && (
        <img src={savedTrainer.image} alt="trainer" className="w-32 mt-2 rounded" />
      )}

      <button
        onClick={() => {
  const trainerRequest = {
    user: localStorage.getItem("userName"),
    trainer: savedTrainer.name,
    status: "pending"
  };

  localStorage.setItem("trainerRequest", JSON.stringify(trainerRequest));
  alert("Trainer Booking Sent!");
}}

        className="bg-orange-500 px-3 py-1 rounded mt-2"
      >
        Book Trainer
      </button>
    </div>
  ) : (
    <p className="text-gray-400">No Trainer Added Yet</p>
  )}
</div>

            {/* SUPPLEMENTS */}
            <div className="mb-6 bg-gray-800 p-4 rounded-xl">
  <h3 className="text-lg font-semibold text-white mb-3">
    Supplements Available
  </h3>

  {savedProtein ? (
    <div>
      <p className="text-white font-semibold">{savedProtein.name}</p>
      <p className="text-orange-400">₹{savedProtein.price}</p>

      {savedProtein.image && (
        <img src={savedProtein.image} alt="protein" className="w-32 mt-2 rounded" />
      )}

      <button
  onClick={() =>
    navigate("/checkout", {
      state: {
        gym: gym,
        plan: {
          name: savedProtein.name,
          price: savedProtein.price,
          duration: "Supplement Purchase"
        }
      }
    })
  }
  className="bg-orange-500 px-3 py-1 rounded mt-2"
>
  Buy Now
</button>
    </div>
  ) : (
    <p className="text-gray-400">No Supplements Added Yet</p>
  )}
</div>
            {/* CONTACT */}
            <div className="flex gap-3">
              <Button
                fullWidth
                onClick={() => setShowPlanSelect(true)}
              >
                Book Now
              </Button>

              <Button variant="outline" fullWidth>
                Call Now
              </Button>
            </div>

          </div>
        </div>
      </div>

      {/* PLAN SELECT POPUP */}
      {showPlanSelect && (
  <div className="fixed inset-0 flex items-center justify-center z-50">

    {/* Background Blur */}
    <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
          <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-xl text-center w-80 border border-white/20 shadow-xl">

            <h3 className="text-xl font-bold mb-4 text-white">
  Choose Membership Plan
</h3>

            {plans.map((plan, index) => (
              <button
                key={index}
                onClick={() => {
  setShowPlanSelect(false);

  navigate("/checkout", {
    state: {
      gym: gym,
      plan: plan
    }
  });
}}
                className="block w-full p-3 mb-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition shadow-md hover:scale-105"
              >
                ₹{plan?.price} / {plan?.duration}
              </button>
            ))}

            <button
              onClick={() => setShowPlanSelect(false)}
              className="border border-white px-4 py-2 rounded-lg text-white hover:bg-white/10 transition"
            >
              Cancel
            </button>

          </div>
        </div>
      )}
    </>
  );
};

export default GymDetailsModal;