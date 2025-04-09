import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';



const Header = () => {
  const { cartCount } = useCart();
  const [showSearch, setShowSearch] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [location, setLocation] = useState("Fetching location...");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            setLocation(data.address.city || data.address.town || "Unknown Location");
          } catch (error) {
            console.error("Error fetching location:", error);
            setLocation("Location unavailable");
          }
        },
        () => setLocation("Location permission denied")
      );
    } else {
      setLocation("Geolocation not supported");
    }
  }, []);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-40 transition-colors">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-display font-bold text-xl text-primary dark:text-white">📍 {location}</span>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2">

            {/* Search, Notifications, Cart */}
            {showSearch ? (
              <div className="flex items-center animate-fade-in">
                <input
                  type="text"
                  placeholder="Search juices, vendors..."
                  className="border rounded-lg px-3 py-1 text-sm w-full"
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="ml-2 p-2 text-gray-600 dark:text-white"
                >
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowSearch(true)} className="p-2 text-gray-600 dark:text-white">
                  <span className="material-symbols-rounded">search</span>
                </button>
                <button
          onClick={toggleDarkMode}
          className="text-gray-600 dark:text-gray-300 hover:text-primary transition"
          aria-label="Toggle Dark Mode">
            <span className="material-symbols-rounded text-2xl">
              {darkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>
                <Link href="/notifications" className="p-2 text-gray-600 dark:text-white">
                  <span className="material-symbols-rounded">notifications</span>
                </Link>
                <Link href="/checkout" className="relative">
      <span className="material-symbols-rounded text-2xl cursor-pointer p-2 text-gray-600 dark:text-white">
        shopping_cart
      </span>
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
          {cartCount}
        </span>
      )}
    </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
