import React from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ gyms, selectedGym, onGymSelect }) => {
  const centerLat = 19.0760;
  const centerLng = 72.8777;

  return (
<div className="relative w-full h-full bg-muted rounded-lg overflow-visible">
      <iframe
       
        width="100%"
        height="100%"
        loading="lazy"
        title="Gym Locations Map"
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed`}
        className="border-0  pointer-events-auto"
      />
      <div className="absolute top-4 left-4 bg-card rounded-lg card-elevation-md p-3 max-w-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="MapPin" size={20} color="var(--color-primary)" />
          <span className="text-sm font-semibold text-foreground">
            {gyms?.length} gyms found nearby
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Showing gyms within your selected distance range
        </p>
      </div>
      <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
        <button
          className="bg-card p-2 rounded-md card-elevation-sm hover:card-elevation-md transition-smooth focus-ring"
          aria-label="Zoom in"
        >
          <Icon name="Plus" size={20} />
        </button>
        <button
          className="bg-card p-2 rounded-md card-elevation-sm hover:card-elevation-md transition-smooth focus-ring"
          aria-label="Zoom out"
        >
          <Icon name="Minus" size={20} />
        </button>
        <button
          className="bg-card p-2 rounded-md card-elevation-sm hover:card-elevation-md transition-smooth focus-ring"
          aria-label="Reset view"
        >
          <Icon name="Maximize2" size={20} />
        </button>
      </div>
    </div>
  );
};

export default MapView;