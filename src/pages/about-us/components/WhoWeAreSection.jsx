import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const WhoWeAreSection = () => {
  const stats = [
  { icon: "Users", value: "50,000+", label: "Active Users" },
  { icon: "Building2", value: "500+", label: "Partner Gyms" },
  { icon: "MapPin", value: "100+", label: "Cities Covered" },
  { icon: "Award", value: "4.8/5", label: "User Rating" }];


  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              SmartFit  is a revolutionary fitness platform that bridges the gap between fitness enthusiasts and quality gym facilities. Founded in 2026, we've grown from a simple gym directory to a comprehensive fitness ecosystem that empowers users to discover, compare, and connect with the best gyms in their area.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our platform combines cutting-edge technology with deep industry expertise to provide personalized gym recommendations, seamless membership management, and comprehensive fitness tracking tools. We believe that finding the right gym should be as easy as finding the motivation to work out.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {stats?.map((stat, index) =>
              <div key={index} className="bg-card p-6 rounded-lg border border-border card-elevation-sm">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                      <Icon name={stat?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat?.label}</p>
                </div>
              )}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative rounded-lg overflow-hidden card-elevation-md">
              <Image
                src="https://images.unsplash.com/photo-1664284602615-bc1348fa085c"
                alt="Diverse group of fitness enthusiasts working out together in modern gym with personal trainer guidance, showing community and motivation"
                className="w-full h-[500px] object-cover" />

            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default WhoWeAreSection;