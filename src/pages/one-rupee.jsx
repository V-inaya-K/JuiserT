import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Link from 'next/link';

export default function OneRupeePage() {
  // Mock data for the ₹1 deal
  const dealInfo = {
    nextDealDay: 'Friday',
    nextDealDate: 'June 24, 2023',
    timeSlot: '11:00 AM - 2:00 PM',
    location: 'Green Life Juices, Koramangala',
    eligibleUsers: 10,
    currentRegistrations: 6,
    sponsor: {
      name: 'HealthCare Plus',
      image: '/sponsors/healthcare-plus.jpg'
    },
    termsAndConditions: [
      'Limited to first 10 participants who register for the offer',
      'One ₹1 juice per user per deal day',
      'Offer valid only at the specified location and time',
      'User must be present with the app for verification',
      'Cannot be combined with other offers or discounts'
    ]
  };
  
  return (
    <AppLayout title="₹1 Juice Deal - JoosT">
      <div className="py-4 pb-24 lg:pb-6">
        <h1 className="text-2xl font-semibold mb-4">₹1 Juice Deal</h1>
        
        {/* Promo Banner */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl overflow-hidden relative mb-6">
          <div className="p-6">
            <div className="bg-white/20 text-white inline-block px-2 py-1 rounded-full text-xs font-medium mb-2">
              Special Offer
            </div>
            <h2 className="text-2xl font-bold mb-1">Get Any Juice for Just ₹1</h2>
            <p className="mb-4 text-white/90">Exclusively for 10 lucky JoosT users this week!</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-2">
                  <span className="material-symbols-rounded">calendar_today</span>
                </div>
                <div>
                  <p className="text-xs text-white/80">Next Deal Day</p>
                  <p className="font-semibold">{dealInfo.nextDealDay}, {dealInfo.nextDealDate}</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mr-2">
                  <span className="material-symbols-rounded">schedule</span>
                </div>
                <div>
                  <p className="text-xs text-white/80">Time Slot</p>
                  <p className="font-semibold">{dealInfo.timeSlot}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sponsored Label */}
          <div className="absolute top-4 right-4 flex items-center bg-white/20 px-2 py-1 rounded-full">
            <span className="text-xs">Sponsored by {dealInfo.sponsor.name}</span>
          </div>
        </div>
        
        {/* Registration Status */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Registration Status</h3>
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Spots Available
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm mb-1">
              <span>{dealInfo.currentRegistrations} users registered</span>
              <span>{dealInfo.currentRegistrations}/{dealInfo.eligibleUsers}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-primary rounded-full h-2" 
                style={{ width: `${(dealInfo.currentRegistrations / dealInfo.eligibleUsers) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Only {dealInfo.eligibleUsers - dealInfo.currentRegistrations} spots left! Register now to secure your ₹1 juice.
          </p>
          
          <button className="w-full bg-primary text-white py-3 rounded-lg font-medium">
            Register for This Deal
          </button>
        </div>
        
        {/* Location Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-medium mb-3">Deal Location</h3>
          
          <div className="flex items-start mb-4">
            <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mr-3">
              <span className="material-symbols-rounded text-gray-500">storefront</span>
            </div>
            <div>
              <p className="font-medium">{dealInfo.location}</p>
              <Link href="/vendors/2" className="text-primary text-sm flex items-center mt-1">
                <span className="material-symbols-rounded text-sm mr-1">map</span>
                <span>View on map</span>
              </Link>
            </div>
          </div>
          
          <div className="h-40 bg-gray-200 rounded-lg relative mb-3">
            {/* Map placeholder */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="material-symbols-rounded text-4xl text-gray-400">map</span>
            </div>
          </div>
        </div>
        
        {/* Sponsor Information */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h3 className="font-medium mb-3">Sponsored By</h3>
          
          <div className="flex items-center">
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 mr-4">
              <span className="material-symbols-rounded text-gray-500 text-3xl">business</span>
            </div>
            <div>
              <p className="font-medium">{dealInfo.sponsor.name}</p>
              <p className="text-sm text-gray-600">Health supplements & wellness products</p>
              <Link href="#" className="text-primary text-sm mt-1 inline-block">
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Terms and Conditions */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h3 className="font-medium mb-3">Terms & Conditions</h3>
          
          <ul className="space-y-2">
            {dealInfo.termsAndConditions.map((term, index) => (
              <li key={index} className="flex items-start text-sm">
                <span className="material-symbols-rounded text-gray-500 mr-2 text-sm">navigate_next</span>
                <span className="text-gray-700">{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AppLayout>
  );
}
