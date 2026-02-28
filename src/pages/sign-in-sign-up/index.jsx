import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigation';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import AuthTabs from './components/AuthTabs';
import UserTypeSelector from './components/UserTypeSelector';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

const SignInSignUp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [userType, setUserType] = useState('user');

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    if (isAuthenticated) {
      navigate('/user-dashboard');
    }
  }, [navigate]);

  const features = [
  {
    icon: 'MapPin',
    title: 'Find Nearby Gyms',
    description: 'Discover fitness centers in your area with smart location-based search'
  },
  {
    icon: 'TrendingUp',
    title: 'Track Progress',
    description: 'Monitor your fitness journey with comprehensive analytics and insights'
  },
  {
    icon: 'Users',
    title: 'Join Community',
    description: 'Connect with fitness enthusiasts and achieve your goals together'
  },
  {
    icon: 'Award',
    title: 'Verified Gyms',
    description: 'Access only certified and quality-assured fitness facilities'
  }];


  const trustBadges = [
  { icon: 'Shield', label: 'SSL Secured' },
  { icon: 'Lock', label: 'Data Protected' },
  { icon: 'CheckCircle2', label: 'Verified Platform' }];


  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <main className="main-content">
        <div className="container-custom py-8 lg:py-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div className="hidden lg:block space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 rounded-full">
                  <Icon name="Sparkles" size={18} color="var(--color-primary)" />
                  <span className="text-sm font-medium text-primary">Welcome to SmartFit</span>
                </div>
                
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Your Fitness Journey Starts Here
                </h1>
                
                <p className="text-lg text-muted-foreground">
                  Join thousands of fitness enthusiasts and gym owners who trust SmartFit for their fitness management needs.
                </p>
              </div>

              <div className="relative rounded-2xl overflow-hidden card-elevation-md">
                <Image
                  src="https://images.unsplash.com/photo-1714181878725-91509e2d02de"
                  alt="Modern fitness center interior with rows of treadmills and exercise equipment under bright lighting with people working out"
                  className="w-full h-80 object-cover" />

                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-4 text-white">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4]?.map((i) =>
                      <div key={i} className="w-10 h-10 rounded-full bg-primary border-2 border-white" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold">10,000+ Active Users</p>
                      <p className="text-sm opacity-90">Growing fitness community</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {features?.map((feature, index) =>
                <div key={index} className="p-4 bg-card rounded-lg border border-border">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                      <Icon name={feature?.icon} size={20} color="var(--color-primary)" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-1">{feature?.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature?.description}</p>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center space-x-6 pt-4">
                {trustBadges?.map((badge, index) =>
                <div key={index} className="flex items-center space-x-2 text-muted-foreground">
                    <Icon name={badge?.icon} size={18} />
                    <span className="text-sm">{badge?.label}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-card rounded-2xl border border-border card-elevation-md p-6 lg:p-8">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {activeTab === 'login' ? 'Welcome Back' : 'Create Account'}
                  </h2>
                  <p className="text-muted-foreground">
                    {activeTab === 'login' ? 'Sign in to access your fitness dashboard' : 'Join our community and start your fitness journey'}
                  </p>
                </div>

                <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />

                <UserTypeSelector selectedType={userType} onTypeChange={setUserType} />

                {activeTab === 'login' ?
                <LoginForm userType={userType} /> :

                <SignUpForm userType={userType} />
                }

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                    <button
                      onClick={() => setActiveTab(activeTab === 'login' ? 'signup' : 'login')}
                      className="text-primary font-medium hover:underline transition-base">

                      {activeTab === 'login' ? 'Sign Up' : 'Sign In'}
                    </button>
                  </p>
                </div>
              </div>

              <div className="lg:hidden mt-6 p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                  {trustBadges?.map((badge, index) =>
                  <div key={index} className="flex items-center space-x-1">
                      <Icon name={badge?.icon} size={16} />
                      <span>{badge?.label}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border py-6">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date()?.getFullYear()} SmartFit. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-base">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-base">
                Terms of Service
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-base">
                Help Center
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default SignInSignUp;