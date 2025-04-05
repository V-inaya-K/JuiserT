import React from 'react';
import Link from 'next/link';

const juices = [
  {
    id: 1,
    name: 'Green Detox',
    description: 'Spinach, apple, cucumber, celery',
    price: 149,
    image: '/juices/green-detox.jpg',
    category: 'Detox',
  },
  {
    id: 2,
    name: 'Berry Blast',
    description: 'Strawberry, blueberry, raspberry',
    price: 179,
    image: '/juices/berry-blast.jpg',
    category: 'Energy',
  },
  {
    id: 3,
    name: 'Citrus Immunity',
    description: 'Orange, lemon, ginger, turmeric',
    price: 129,
    image: '/juices/citrus-immunity.jpg',
    category: 'Immunity',
  },
  {
    id: 4,
    name: 'Protein Powerhouse',
    description: 'Banana, peanut butter, almond milk, protein',
    price: 199,
    image: '/juices/protein-powerhouse.jpg',
    category: 'Protein',
  }
];

const RecommendedJuices = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recommended for You</h2>
        <Link href="/juices" className="text-primary text-sm">View All</Link>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-black dark:text-black">
        {juices.map(juice => (
          <Link href={`/juice/${juice.id}`} key={juice.id} className="juice-card bg-white">
            <div className="h-36 bg-gray-100 relative">
              {/* Juice image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <span className="material-symbols-rounded text-3xl">local_drink</span>
              </div>
              
              <div className="absolute top-2 left-2 bg-white rounded-full px-2 py-1 text-xs font-medium">
                {juice.category}
              </div>
            </div>
            
            <div className="p-3">
              <h3 className="font-medium truncate">{juice.name}</h3>
              <p className="text-xs text-gray-500 line-clamp-1">{juice.description}</p>
              <div className="flex justify-between items-center mt-2">
                <span className="font-semibold">₹{juice.price}</span>
                <button className="text-primary">
                  <span className="material-symbols-rounded">add_circle</span>
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJuices;
