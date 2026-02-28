import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, onFilterToggle, showFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const suggestions = [
    { id: 1, text: 'Gyms with swimming pool', icon: 'Waves' },
    { id: 2, text: 'Personal training available', icon: 'UserCheck' },
    { id: 3, text: '24/7 access gyms', icon: 'Clock' },
    { id: 4, text: 'Yoga and pilates classes', icon: 'Activity' },
    { id: 5, text: 'CrossFit facilities', icon: 'Dumbbell' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
    setShowSuggestions(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
    setShowSuggestions(e?.target?.value?.length > 0);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.text);
    onSearch(suggestion?.text);
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="flex space-x-2">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Icon name="Search" size={20} color="var(--color-muted-foreground)" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(searchQuery?.length > 0)}
            placeholder="Search gyms by name, location, or amenities..."
            className="w-full pl-10 pr-4 py-3 bg-card border border-input rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-base"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setShowSuggestions(false);
                onSearch('');
              }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-base"
            >
              <Icon name="X" size={18} />
            </button>
          )}
        </div>
        
        <Button
          type="submit"
          variant="default"
          iconName="Search"
          iconPosition="left"
          className="hidden sm:flex"
        >
          Search
        </Button>

        <Button
          type="button"
          variant="outline"
          iconName="SlidersHorizontal"
          onClick={onFilterToggle}
          className="lg:hidden"
        >
          {showFilters ? 'Hide' : 'Filters'}
        </Button>
      </form>
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg card-elevation-md z-50 overflow-hidden">
          <div className="p-2">
            <p className="text-xs text-muted-foreground px-3 py-2">Popular searches</p>
            {suggestions?.map((suggestion) => (
              <button
                key={suggestion?.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full flex items-center space-x-3 px-3 py-2 rounded-md hover:bg-muted transition-base text-left"
              >
                <Icon name={suggestion?.icon} size={16} color="var(--color-muted-foreground)" />
                <span className="text-sm text-foreground">{suggestion?.text}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;