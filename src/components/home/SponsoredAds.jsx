import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const sponsoredAds = [
  {
    id: 1,
    title: "HealthCare Plus",
    description: "Natural supplements for active lifestyles",
    image: "/sponsors/healthcare-plus-banner.jpg",
    backgroundColor: "#FEF2F2",
    textColor: "#991B1B",
    ctaText: "Shop Now",
    url: "/sponsors/healthcare-plus"
  },
  {
    id: 2,
    title: "Organic Farms Co.",
    description: "Farm-fresh produce delivered to your door",
    image: "/sponsors/organic-farms-banner.jpg",
    backgroundColor: "#ECFDF5",
    textColor: "#065F46",
    ctaText: "Learn More",
    url: "/sponsors/organic-farms"
  },
  {
    id: 3,
    title: "Fitness World",
    description: "50% off on new memberships this month",
    image: "/sponsors/fitness-world-banner.jpg",
    backgroundColor: "#EFF6FF",
    textColor: "#1E40AF",
    ctaText: "Get Offer",
    url: "/sponsors/fitness-world"
  }
];

const SponsoredAds = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-rotate slides every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sponsoredAds.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };
  
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">Sponsored</h2>
          <div className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Ad</div>
        </div>
      </div>
      
      <div className="relative rounded-xl overflow-hidden shadow-md">
        {/* Slides */}
        <div className="relative h-36 md:h-48">
          {sponsoredAds.map((ad, index) => (
            <div 
              key={ad.id}
              className={`absolute inset-0 transition-opacity duration-500 ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
              style={{ backgroundColor: ad.backgroundColor }}
            >
              <Link href={ad.url} className="block h-full">
                <div className="flex h-full items-center px-6">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg" style={{ color: ad.textColor }}>{ad.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{ad.description}</p>
                    <button 
                      className="mt-3 px-4 py-1 rounded-full text-sm font-medium"
                      style={{ backgroundColor: ad.textColor, color: 'white' }}
                    >
                      {ad.ctaText}
                    </button>
                  </div>
                  <div className="w-20 h-20 flex-shrink-0 bg-gray-200 rounded-lg ml-4">
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="material-symbols-rounded text-3xl">business</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
        
        {/* Pagination dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-20">
          {sponsoredAds.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? 'bg-primary' : 'bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      <div className="text-xs text-center text-gray-500 mt-2">
        Sponsored ads help keep our juice prices affordable
      </div>
    </div>
  );
};

export default SponsoredAds;
