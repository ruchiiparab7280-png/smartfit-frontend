import React from 'react';
import Image from '../../../components/AppImage';

const HeroSection = () => {
  return (
    <section className="relative h-[400px] md:h-[500px] overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1722237441430-c7329470d83b"
        alt="Modern fitness gym interior with rows of treadmills and exercise equipment, bright natural lighting through large windows, and motivational atmosphere"
        className="w-full h-full object-cover" />

      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
          <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            About SmartFit
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
            Connecting fitness enthusiasts with the perfect gym experience
          </p>
        </div>
      </div>
    </section>);

};

export default HeroSection;