import React from 'react';
import ValuePropositionCard from './ValuePropositionCard';

const ValuePropositions = () => {
  const propositions = [
    {
      icon: "MapPin",
      title: "Smart Location Search",
      description: "Find gyms near you with advanced filters for distance, price range, and amenities. Get real-time availability and instant booking options.",
      color: "#2563EB"
    },
    {
      icon: "CreditCard",
      title: "Flexible Memberships",
      description: "Choose from daily passes, monthly plans, or annual memberships. Manage all your gym subscriptions in one convenient dashboard.",
      color: "#10B981"
    },
    {
      icon: "TrendingUp",
      title: "Progress Tracking",
      description: "Monitor your fitness journey with built-in workout logs, BMI calculator, and progress charts. Set goals and achieve them systematically.",
      color: "#F59E0B"
    },
    {
      icon: "Users",
      title: "Community Connect",
      description: "Join a thriving fitness community. Share achievements, find workout partners, and get motivated by success stories from fellow members.",
      color: "#8B5CF6"
    },
    {
      icon: "Shield",
      title: "Verified Facilities",
      description: "All partner gyms are verified for quality, safety standards, and equipment maintenance. Read authentic reviews from real members.",
      color: "#EF4444"
    },
    {
      icon: "Zap",
      title: "Instant Access",
      description: "Book classes, get instant gym access, and skip the queues. Maximize your workout time with seamless entry.",
      color: "#06B6D4"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Why Choose SmartFit?
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to discover, join, and manage your fitness journey in one powerful platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propositions?.map((prop, index) => (
            <ValuePropositionCard
              key={index}
              icon={prop?.icon}
              title={prop?.title}
              description={prop?.description}
              color={prop?.color}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePropositions;