import React from 'react';
import Icon from '../../../components/AppIcon';

const BenefitsSection = () => {
  const benefits = [
    {
      id: 1,
      icon: "Users",
      title: "Expand Your Reach",
      description: "Connect with thousands of fitness enthusiasts actively searching for gym memberships in your area"
    },
    {
      id: 2,
      icon: "TrendingUp",
      title: "Increase Revenue",
      description: "Boost your membership sales with our targeted marketing and promotional campaigns"
    },
    {
      id: 3,
      icon: "Shield",
      title: "Verified Platform",
      description: "Join a trusted network of premium fitness facilities with verified reviews and ratings"
    },
    {
      id: 4,
      icon: "BarChart3",
      title: "Analytics Dashboard",
      description: "Track your performance with detailed insights on views, inquiries, and conversions"
    },
    {
      id: 5,
      icon: "Smartphone",
      title: "Digital Presence",
      description: "Showcase your facility with professional listings, photos, and virtual tours"
    },
    {
      id: 6,
      icon: "Headphones",
      title: "Dedicated Support",
      description: "Get assistance from our partner success team to maximize your platform benefits"
    }
  ];

  return (
    <div className="bg-card rounded-lg p-8 card-elevation-sm">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-foreground mb-3">Why Partner With Us?</h2>
        <p className="text-muted-foreground text-lg">Join hundreds of successful gym owners growing their business</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {benefits?.map((benefit) => (
          <div 
            key={benefit?.id}
            className="flex flex-col items-start p-6 bg-muted/30 rounded-lg transition-micro hover:bg-muted/50"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name={benefit?.icon} size={24} color="var(--color-primary)" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">{benefit?.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{benefit?.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BenefitsSection;