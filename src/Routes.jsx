import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import PageLoader from "components/PageLoader";

// 🚀 PERFORMANCE: Code splitting — each route is loaded on-demand
const SignInSignUp = lazy(() => import('./pages/sign-in-sign-up'));
const ForgotPassword = lazy(() => import("./pages/sign-in-sign-up/reset"));
const UpdatePassword = lazy(() => import("./pages/sign-in-sign-up/updatePassword"));
const GymListing = lazy(() => import('./pages/gym-listing'));
const UserDashboard = lazy(() => import('./pages/user-dashboard'));
const HomeWelcome = lazy(() => import('./pages/home-welcome'));
const PartnerWithUs = lazy(() => import('./pages/partner-with-us'));
const AboutUs = lazy(() => import('./pages/about-us'));
const ApprovalPending = lazy(() => import("./pages/ApprovalPending"));
const AdminApproval = lazy(() => import("./pages/admin-approval"));
const OwnerApproved = lazy(() => import("./pages/owner-approved"));
const OwnerRejected = lazy(() => import("./pages/owner-rejected"));
const OwnerPayment = lazy(() => import("./pages/owner-payment"));
const GymOwnerDashboard = lazy(() => import('./pages/gym-owner-dashboard'));
const Contact = lazy(() => import("./pages/contact"));
const PrivacyPolicy = lazy(() => import("./pages/privacy-policy"));
const Terms = lazy(() => import("./pages/terms"));
const Partnership = lazy(() => import("./pages/partnership"));
const AdminDashboard = lazy(() => import('./pages/admin-dashboard'));
const NotFound = lazy(() => import("pages/NotFound"));

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <Suspense fallback={<PageLoader />}>
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<HomeWelcome />} />
        <Route path="/sign-in-sign-up" element={<SignInSignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<UpdatePassword />} />
        <Route path="/gym-listing" element={<GymListing />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/home-welcome" element={<HomeWelcome />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/approval-pending" element={<ApprovalPending />} />
        <Route path="/admin-approval" element={<AdminApproval />} />
        <Route path="/owner-approved" element={<OwnerApproved />} />
        <Route path="/owner-rejected" element={<OwnerRejected />} />
        <Route path="/owner-payment" element={<OwnerPayment />} />
        <Route path="/gym-owner-dashboard" element={<GymOwnerDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/partnership" element={<Partnership />} /> 
        
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </Suspense>
      
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
