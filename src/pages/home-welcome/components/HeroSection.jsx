import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1722237441430-c7329470d83b"
          alt="Modern fitness gym interior with rows of treadmills and exercise equipment under bright lighting with large windows"
          className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/50"></div>
      </div>

      <div className="relative container-custom h-full flex items-center">
        <div className="max-w-3xl text-white">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover Your Perfect
            <span className="block text-primary mt-2">Fitness Destination</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-200 mb-8 leading-relaxed">
            Connect with top-rated gyms near you. Smart search, flexible memberships, and complete fitness management tools all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="default"
              size="lg"
              iconName="UserPlus"
              iconPosition="left"
              onClick={() => navigate('/sign-in-sign-up')}
              className="text-base">

              Get Started Free
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              iconName="Search"
              iconPosition="left"
              onClick={() => navigate('/gym-listing')}
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20">

              Browse Gyms
            </Button>
          </div>

          <div className="flex items-center gap-8 mt-12 pt-8 border-t border-white/20">
            <div>
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-slate-300">Partner Gyms</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">50K+</div>
              <div className="text-sm text-slate-300">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">4.8★</div>
              <div className="text-sm text-slate-300">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default HeroSection;