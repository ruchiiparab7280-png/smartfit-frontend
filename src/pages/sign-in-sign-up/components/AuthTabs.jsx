import React from 'react';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Login' },
    { id: 'signup', label: 'Sign Up' }
  ];

  return (
    <div className="flex border-b border-border mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 py-3 text-base font-medium transition-base relative ${
            activeTab === tab?.id
              ? 'text-primary' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab?.label}
          {activeTab === tab?.id && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
          )}
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;