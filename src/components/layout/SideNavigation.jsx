import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useUser, useClerk } from '@clerk/nextjs';

const SideNavigation = () => {
  const router = useRouter();
  const { isSignedIn, user } = useUser();
  const clerk = useClerk();

  // 🌙 Dark Mode Toggle Logic
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

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

  if (!isSignedIn) return null; // Prevent rendering if user is not signed in

  return (
    <div className="h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 py-6 flex flex-col">
      {/* Logo */}
      <Link href="/" className="flex items-center px-6 mb-8">
        <div className="w-10 h-10 relative mr-2">
          <div className="absolute inset-0 flex items-center justify-center bg-primary text-white rounded-full font-display font-bold text-lg">J</div>
        </div>
        <span className="font-display font-bold text-xl text-primary dark:text-white">JoosT</span>
      </Link>

      {/* User Profile Summary */}
      <div className="mx-4 mb-6 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white text-lg font-bold">
            {user.firstName?.charAt(0) || "U"}
          </div>
          <div className="ml-3">
            <p className="font-semibold text-sm dark:text-white">{user.firstName} {user.lastName}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{user.publicMetadata?.points || 0} points</p>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="flex-1">
        <div className="px-4 mb-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2 uppercase tracking-wider">Main Menu</h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center px-2 py-2 rounded-lg ${
                  router.pathname === item.path
                    ? 'bg-primary/10 text-primary dark:text-yellow-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <span className="material-symbols-rounded mr-3">{item.icon}</span>
                <span className="text-sm font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-4">
          <h2 className="text-xs font-semibold text-gray-500 dark:text-gray-400 px-2 mb-2 uppercase tracking-wider">Special Features</h2>
          <div className="space-y-1">
            {featureItems.map((item) => (
              <Link
                href={item.path}
                key={item.name}
                className={`flex items-center px-2 py-2 rounded-lg ${
                  router.pathname === item.path
                    ? 'bg-primary/10 text-primary dark:text-yellow-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
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
      <div className="px-4 mt-6 border-t pt-4 dark:border-gray-700">
        <Link href="/help" className="flex items-center px-2 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
          <span className="material-symbols-rounded mr-3">help</span>
          <span className="text-sm font-medium">Help & Support</span>
        </Link>

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="flex w-full items-center px-2 py-2 text-gray-700 dark:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mt-2"
        >
          <span className="material-symbols-rounded mr-3">
            {darkMode ? "dark_mode" : "light_mode"}
          </span>
          <span className="text-sm font-medium">
            {darkMode ? "Dark Mode On" : "Dark Mode Off"}
          </span>
        </button>

        {/* 🔴 Logout Button */}
        <button 
          onClick={() => clerk.signOut(() => router.push('/auth'))} 
          className="flex w-full items-center px-2 py-2 text-red-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg mt-2"
        >
          <span className="material-symbols-rounded mr-3">logout</span>
          <span className="text-sm font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideNavigation;
