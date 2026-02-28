import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MembershipCard = ({ membership }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-success/10 text-success border-success/20';
      case 'Expiring Soon':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Expired':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getDaysRemaining = (expiryDate) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysRemaining = getDaysRemaining(membership?.expiryDate);

  return (
    <div className="bg-card rounded-lg overflow-hidden card-elevation-sm border border-border hover:card-elevation-md transition-smooth">
      <div className="h-40 overflow-hidden relative">
        <Image 
          src={membership?.gymImage} 
          alt={membership?.gymImageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(membership?.status)}`}>
            {membership?.status}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-foreground mb-2">{membership?.gymName}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex items-center gap-2">
          <Icon name="MapPin" size={14} />
          {membership?.location}
        </p>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="CreditCard" size={14} />
              Plan Type
            </span>
            <span className="text-sm font-semibold text-foreground">{membership?.planType}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="Calendar" size={14} />
              Start Date
            </span>
            <span className="text-sm font-semibold text-foreground">{membership?.startDate}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <Icon name="CalendarCheck" size={14} />
              Expiry Date
            </span>
            <span className="text-sm font-semibold text-foreground">{membership?.expiryDate}</span>
          </div>
          {daysRemaining > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <Icon name="Clock" size={14} />
                Days Remaining
              </span>
              <span className={`text-sm font-semibold ${daysRemaining <= 7 ? 'text-warning' : 'text-foreground'}`}>
                {daysRemaining} days
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {membership?.status === 'Active' || membership?.status === 'Expiring Soon' ? (
            <>
              <Button variant="default" size="sm" fullWidth iconName="RefreshCw" iconPosition="left">
                Renew
              </Button>
              <Button variant="outline" size="sm" iconName="Eye" iconPosition="left">
                View
              </Button>
            </>
          ) : (
            <Button variant="default" size="sm" fullWidth iconName="RotateCcw" iconPosition="left">
              Reactivate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;