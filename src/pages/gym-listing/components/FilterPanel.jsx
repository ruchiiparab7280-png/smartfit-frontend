import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ filters, onFilterChange, onResetFilters, isOpen, onToggle }) => {
  const handleDistanceChange = (e) => {
    onFilterChange({ ...filters, distance: parseInt(e?.target?.value) });
  };

  const handlePriceChange = (type, value) => {
    onFilterChange({
      ...filters,
      priceRange: { ...filters?.priceRange, [type]: parseInt(value) }
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const handleAmenityToggle = (amenity) => {
    const newAmenities = filters?.amenities?.includes(amenity)
      ? filters?.amenities?.filter(a => a !== amenity)
      : [...filters?.amenities, amenity];
    onFilterChange({ ...filters, amenities: newAmenities });
  };

  const amenityOptions = [
    { id: 'parking', label: 'Parking', icon: 'Car' },
    { id: 'locker', label: 'Locker Room', icon: 'Lock' },
    { id: 'shower', label: 'Shower', icon: 'Droplet' },
    { id: 'wifi', label: 'WiFi', icon: 'Wifi' },
    { id: 'ac', label: 'Air Conditioning', icon: 'Wind' },
    { id: 'trainer', label: 'Personal Trainer', icon: 'UserCheck' },
    { id: 'classes', label: 'Group Classes', icon: 'Users' },
    { id: 'pool', label: 'Swimming Pool', icon: 'Waves' }
  ];

  return (
    <div className={`bg-card rounded-lg border border-border transition-smooth ${isOpen ? 'block' : 'hidden'} lg:block`}>
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="SlidersHorizontal" size={20} className="mr-2" />
          Filters
        </h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          onClick={onResetFilters}
        >
          Reset
        </Button>
      </div>
      <div className="p-4 space-y-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Distance: {filters?.distance} km
          </label>
          <input
            type="range"
            min="1"
            max="50"
            value={filters?.distance}
            onChange={handleDistanceChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Price Range ($/month)
          </label>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Minimum</label>
              <input
                type="number"
                min="0"
                max="500"
                value={filters?.priceRange?.min}
                onChange={(e) => handlePriceChange('min', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Maximum</label>
              <input
                type="number"
                min="0"
                max="500"
                value={filters?.priceRange?.max}
                onChange={(e) => handlePriceChange('max', e?.target?.value)}
                className="w-full px-3 py-2 bg-background border border-input rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Minimum Rating
          </label>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5]?.map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition-base ${
                  filters?.minRating === rating
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {rating}★
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Amenities
          </label>
          <div className="space-y-2">
            {amenityOptions?.map((amenity) => (
              <Checkbox
                key={amenity?.id}
                label={
                  <span className="flex items-center">
                    <Icon name={amenity?.icon} size={16} className="mr-2" />
                    {amenity?.label}
                  </span>
                }
                checked={filters?.amenities?.includes(amenity?.id)}
                onChange={() => handleAmenityToggle(amenity?.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;