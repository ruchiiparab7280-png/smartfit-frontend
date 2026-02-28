import React from 'react';
import Icon from '../../../components/AppIcon';

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: "Search",
      title: "Smart Gym Discovery",
      description: "Advanced search algorithms that match you with gyms based on your location, preferences, budget, and fitness goals. Find your perfect gym in minutes, not days."
    },
    {
      icon: "Shield",
      title: "Verified Reviews",
      description: "Authentic reviews from real members. Our verification system ensures you get honest feedback from actual gym-goers, helping you make informed decisions."
    },
    {
      icon: "IndianRupee",
      title: "Transparent Pricing",
      description: "No hidden fees or surprise charges. Compare membership costs, amenities, and special offers across multiple gyms to find the best value for your budget."
    },
    {
      icon: "Calendar",
      title: "Flexible Memberships",
      description: "From day passes to annual memberships, find flexible options that fit your lifestyle. Manage everything from a single dashboard with easy cancellation policies."
    },
    {
      icon: "TrendingUp",
      title: "Progress Tracking",
      description: "Built-in fitness tracking tools to monitor your workouts, set goals, and celebrate achievements. Stay motivated with personalized insights and recommendations."
    },
    {
      icon: "Users",
      title: "Community Support",
      description: "Connect with fellow fitness enthusiasts, share experiences, and find workout partners. Join a community that motivates and supports your fitness journey."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Choose SmartFit?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're more than just a gym directory. We're your complete fitness companion, designed to make your fitness journey easier, more enjoyable, and more successful.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg border border-border card-elevation-sm hover-lift transition-smooth group"
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-base">
                <Icon name={feature?.icon} size={28} color="var(--color-primary)" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">
                {feature?.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;