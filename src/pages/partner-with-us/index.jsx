import React from "react";

import MainNavigation from '../../components/MainNavigation';
import BenefitsSection from './components/BenefitsSection';
import CommissionStructure from './components/CommissionStructure';
import RequirementsSection from './components/RequirementsSection';
import PartnerApplicationForm from './components/PartnerApplicationForm';
import Icon from '../../components/AppIcon';

const PartnerWithUs = () => {
  



  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <main className="main-content">
        <div className="relative bg-gradient-to-br from-primary/10 via-background to-accent/5 py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-full mb-6">
                <Icon name="Handshake" size={40} color="var(--color-primary)" />
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Partner With SmartFit
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Join our growing network of premium fitness facilities and connect with thousands of fitness enthusiasts looking for their perfect gym
              </p>
              <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                <div className="flex items-center">
                  <Icon name="Users" size={20} color="var(--color-primary)" className="mr-2" />
                  <span className="text-foreground font-medium">500+ Partner Gyms</span>
                </div>
                <div className="flex items-center">
                  <Icon name="TrendingUp" size={20} color="var(--color-success)" className="mr-2" />
                  <span className="text-foreground font-medium">50K+ Active Users</span>
                </div>
                <div className="flex items-center">
                  <Icon name="Star" size={20} color="var(--color-warning)" className="mr-2" />
                  <span className="text-foreground font-medium">4.8 Average Rating</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container-custom py-12 md:py-16 space-y-12">
          <BenefitsSection />
          <CommissionStructure />
          <RequirementsSection />
          <PartnerApplicationForm />
        </div>

        <div className="bg-gradient-to-br from-primary/5 to-accent/5 py-16">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-foreground mb-4">Have Questions?</h2>
              <p className="text-muted-foreground text-lg mb-8">
                Our partnership team is here to help you every step of the way
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card rounded-lg p-6 card-elevation-sm">
                  <Icon name="Mail" size={32} color="var(--color-primary)" className="mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Email Us</h3>
                  <p className="text-sm text-muted-foreground">partners@smartfit.com</p>
                </div>
                <div className="bg-card rounded-lg p-6 card-elevation-sm">
                  <Icon name="Phone" size={32} color="var(--color-primary)" className="mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Call Us</h3>
                  <p className="text-sm text-muted-foreground">1-800-GYM-PARTNER</p>
                </div>
                <div className="bg-card rounded-lg p-6 card-elevation-sm">
                  <Icon name="MessageCircle" size={32} color="var(--color-primary)" className="mx-auto mb-3" />
                  <h3 className="font-semibold text-foreground mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground">Available 9 AM - 6 PM EST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date()?.getFullYear()} SmartFit. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                Partnership Agreement
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PartnerWithUs;