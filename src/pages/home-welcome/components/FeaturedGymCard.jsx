import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedGymCard = ({ gym }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-card rounded-lg overflow-hidden card-elevation-sm hover:card-elevation-md transition-smooth hover-lift">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={gym?.image}
          alt={gym?.imageAlt}
          className="w-full h-full object-cover"
        />
        {gym?.featured && (
          <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {gym?.name}
            </h3>
            <div className="flex items-center text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} className="mr-1" />
              <span>{gym?.location}</span>
            </div>
          </div>
          <div className="flex items-center bg-accent/10 px-2 py-1 rounded">
            <Icon name="Star" size={14} color="var(--color-accent)" className="mr-1" />
            <span className="text-sm font-semibold text-accent">{gym?.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {gym?.amenities?.slice(0, 3)?.map((amenity, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
            >
              {amenity}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div>
            <div className="text-xs text-muted-foreground">Starting from</div>
            <div className="text-xl font-bold text-primary"> ₹{gym?.price}<span className="text-sm font-normal text-muted-foreground">/mo</span></div>
          </div>
          <Button
            variant="default"
            size="sm"
            iconName="ArrowRight"
            iconPosition="right"
            onClick={() => navigate('/gym-listing')}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedGymCard;