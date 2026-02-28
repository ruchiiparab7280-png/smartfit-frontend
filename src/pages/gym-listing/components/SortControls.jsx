import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange, resultsCount }) => {
  const sortOptions = [
    { value: 'distance', label: 'Distance (Nearest First)' },
    { value: 'rating', label: 'Rating (Highest First)' },
    { value: 'price-low', label: 'Price (Low to High)' },
    { value: 'price-high', label: 'Price (High to Low)' },
    { value: 'members', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' }
  ];

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
      <div className="flex items-center space-x-2">
        <Icon name="Filter" size={18} color="var(--color-muted-foreground)" />
        <span className="text-sm text-muted-foreground">
          {resultsCount} {resultsCount === 1 ? 'gym' : 'gyms'} found
        </span>
      </div>

      <div className="flex items-center space-x-3 w-full sm:w-auto">
        <div className="flex-1 sm:flex-initial sm:w-64">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            placeholder="Sort by..."
          />
        </div>

        <div className="hidden md:flex items-center space-x-1 bg-muted rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('grid')}
            className={`p-2 rounded-md transition-base ${
              viewMode === 'grid' ?'bg-card text-foreground card-elevation-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Grid view"
          >
            <Icon name="LayoutGrid" size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`p-2 rounded-md transition-base ${
              viewMode === 'list' ?'bg-card text-foreground card-elevation-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="List view"
          >
            <Icon name="List" size={18} />
          </button>
          <button
            onClick={() => onViewModeChange('map')}
            className={`p-2 rounded-md transition-base ${
              viewMode === 'map' ?'bg-card text-foreground card-elevation-sm' :'text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Map view"
          >
            <Icon name="Map" size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;