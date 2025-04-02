import React from 'react';
import Link from 'next/link';

// Mock data for AI recommendations - in a real app, this would come from a backend
const aiRecommendations = [
  {
    id: 1,
    name: 'Morning Immunity Boost',
    description: 'Based on your recent orders and health goals',
    juices: [
      {
        id: 3,
        name: 'Citrus Immunity',
        image: '/juices/citrus-immunity.jpg',
        reason: 'Rich in Vitamin C to boost your immunity'
      },
      {
        id: 5,
        name: 'Ginger Zinger',
        image: '/juices/ginger-zinger.jpg',
        reason: 'Anti-inflammatory properties for morning freshness'
      }
    ]
  },
  {
    id: 2,
    name: 'Post-Workout Recovery',
    description: 'Perfect after your evening gym sessions',
    juices: [
      {
        id: 4,
        name: 'Protein Powerhouse',
        image: '/juices/protein-powerhouse.jpg',
        reason: 'High protein content for muscle recovery'
      },
      {
        id: 6,
        name: 'Electrolyte Replenisher',
        image: '/juices/electrolyte.jpg',
        reason: 'Replenishes minerals lost during workout'
      }
    ]
  }
];

const AIRecommendations = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">AI Suggestions</h2>
          <div className="ml-2 bg-accent/10 text-accent text-xs px-2 py-1 rounded-full flex items-center">
            <span className="material-symbols-rounded text-xs mr-1">psychology</span>
            <span>Smart</span>
          </div>
        </div>
        <Link href="/recommendations" className="text-primary text-sm">View All</Link>
      </div>
      
      <div className="space-y-4">
        {aiRecommendations.map(recommendation => (
          <div key={recommendation.id} className="bg-white rounded-xl shadow-sm p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{recommendation.name}</h3>
                <p className="text-xs text-gray-500">{recommendation.description}</p>
              </div>
              <div className="bg-accent/10 p-1 rounded-full">
                <span className="material-symbols-rounded text-accent">auto_awesome</span>
              </div>
            </div>
            
            <div className="mt-3 space-y-3">
              {recommendation.juices.map(juice => (
                <Link href={`/juice/${juice.id}`} key={juice.id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg relative flex-shrink-0">
                    <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                      <span className="material-symbols-rounded">local_drink</span>
                    </div>
                  </div>
                  
                  <div className="ml-3">
                    <h4 className="font-medium text-sm">{juice.name}</h4>
                    <p className="text-xs text-gray-500">{juice.reason}</p>
                  </div>
                  
                  <button className="ml-auto text-primary">
                    <span className="material-symbols-rounded">add_circle</span>
                  </button>
                </Link>
              ))}
            </div>
            
            <div className="mt-3 text-right">
              <button className="text-accent text-sm font-medium flex items-center ml-auto">
                <span className="material-symbols-rounded text-sm mr-1">shopping_bag</span>
                Order Bundle
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendations;
