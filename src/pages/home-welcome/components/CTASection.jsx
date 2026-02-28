import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-accent to-orange-600 text-primary-foreground">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Icon name="Dumbbell" size={32} color="white" />
          </div>
          
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
  Ready to Transform Your{" "}
  <span className="text-white/90">Fitness Journey?</span>
</h2>
          
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of fitness enthusiasts who have found their perfect gym match. Start your free trial today and experience the difference.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => navigate('/sign-in-sign-up')}
              className="bg-white text-primary hover:bg-white/90"
            >
              Create Free Account
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Building2"
              iconPosition="left"
              onClick={() => navigate('/partner-with-us')}
              className="border-white/30 text-white hover:bg-white/10"
            >
              Partner With Us
            </Button>
          </div>

        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-8 border-t border-white/20">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle2" size={20} color="white" />
              <span className="text-sm">No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle2" size={20} color="white" />
              <span className="text-sm">Cancel Anytime</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle2" size={20} color="white" />
              <span className="text-sm">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;