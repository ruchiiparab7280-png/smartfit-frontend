import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SignInSignUp from './pages/sign-in-sign-up';
import GymListing from './pages/gym-listing';
import UserDashboard from './pages/user-dashboard';
import HomeWelcome from './pages/home-welcome';
import PartnerWithUs from './pages/partner-with-us';
import AboutUs from './pages/about-us';
import ApprovalPending from "./pages/ApprovalPending";
import AdminApproval from "./pages/admin-approval";
import OwnerApproved from "./pages/owner-approved";
import OwnerRejected from "./pages/owner-rejected";
import OwnerDashboard from "./pages/owner/OwnerDashboard";
import SupplementControl from "./pages/owner/SupplementControl";
import TrainerControl from "./pages/owner/TrainerControl";
import Contact from "./pages/contact";
import OwnerPayment from "./pages/owner-payment";






const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeWelcome />} />
        <Route path="/sign-in-sign-up" element={<SignInSignUp />} />
        <Route path="/gym-listing" element={<GymListing />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/home-welcome" element={<HomeWelcome />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/approval-pending" element={<ApprovalPending />} />
        <Route path="/admin-approval" element={<AdminApproval />} />
        <Route path="/owner-approved" element={<OwnerApproved />} />
        <Route path="/owner-rejected" element={<OwnerRejected />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/supplements" element={<SupplementControl/>} />
        <Route path="/trainers" element={<TrainerControl />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/owner-payment" element={<OwnerPayment />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
