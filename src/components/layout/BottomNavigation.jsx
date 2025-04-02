import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const BottomNavigation = () => {
  const router = useRouter();
  
  const navItems = [
    { name: 'Home', path: '/', icon: 'home' },
    { name: 'Discover', path: '/features', icon: 'auto_awesome' },
    { name: 'Scan', path: '/scan', icon: 'qr_code_scanner' },
    { name: 'Orders', path: '/orders', icon: 'receipt_long' },
    { name: 'Profile', path: '/profile', icon: 'person' },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <Link 
            href={item.path} 
            key={item.name}
            className={`flex flex-col items-center justify-center px-2 py-1 ${
              router.pathname === item.path ? 'text-primary' : 'text-gray-600'
            }`}
          >
            <span className="material-symbols-rounded text-[22px]">{item.icon}</span>
            <span className="text-xs mt-1">{item.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation;
