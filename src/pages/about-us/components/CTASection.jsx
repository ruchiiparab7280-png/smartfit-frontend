import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  return (
    <section className="py-16 md:py-24 bg-primary">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Start Your Fitness Journey?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of fitness enthusiasts who have found their perfect gym through Multi Gym. Discover, compare, and connect with the best fitness facilities in your area.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/gym-listing">
              <Button
                variant="secondary"
                size="lg"
                iconName="Search"
                iconPosition="left"
                className="w-full sm:w-auto"
              >
                Find Gyms Near You
              </Button>
            </Link>
            <Link to="/sign-in-sign-up">
              <Button
                variant="outline"
                size="lg"
                iconName="UserPlus"
                iconPosition="left"
                className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 border-white"
              >
                Create Free Account
              </Button>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <p className="text-white/90 text-sm">100% Secure</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Zap" size={24} color="white" />
              </div>
              <p className="text-white/90 text-sm">Instant Access</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Icon name="Heart" size={24} color="white" />
              </div>
              <p className="text-white/90 text-sm">Free Forever</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;