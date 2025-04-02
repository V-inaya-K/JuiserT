import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const SideNavigation = () => {
  const router = useRouter();
  
  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Scan QR', path: '/scan', icon: 'qr_code_scanner' },
    { name: 'My Orders', path: '/orders', icon: 'receipt_long' },
    { name: 'My Profile', path: '/profile', icon: 'person' },
    { name: 'Loyalty & Rewards', path: '/loyalty', icon: 'workspace_premium' },
    { name: 'JoosT Pass', path: '/joost-pass', icon: 'card_membership' },
  ];
  
  const featureItems = [
    { name: '₹1 Juice Deal', path: '/one-rupee', icon: 'local_offer', badge: 'New' },
    { name: 'Group Order', path: '/group-order', icon: 'group' },
    { name: 'Pre-booking', path: '/pre-booking', icon: 'event' },
  ];
  
  return (
    <div className="h-full bg-white border-r border-gray-200 py-6 flex flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center px-6 mb-8">
        <div className="w-10 h-10 relative mr-2">
          <div className="absolute inset-0 flex items-center justify-center bg-primary text-white rounded-full font-display font-bold text-lg">J</div>
        </div>
        <span className="font-display font-bold text-xl text-primary">JoosT</span>
      </Link>
      
      {/* User Profile Summary */}
      <div className="mx-4 mb-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
            R
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm">Rahul Singh</p>
            <p className="text-xs text-gray-500">320 points</p>
          </div>
        </div>
      </div>
      
      {/* Main Navigation */}
      <div className="flex-1">
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase tracking-wider">Main Menu</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center px-2 py-2 rounded-lg ${
                  router.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-rounded mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="px-4">
          <h2 className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase tracking-wider">Special Features</h2>
          <div className="space-y-1">
            {featureItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center px-2 py-2 rounded-lg ${
                  router.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-rounded mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Help & Support */}
      <div className="px-4 mt-6 border-t pt-4">
        <Link href="/help" className="flex items-center px-2 py-2 text-gray-700 hover:bg-gray-100 rounded-lg">
          <span className="material-symbols-rounded mr-3">help</span>
          <span className="text-sm font-medium">Help & Support</span>
        </Link>
        
        <button className="flex w-full items-center px-2 py-2 text-red-500 hover:bg-gray-100 rounded-lg mt-1">
          <span className="material-symbols-rounded mr-3">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;
