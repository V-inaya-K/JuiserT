import React from 'react';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl overflow-hidden my-4">
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-20">
        {/* Background pattern */}
        <svg className="h-full w-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="#FFFFFF" d="M42.8,-73.2C56.9,-66.7,70.8,-58,78.1,-45.1C85.4,-32.2,86.2,-16.1,83.8,-1.4C81.5,13.4,76.1,26.7,68.9,39.5C61.8,52.3,52.8,64.6,40.9,70.8C28.9,77,14.5,77.2,-0.2,77.5C-14.9,77.8,-29.7,78.3,-41.9,72.5C-54.2,66.7,-63.8,54.7,-71.2,41.6C-78.6,28.4,-83.8,14.2,-84.3,-0.3C-84.9,-14.8,-80.8,-29.5,-72.6,-41.8C-64.3,-54.1,-51.8,-63.9,-38.3,-70.6C-24.9,-77.2,-12.4,-80.6,0.8,-81.9C14,-83.3,28.7,-79.7,42.8,-73.2Z" transform="translate(100 100)" />
        </svg>
      </div>
      
      <div className="relative p-6 z-10">
        <h1 className="text-2xl font-bold mb-2">Fresh & Healthy Juices</h1>
        <p className="text-white/80 mb-4">Order now from our partner vendors</p>
        
        <div className="flex flex-wrap gap-3">
          <Link href="/scan" className="bg-white text-primary font-semibold py-2 px-4 rounded-lg flex items-center">
            <span className="material-symbols-rounded mr-1">qr_code_scanner</span>
            Scan & Order
          </Link>
          <Link href="/vendors" className="bg-white/20 text-white font-semibold py-2 px-4 rounded-lg flex items-center">
            <span className="material-symbols-rounded mr-1">storefront</span>
            Find Vendors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
