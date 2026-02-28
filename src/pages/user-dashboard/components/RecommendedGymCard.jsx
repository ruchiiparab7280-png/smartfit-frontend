import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecommendedGymCard = ({ gym }) => {
  return (
    <div className="bg-card rounded-lg overflow-hidden card-elevation-sm border border-border hover:card-elevation-md transition-smooth">
      <div className="h-48 overflow-hidden relative">
        <Image 
          src={gym?.image} 
          alt={gym?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-card/95 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
          <Icon name="Star" size={14} color="var(--color-warning)" />
          <span className="text-sm font-semibold text-foreground">{gym?.rating}</span>
        </div>
        {gym?.featured && (
          <div className="absolute top-3 left-3 bg-primary px-3 py-1 rounded-full">
            <span className="text-xs font-semibold text-primary-foreground">Featured</span>
          </div>
        )}
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2">{gym?.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <Icon name="MapPin" size={14} />
          {gym?.location}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="Navigation" size={14} />
            <span>{gym?.distance}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="DollarSign" size={14} />
            <span>{gym?.priceRange}</span>
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Icon name="Users" size={14} />
            <span>{gym?.members}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {gym?.amenities?.slice(0, 3)?.map((amenity, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-muted/50 text-xs font-medium text-foreground rounded-md"
            >
              {amenity}
            </span>
          ))}
          {gym?.amenities?.length > 3 && (
            <span className="px-2 py-1 bg-muted/50 text-xs font-medium text-muted-foreground rounded-md">
              +{gym?.amenities?.length - 3} more
            </span>
          )}
        </div>

        <div className="flex gap-2">
          <Link to="/gym-listing" className="flex-1">
            <Button variant="default" size="sm" fullWidth iconName="Eye" iconPosition="left">
              View Details
            </Button>
          </Link>
          <Button variant="outline" size="sm" iconName="Heart" iconPosition="left">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendedGymCard;