import React, { useEffect } from 'react';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import MainNavigation from '../../components/MainNavigation';
import Icon from '../../components/AppIcon';
import ProfileCard from './components/ProfileCard';
import MembershipCard from './components/MembershipCard';
import WorkoutPlanCard from './components/WorkoutPlanCard';
import ProgressChart from './components/ProgressChart';
import BMICalculator from './components/BMICalculator';
import RecommendedGymCard from './components/RecommendedGymCard';
import StatsOverview from './components/StatsOverview';





const UserDashboard = () => {
  const role = localStorage.getItem("userRole");

useEffect(() => {
  if (role === "owner") {
    navigate("/partner-with-us");
  }
}, []);


  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

 useEffect(() => {

  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const userId = localStorage.getItem("userId");

  if (!isAuthenticated) {
    navigate('/sign-in-sign-up');
    return;
  }

  fetch(`${import.meta.env.VITE_API_URL}/api/user/dashboard/${userId}`)
    .then(res => res.json())
    .then(data => {
      setDashboardData(data);
    });

}, []);

 

if (!dashboardData) {
  return <div className="text-white p-10">Loading Dashboard...</div>;
}
 
    


  return (
    <div className="min-h-screen bg-background">
      <MainNavigation />
      <main className="main-content">
        <div className="container-custom py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="LayoutDashboard" size={32} color="var(--color-primary)" />
              <h1 className="text-4xl font-bold text-foreground">My Dashboard</h1>
            </div>
            <p className="text-lg text-muted-foreground">
              Welcome back! Track your fitness journey and manage your memberships.
            </p>
          </div>

        {dashboardData && <StatsOverview stats={dashboardData.stats} />}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
             {dashboardData && <ProfileCard data={dashboardData.profile} />}
            </div>
            <div>
              <BMICalculator />
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-foreground">Active Memberships</h2>
              <span className="text-sm text-muted-foreground">{memberships?.length} active</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dashboardData?.memberships?.map((membership) =>
  <MembershipCard key={membership.id} membership={membership} />
)}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WorkoutPlanCard />
            <ProgressChart />
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Recommended Gyms</h2>
                <p className="text-sm text-muted-foreground">Based on your location and preferences</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedGyms?.map((gym) =>
              <RecommendedGymCard key={gym?.id} gym={gym} />
              )}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-card border-t border-border py-8">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date()?.getFullYear()} Multi Gym Smart Fitness. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-base">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>);

};

export default UserDashboard;