import React, { useEffect } from 'react';
import MainNavigation from '../../components/MainNavigation';
import HeroSection from './components/HeroSection';
import ValuePropositions from './components/ValuePropositions';
import FeaturedGyms from './components/FeaturedGyms';
import CTASection from './components/CTASection';


const HomeWelcome = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      
      <main className="main-content">
        <HeroSection />
        <ValuePropositions />
        <FeaturedGyms />
        <CTASection />
      </main>

      {/* Footer removed */}
    </div>
  );
};

export default HomeWelcome;
