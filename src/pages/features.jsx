import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Link from 'next/link';

export default function FeaturesPage() {
  const featureGroups = [
    {
      title: "Special Offers",
      features: [
        {
          name: "₹1 Juice Deal",
          description: "Get premium juices for just ₹1 through our sponsored deals",
          icon: "local_offer",
          path: "/one-rupee", 
          accentColor: "from-pink-500 to-red-500",
          badge: "New"
        }
      ]
    },
    {
      title: "Order Options",
      features: [
        {
          name: "Scan & Order",
          description: "Scan QR codes at vendor outlets to place your order",
          icon: "qr_code_scanner",
          path: "/scan",
          accentColor: "from-blue-500 to-indigo-500"
        },
        {
          name: "Group Order",
          description: "Create a shared order with friends and split the bill easily",
          icon: "group",
          path: "/group-order",
          accentColor: "from-green-500 to-teal-500"
        },
        {
          name: "Pre-booking",
          description: "Schedule juice orders in advance for pickup",
          icon: "event",
          path: "/pre-booking",
          accentColor: "from-yellow-500 to-amber-500"
        }
      ]
    },
    {
      title: "Membership & Rewards",
      features: [
        {
          name: "JoosT Pass",
          description: "Subscribe to regular juice deliveries at discounted rates",
          icon: "card_membership",
          path: "/joost-pass",
          accentColor: "from-purple-500 to-accent",
          badge: "Coming Soon"
        },
        {
          name: "Loyalty Rewards",
          description: "Earn points and unlock rewards with every purchase",
          icon: "workspace_premium",
          path: "/loyalty",
          accentColor: "from-primary-light to-primary"
        }
      ]
    },
    {
      title: "Shopping",
      features: [
        {
          name: "Browse Vendors",
          description: "Discover juice vendors near you",
          icon: "storefront",
          path: "/vendors",
          accentColor: "from-secondary-light to-secondary"
        },
        {
          name: "Health Recommendations",
          description: "AI-powered juice suggestions based on your preferences",
          icon: "psychology",
          path: "/recommendations",
          accentColor: "from-accent-light to-accent"
        }
      ]
    }
  ];

  return (
    <AppLayout title="Features - JoosT">
      <div className="py-4 pb-24">
        <h1 className="text-2xl font-semibold mb-6">Discover JoosT</h1>
        
        {featureGroups.map((group, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-lg font-semibold mb-4">{group.title}</h2>
            <div className="space-y-3">
              {group.features.map((feature, featureIndex) => (
                <Link 
                  href={feature.path} 
                  key={featureIndex}
                  className="block bg-white rounded-xl shadow-sm overflow-hidden"
                >
                  <div className="flex p-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.accentColor} flex items-center justify-center flex-shrink-0 mr-4 text-white`}>
                      <span className="material-symbols-rounded">{feature.icon}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <h3 className="font-medium">{feature.name}</h3>
                        {feature.badge && (
                          <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {feature.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mt-1">{feature.description}</p>
                    </div>
                    <div className="flex items-center ml-2">
                      <span className="material-symbols-rounded text-gray-400">chevron_right</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
