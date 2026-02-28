import React from 'react';
import Icon from '../../../components/AppIcon';

const ValuePropositionCard = ({ icon, title, description, color }) => {
  return (
    <div className="bg-card rounded-lg p-6 card-elevation-sm hover:card-elevation-md transition-smooth hover-lift">
      <div 
        className="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
        style={{ backgroundColor: `${color}15` }}
      >
        <Icon name={icon} size={28} color={color} />
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-3">
        {title}
      </h3>
      
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ValuePropositionCard;