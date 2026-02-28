import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';
import Button from './ui/Button';

const MainNavigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const role = localStorage.getItem("userRole");
  const paymentStatus = localStorage.getItem("paymentStatus");;


  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(authStatus);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navigationItems = [
    { label: 'Home', path: '/home-welcome', icon: 'Home', requiresAuth: false },
    { label: 'About Us', path: '/about-us', icon: 'Info', requiresAuth: false },
    { label: 'Find Gyms', path: '/gym-listing', icon: 'Search', requiresAuth: false },
    { label: 'Partner With Us', path: '/partner-with-us', icon: 'Handshake', requiresAuth: false },
  ];





const dashboardPath =
  role === "owner"
    ? "/owner-dashboard"
    : "/user-dashboard";

const showDashboard =
  role === "user" ||
  (role === "owner" && paymentStatus === "paid");

const authenticatedItems = showDashboard
  ? [{ label: 'Dashboard', path: dashboardPath, icon: 'LayoutDashboard', requiresAuth: true }]
  : [];
  const handleSignOut = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    navigate('/home-welcome');
    setIsMobileMenuOpen(false);
  };

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-100">
        <nav className="container-custom">
          <div className="flex items-center justify-between h-16">
            <Link 
              to="/home-welcome" 
              className="flex items-center space-x-1 transition-micro hover:opacity-80"
              onClick={handleNavClick}
            >
             <img
                src="/public/assets/smartfit-logo.png.png"

                  alt="SmartFit Logo"
                   className="h-20 w-20 object-contain"
            />
              
              <span className="text-xl font-bold text-foreground">SmartFit</span>
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-base ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item?.label}
                </Link>
              ))}

              {isAuthenticated && showDashboard && authenticatedItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`px-4 py-2 rounded-md text-base font-medium transition-base ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-foreground hover:bg-muted'
                  }`}
                >
                  {item?.label}
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link to="/contact" className="text-foreground hover:text-primary transition-base">
                <Button variant="ghost" iconName="Mail" iconPosition="left">
                  Contact
                </Button>
              </Link>

              {isAuthenticated ? (
                <Button variant="outline" onClick={handleSignOut} iconName="LogOut" iconPosition="left">
                  Sign Out
                </Button>
              ) : (
                <Link to="/sign-in-sign-up">
                  <Button variant="default" iconName="LogIn" iconPosition="left">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-md text-foreground hover:bg-muted transition-base focus-ring"
              aria-label="Toggle mobile menu"
              aria-expanded={isMobileMenuOpen}
            >
              <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
            </button>
          </div>
        </nav>
      </header>
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
          
          <div className="absolute top-16 left-0 right-0 bottom-0 bg-card border-t border-border overflow-y-auto">
            <div className="container-custom py-6">
              <div className="flex flex-col space-y-2">
                {navigationItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={handleNavClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-base ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}

              {isAuthenticated && showDashboard && authenticatedItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    onClick={handleNavClick}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium transition-base ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} />
                    <span>{item?.label}</span>
                  </Link>
                ))}

                <div className="pt-4 border-t border-border mt-4">
                  <Link
                    to="/contact"
                    onClick={handleNavClick}
                    className="flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-base"
                  >
                    <Icon name="Mail" size={20} />
                    <span>Contact</span>
                  </Link>

                  {isAuthenticated ? (
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium text-foreground hover:bg-muted transition-base"
                    >
                      <Icon name="LogOut" size={20} />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <Link
                      to="/sign-in-sign-up"
                      onClick={handleNavClick}
                      className="flex items-center space-x-3 px-4 py-3 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-base"
                    >
                      <Icon name="LogIn" size={20} />
                      <span>Sign In</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MainNavigation;