import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statsData = [
    {
      id: 1,
      label: "Active Memberships",
      value: stats?.active_memberships || 0,
      icon: "CreditCard",
      color: "var(--color-primary)",
      bgColor: "bg-primary/10",
      change: "+1 this month",
      changeType: "positive"
    },
    {
      id: 2,
      label: "Workouts This Month",
      value: stats?.workouts_this_month || 0,
      icon: "Activity",
      color: "var(--color-accent)",
      bgColor: "bg-accent/10",
      change: "+4 from last month",
      changeType: "positive"
    },
    {
      id: 3,
      label: "Calories Burned",
      value: stats?.calories_burned || 0,
      icon: "Flame",
      color: "var(--color-error)",
      bgColor: "bg-error/10",
      change: "Today\'s total",
      changeType: "neutral"
    },
    {
      id: 4,
      label: "Current Streak",
      value: stats?.streak + " days" || 0,
      icon: "Zap",
      color: "var(--color-warning)",
      bgColor: "bg-warning/10",
      change: "Personal best!",
      changeType: "positive"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat) => (
        <div 
          key={stat?.id}
          className="bg-card rounded-lg p-5 card-elevation-sm border border-border hover:card-elevation-md transition-smooth"
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color={stat?.color} />
            </div>
            {stat?.changeType === 'positive' && (
              <Icon name="TrendingUp" size={16} color="var(--color-success)" />
            )}
          </div>
          <p className="text-3xl font-bold text-foreground mb-1">{stat?.value}</p>
          <p className="text-sm text-muted-foreground mb-2">{stat?.label}</p>
          <p className={`text-xs font-medium ${
            stat?.changeType === 'positive' ? 'text-success' : 'text-muted-foreground'
          }`}>
            {stat?.change}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;