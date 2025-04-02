import React from 'react';
import Link from 'next/link';

const vendors = [
  {
    id: 1,
    name: 'Fresh Squeeze Co.',
    image: '/vendors/vendor1.jpg',
    rating: 4.8,
    deliveryTime: '10-15 min',
    featured: true
  },
  {
    id: 2,
    name: 'Green Life Juices',
    image: '/vendors/vendor2.jpg',
    rating: 4.5,
    deliveryTime: '15-20 min',
    featured: true
  },
  {
    id: 3,
    name: 'Tropical Juice Bar',
    image: '/vendors/vendor3.jpg',
    rating: 4.7,
    deliveryTime: '10-15 min',
    featured: false
  }
];

const FeaturedVendors = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Featured Vendors</h2>
        <Link href="/vendors" className="text-primary text-sm">View All</Link>
      </div>
      
      <div className="grid gap-4">
        {vendors.map(vendor => (
          <Link href={`/vendor/${vendor.id}`} key={vendor.id} className="juice-card flex bg-white">
            <div className="w-24 h-24 bg-gray-200 relative">
              {/* Vendor image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="material-symbols-rounded text-3xl">storefront</span>
              </div>
              
              {vendor.featured && (
                <div className="absolute top-0 left-0 bg-primary text-white text-xs px-2 py-1">
                  Featured
                </div>
              )}
            </div>
            
            <div className="p-3">
              <h3 className="font-medium">{vendor.name}</h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <div className="flex items-center text-yellow-500 mr-2">
                  <span className="material-symbols-rounded text-sm">star</span>
                  <span>{vendor.rating}</span>
                </div>
                <div className="flex items-center">
                  <span className="material-symbols-rounded text-sm">schedule</span>
                  <span>{vendor.deliveryTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedVendors;
