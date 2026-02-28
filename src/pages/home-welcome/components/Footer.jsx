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
      { label: 'Dashboard', path: '/user-dashboard' },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Link to="/home-welcome" className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-md flex items-center justify-center">
              <img
                src="/smartfit-logo.png"

                  alt="SmartFit Logo"
                   className="h-20 w-20 object-contain"
            />
              </div>
              <span className="text-xl font-bold text-foreground">SmartFit</span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-sm">
              Your ultimate fitness companion. Discover, join, and manage your gym memberships all in one place.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks?.map((social) => (
                <a
                  key={social?.label}
                  href={social?.url}
                  aria-label={social?.label}
                  className="w-9 h-9 rounded-md bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-base"
                >
                  <Icon name={social?.icon} size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
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
            <h3 className="font-semibold text-foreground mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks?.resources?.map((link) => (
                <li key={link?.label}>
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
            <h3 className="font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks?.legal?.map((link) => (
                <li key={link?.label}>
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} SmartFit. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={16} color="var(--color-success)" />
              <span className="text-sm text-muted-foreground">SSL Secured</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;