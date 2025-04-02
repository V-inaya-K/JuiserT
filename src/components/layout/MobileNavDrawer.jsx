import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MobileNavDrawer = ({ isOpen, onClose }) => {
  const router = useRouter();
  
  // Close drawer when navigation occurs
  useEffect(() => {
    const handleRouteChange = () => {
      onClose();
    };
    
    router.events.on('routeChangeStart', handleRouteChange);
    
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, onClose]);
  
  // Prevent body scrolling when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);
  
  // Navigation items (same as SideNavigation)
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

  if (!isOpen) return null;
  
  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-[280px] bg-white z-50 lg:hidden overflow-y-auto transform transition-transform ease-in-out duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-4 h-16 border-b">
          <Link href="/" className="flex items-center">
            <div className="w-10 h-10 relative mr-2">
              <div className="absolute inset-0 flex items-center justify-center bg-primary text-white rounded-full font-display font-bold text-lg">J</div>
            </div>
            <span className="font-display font-bold text-xl text-primary">JoosT</span>
          </Link>
          
          <button onClick={onClose} className="p-2 text-gray-600">
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>
        
        {/* User Profile Summary */}
        <div className="p-4 border-b">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
              R
            </div>
            <div className="ml-3">
              <p className="font-semibold">Rahul Singh</p>
              <p className="text-sm text-gray-500">320 points</p>
            </div>
          </div>
        </div>
        
        {/* Main Navigation */}
        <div className="p-4">
          <p className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase tracking-wider">
            Main Menu
          </p>
          <div className="space-y-1">
            {navItems.map(item => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center px-2 py-3 rounded-lg ${
                  router.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-rounded mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Featured Items */}
        <div className="p-4 border-t">
          <p className="text-xs font-semibold text-gray-500 px-2 mb-2 uppercase tracking-wider">
            Special Features
          </p>
          <div className="space-y-1">
            {featureItems.map(item => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center px-2 py-3 rounded-lg ${
                  router.pathname === item.path
                    ? 'bg-primary/10 text-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="material-symbols-rounded mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
                {item.badge && (
                  <span className="ml-auto px-2 py-0.5 bg-primary text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
        
        {/* Help & Logout */}
        <div className="p-4 border-t mt-auto">
          <Link href="/help" className="flex items-center px-2 py-3 text-gray-700 hover:bg-gray-100 rounded-lg">
            <span className="material-symbols-rounded mr-3">help</span>
            <span className="font-medium">Help & Support</span>
          </Link>
          
          <button className="flex items-center w-full px-2 py-3 text-red-500 hover:bg-gray-100 rounded-lg">
            <span className="material-symbols-rounded mr-3">logout</span>
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileNavDrawer;
