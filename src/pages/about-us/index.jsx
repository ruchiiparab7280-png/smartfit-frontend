import React, { useEffect } from 'react';
import MainNavigation from '../../components/MainNavigation';
import HeroSection from './components/HeroSection';
import WhoWeAreSection from './components/WhoWeAreSection';
import MissionVisionSection from './components/MissionVisionSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import ServiceSection from './components/ServiceSection';

import CTASection from './components/CTASection';


const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />

      <main className="main-content">
        <HeroSection />
        <WhoWeAreSection />
        <MissionVisionSection />
        <WhyChooseUsSection />
        <ServiceSection />
     
        <CTASection />
      </main>

      {/* Footer removed */}
    </div>
  );
};

export default AboutUs;
