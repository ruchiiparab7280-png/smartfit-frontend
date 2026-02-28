import React from 'react';
import { useNavigate } from "react-router-dom";
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const GymCard = ({ gym, onViewDetails, onContact }) => {

  const navigate = useNavigate();

  // 🔐 Login Check Function
  const checkLoginAndProceed = (action) => {
    const isAuth = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuth) {
      alert("Please signup/login first to continue");
      navigate("/sign-in-sign-up");
      return;
    }

    action();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name={index < Math.floor(rating) ? 'Star' : 'StarOff'}
        size={16}
        color={index < Math.floor(rating) ? '#F59E0B' : '#D1D5DB'}
        className="fill-current"
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg overflow-hidden card-elevation-md hover-lift transition-smooth border border-border">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={gym?.image}
          alt={gym?.imageAlt}
          className="w-full h-full object-cover"
        />
        {gym?.featured && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-md text-sm font-medium">
            Featured
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium">
          {gym?.distance} km away
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {gym?.name}
          </h3>
          <div className="flex items-center space-x-1 ml-2">
            {renderStars(gym?.rating)}
          </div>
        </div>

        <div className="flex items-center text-muted-foreground text-sm mb-3">
          <Icon name="MapPin" size={16} className="mr-1" />
          <span className="line-clamp-1">{gym?.address}</span>
        </div>

        <div className="flex items-center justify-between mb-3 pb-3 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Users" size={16} className="mr-1" />
              <span>{gym?.members}+ members</span>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="Clock" size={16} className="mr-1" />
              <span>{gym?.openTime}</span>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <div className="flex flex-wrap gap-2">
            {gym?.amenities?.slice(0, 3)?.map((amenity, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
              >
                <Icon name={amenity?.icon} size={12} className="mr-1" />
                {amenity?.name}
              </span>
            ))}
            {gym?.amenities?.length > 3 && (
              <span className="inline-flex items-center px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs">
                +{gym?.amenities?.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="text-xl font-bold text-primary">₹{gym?.price}/month</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Rating</p>
            <p className="text-lg font-semibold text-foreground">
              {gym?.rating} ({gym?.reviews})
            </p>
          </div>
        </div>

        {/* 🔒 Protected Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Phone"
            iconPosition="left"
            onClick={() =>
              checkLoginAndProceed(() => onContact(gym))
            }
          >
            Contact
          </Button>

          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={() =>
              checkLoginAndProceed(() => onViewDetails(gym))
            }
          >
            View Details
          </Button>
        </div>

      </div>
    </div>
  );
};

export default GymCard;