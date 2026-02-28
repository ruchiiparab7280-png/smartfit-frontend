import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    company: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Partner With Us', path: '/partner-with-us' },
      { label: 'Contact', path: '/contact' }
    ],
    resources: [
      { label: 'Find Gyms', path: '/gym-listing' },
      { label: 'User Dashboard', path: '/user-dashboard' },
      { label: 'Sign In', path: '/sign-in-sign-up' }
    ],
    legal: [
      { label: 'Terms of Service', path: '#' },
      { label: 'Privacy Policy', path: '#' },
      { label: 'Cookie Policy', path: '#' }
    ]
  };

  const socialLinks = [
    { icon: 'Facebook', url: '#', label: 'Facebook' },
    { icon: 'Twitter', url: '#', label: 'Twitter' },
    { icon: 'Instagram', url: '#', label: 'Instagram' },
    { icon: 'Linkedin', url: '#', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="container-custom py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/home-welcome" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
                <Icon name="Dumbbell" size={24} color="var(--color-primary)" />
              </div>
              <span className="text-xl font-bold text-foreground">Multi Gym</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Your trusted platform for discovering the perfect gym and managing your fitness journey. Join thousands of fitness enthusiasts today.
            </p>
            <div className="flex space-x-3">
              {socialLinks?.map((social, index) => (
                <a
                  key={index}
                  href={social?.url}
                  className="w-10 h-10 bg-muted rounded-md flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-base"
                  aria-label={social?.label}
                >
                  <Icon name={social?.icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks?.company?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-primary transition-base"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks?.resources?.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link?.path}
                    className="text-muted-foreground hover:text-primary transition-base"
                  >
                    {link?.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-foreground font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks?.legal?.map((link, index) => (
                <li key={index}>
                  <a
                    href={link?.path}
                    className="text-muted-foreground hover:text-primary transition-base"
                  >
                    {link?.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Multi Gym. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} color="var(--color-accent)" />
                <span className="text-sm text-muted-foreground">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} color="var(--color-accent)" />
                <span className="text-sm text-muted-foreground">Certified Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;