import React, { useState } from 'react';
import AppLayout from '../components/layout/AppLayout';
import Link from 'next/link';

const subscriptionPlans = [
  {
    id: 'weekly',
    name: 'Weekly Detox',
    price: 599,
    duration: 'week',
    features: [
      '5 Juices per week',
      'Detox and Immunity boosting selection',
      'Weekly health report',
      'Priority service at outlets'
    ],
    recommended: false
  },
  {
    id: 'monthly',
    name: 'Monthly Health Plan',
    price: 1999,
    duration: 'month',
    features: [
      '20 Juices per month',
      'Customizable juice selection',
      'Monthly health consultation',
      'Exclusive vendor deals & discounts',
      'Free home delivery twice a month'
    ],
    recommended: true
  },
  {
    id: 'quarterly',
    name: 'Quarterly Wellness',
    price: 5499,
    duration: '3 months',
    features: [
      '65 Juices over 3 months',
      'Personalized nutrition plan',
      'Quarterly health assessment',
      'Premium membership benefits',
      'Unlimited free deliveries'
    ],
    recommended: false
  }
];

export default function JoostPassPage() {
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  
  return (
    <AppLayout title="JoosT Pass - Subscription Plans">
      <div className="py-4 text-black dark:text-black">
        <div className="bg-gradient-to-br from-accent to-accent-dark text-white p-6 rounded-xl mb-6">
          <h1 className="text-2xl font-bold mb-2">JoosT Pass</h1>
          <p className="text-white/90 mb-4">Subscribe to our health plans for regular juice deliveries and exclusive benefits</p>
          <div className="flex items-center">
            <span className="material-symbols-rounded mr-2">new_releases</span>
            <span className="text-sm font-medium">Coming Soon</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Choose Your Plan</h2>
            <div className="bg-gray-100 text-xs px-2 py-1 rounded-full">Early Access</div>
          </div>
          
          <div className="space-y-4">
            {subscriptionPlans.map(plan => (
              <div 
                key={plan.id}
                className={`border rounded-lg p-4 relative ${
                  selectedPlan === plan.id 
                    ? 'border-accent' 
                    : 'border-gray-200'
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{plan.name}</h3>
                    <p className="text-gray-500 text-sm">Billed per {plan.duration}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold">₹{plan.price}</div>
                    <div className="text-gray-500 text-xs">per {plan.duration}</div>
                  </div>
                </div>
                
                <div className="mt-3 space-y-2">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="material-symbols-rounded text-accent mr-2 text-sm">check_circle</span>
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4">
                  <div className="w-full h-6 relative">
                    <div className={`absolute inset-y-0 left-0 w-5 h-5 rounded-full border-2 ${
                      selectedPlan === plan.id 
                        ? 'border-accent' 
                        : 'border-gray-300'
                    }`}>
                      {selectedPlan === plan.id && (
                        <div className="absolute inset-0 m-1 rounded-full bg-accent"></div>
                      )}
                    </div>
                    <div className="absolute inset-y-0 left-7 right-0 text-sm">
                      {selectedPlan === plan.id ? 'Selected' : 'Select Plan'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6 text-black dark:text-black">
          <h2 className="text-lg font-semibold mb-4">JoosT Pass Benefits</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <span className="material-symbols-rounded text-secondary">savings</span>
              </div>
              <div>
                <h3 className="font-medium">Save up to 25%</h3>
                <p className="text-sm text-gray-600">Significant savings compared to regular purchases</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <span className="material-symbols-rounded text-secondary">health_and_safety</span>
              </div>
              <div>
                <h3 className="font-medium">Health Tracking</h3>
                <p className="text-sm text-gray-600">Track your wellness journey with nutritional insights</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <span className="material-symbols-rounded text-secondary">diamond</span>
              </div>
              <div>
                <h3 className="font-medium">Premium Benefits</h3>
                <p className="text-sm text-gray-600">Priority service, exclusive deals, and special events</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <span className="material-symbols-rounded text-secondary">calendar_month</span>
              </div>
              <div>
                <h3 className="font-medium">Flexible Scheduling</h3>
                <p className="text-sm text-gray-600">Pause, reschedule or customize your deliveries anytime</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 text-black dark:text-black">
          <h2 className="text-lg font-semibold mb-2">How It Works</h2>
          
          <div className="space-y-4 mt-4">
            <div className="flex items-start">
              <div className="bg-accent/10 w-8 h-8 rounded-full flex items-center justify-center text-accent font-bold mr-3 flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="font-medium">Choose Your Plan</h3>
                <p className="text-sm text-gray-600">Select a subscription that fits your health goals</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-accent/10 w-8 h-8 rounded-full flex items-center justify-center text-accent font-bold mr-3 flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="font-medium">Customize Your Selection</h3>
                <p className="text-sm text-gray-600">Pick your favorite juices or let us suggest options</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-accent/10 w-8 h-8 rounded-full flex items-center justify-center text-accent font-bold mr-3 flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="font-medium">Enjoy Regular Deliveries</h3>
                <p className="text-sm text-gray-600">Get fresh juices at your preferred frequency</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mt-6">
          <button className="w-full bg-accent text-white py-3 rounded-lg font-medium flex justify-center items-center">
            <span className="material-symbols-rounded mr-2">notifications</span>
            Notify Me When Available
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">Coming soon to select cities</p>
        </div>
      </div>
    </AppLayout>
  );
}
