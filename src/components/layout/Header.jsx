import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const Header = () => {
  const [showSearch, setShowSearch] = useState(false);
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

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* <div className="w-10 h-10 relative mr-2">
              <div className="absolute inset-0 flex items-center justify-center bg-primary text-white rounded-full font-display font-bold text-lg">📍</div>
            </div> */}
            <span className="font-display font-bold text-xl text-primary">📍 {location}</span>
          </div>

          <div className="flex items-center gap-1">
            {showSearch ? (
              <div className="flex items-center animate-fade-in">
                <input 
                  type="text" 
                  placeholder="Search juices, vendors..." 
                  className="border rounded-lg px-3 py-1 text-sm w-full"
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="ml-2 p-2 text-gray-600"
                >
                  <span className="material-symbols-rounded">close</span>
                </button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowSearch(true)} className="p-2 text-gray-600">
                  <span className="material-symbols-rounded">search</span>
                </button>
                <Link href="/notifications" className="p-2 text-gray-600">
                  <span className="material-symbols-rounded">notifications</span>
                </Link>
                <Link href="/cart" className="p-2 text-gray-600">
                  <span className="material-symbols-rounded">shopping_cart</span>
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
