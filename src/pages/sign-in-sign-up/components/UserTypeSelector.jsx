import React from 'react';
import Icon from '../../../components/AppIcon';

const UserTypeSelector = ({ selectedType, onTypeChange }) => {
  const userTypes = [
    {
      id: 'user',
      label: 'Fitness Enthusiast',
      description: 'Find and join gyms near you',
      icon: 'User'
    },
    {
      id: 'owner',
      label: 'Gym Owner',
      description: 'Manage your gym business',
      icon: 'Building2'
    }
  ];

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-foreground mb-3">
        I am a <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {userTypes?.map((type) => (
          <button
            key={type?.id}
            type="button"
            onClick={() => onTypeChange(type?.id)}
            className={`p-4 rounded-lg border-2 transition-base text-left ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-md ${
                selectedType === type?.id ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={type?.icon} 
                  size={20} 
                  color={selectedType === type?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                />
              </div>
              <div className="flex-1">
                <div className={`font-medium text-sm mb-1 ${
                  selectedType === type?.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {type?.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {type?.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;