import React from 'react';
import Link from 'next/link';

const categories = [
  { id: 1, name: 'Detox', icon: '🥬', color: 'bg-green-100' },
  { id: 2, name: 'Energy', icon: '🍓', color: 'bg-red-100' },
  { id: 3, name: 'Protein', icon: '🥜', color: 'bg-yellow-100' },
  { id: 4, name: 'Immunity', icon: '🍊', color: 'bg-orange-100' },
  { id: 5, name: 'Sugar-Free', icon: '🥝', color: 'bg-green-100' },
];

const JuiceCategories = () => {
  return (
    <div className="my-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Categories</h2>
        <Link href="/categories" className="text-primary text-sm">View All</Link>
      </div>
      
      <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar">
        {categories.map(category => (
          <Link 
            href={`/category/${category.id}`} 
            key={category.id} 
            className={`flex flex-col items-center ${category.color} p-3 rounded-lg min-w-[80px]`}
          >
            <div className="text-2xl mb-1">{category.icon}</div>
            <span className="text-xs font-medium">{category.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JuiceCategories;
