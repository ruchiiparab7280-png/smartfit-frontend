import React from 'react';
import Icon from '../../../components/AppIcon';

const MissionVisionSection = () => {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-8 md:p-12 rounded-lg border border-border card-elevation-md">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
              <Icon name="Target" size={32} color="var(--color-primary)" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              To democratize access to quality fitness facilities by creating a transparent, user-friendly platform that connects people with the perfect gym for their unique fitness journey.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We strive to eliminate the barriers between fitness goals and gym memberships by providing comprehensive information, honest reviews, and seamless booking experiences that empower informed decisions.
            </p>
          </div>

          <div className="bg-card p-8 md:p-12 rounded-lg border border-border card-elevation-md">
            <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
              <Icon name="Eye" size={32} color="var(--color-accent)" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-6">Our Vision</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-4">
              To become the world's most trusted fitness platform, where every individual can find their ideal fitness environment and every gym can reach their perfect audience.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We envision a future where fitness is accessible to everyone, where technology enhances the gym experience, and where communities are built around shared health and wellness goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;