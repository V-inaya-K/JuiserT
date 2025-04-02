import React from 'react';
import Link from 'next/link';

const featuredActions = [
  {
    name: '₹1 Juice Deal',
    description: 'Limited offer, grab yours!',
    path: '/one-rupee',
    icon: 'local_offer',
    bgClass: 'bg-gradient-to-r from-pink-500 to-red-500',
    badge: 'New'
  },
  {
    name: 'Group Order',
    description: 'Order together, split payments',
    path: '/group-order',
    icon: 'group',
    bgClass: 'bg-gradient-to-r from-blue-500 to-indigo-500'
  },
  {
    name: 'JoosT Pass',
    description: 'Subscription savings',
    path: '/joost-pass',
    icon: 'card_membership',
    bgClass: 'bg-gradient-to-r from-purple-500 to-accent'
  }
];

const FeaturedActions = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Featured Actions</h2>
        <Link href="/features" className="text-primary text-sm flex items-center">
          <span>Explore All</span>
          <span className="material-symbols-rounded text-sm ml-1">arrow_forward</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredActions.map(action => (
          <Link 
            href={action.path} 
            key={action.name}
            className="block rounded-xl overflow-hidden juice-card"
          >
            <div className={`${action.bgClass} p-4 text-white relative`}>
              <span className="material-symbols-rounded text-3xl mb-1">{action.icon}</span>
              <h3 className="font-semibold text-lg">{action.name}</h3>
              <p className="text-white/80 text-sm">{action.description}</p>
              
              {action.badge && (
                <div className="absolute top-2 right-2 bg-white text-primary text-xs px-2 py-0.5 rounded-full font-medium">
                  {action.badge}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedActions;
