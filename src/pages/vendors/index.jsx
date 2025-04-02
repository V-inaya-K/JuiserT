import React, { useState } from 'react';
import AppLayout from '../../components/layout/AppLayout';
import Link from 'next/link';

// Sample vendors data
const allVendors = [
  {
    id: 1,
    name: 'Fresh Squeeze Co.',
    image: '/vendors/vendor1.jpg',
    location: 'Koramangala, Bangalore',
    rating: 4.8,
    reviews: 124,
    distance: 1.2,
    categories: ['Detox', 'Energy', 'Immunity'],
    featured: true,
    deliveryTime: '10-15 min',
    tags: ['organic', 'sugar-free options']
  },
  {
    id: 2,
    name: 'Green Life Juices',
    image: '/vendors/vendor2.jpg',
    location: 'Indiranagar, Bangalore',
    rating: 4.5,
    reviews: 86,
    distance: 2.8,
    categories: ['Protein', 'Detox'],
    featured: true,
    deliveryTime: '15-20 min',
    tags: ['vegan', 'cold-pressed']
  },
  {
    id: 3,
    name: 'Tropical Juice Bar',
    image: '/vendors/vendor3.jpg',
    location: 'HSR Layout, Bangalore',
    rating: 4.7,
    reviews: 110,
    distance: 3.4,
    categories: ['Energy', 'Immunity'],
    featured: false,
    deliveryTime: '10-15 min',
    tags: ['sugar-free options', 'seasonal fruits']
  },
  {
    id: 4,
    name: 'Vitamin Boost',
    image: '/vendors/vendor4.jpg',
    location: 'Whitefield, Bangalore',
    rating: 4.3,
    reviews: 72,
    distance: 5.1,
    categories: ['Immunity', 'Protein'],
    featured: false,
    deliveryTime: '20-25 min',
    tags: ['immunity booster', 'organic']
  },
  {
    id: 5,
    name: 'Juicy Heaven',
    image: '/vendors/vendor5.jpg',
    location: 'JP Nagar, Bangalore',
    rating: 4.6,
    reviews: 98,
    distance: 2.3,
    categories: ['Detox', 'Energy', 'Protein'],
    featured: false,
    deliveryTime: '15-20 min',
    tags: ['cold-pressed', 'no additives']
  }
];

const filterOptions = {
  categories: ['Detox', 'Energy', 'Immunity', 'Protein', 'Sugar-Free'],
  tags: ['organic', 'sugar-free options', 'vegan', 'cold-pressed', 'seasonal fruits', 'immunity booster', 'no additives'],
  sortOptions: ['Rating', 'Distance', 'Delivery Time']
};

export default function VendorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTags, setActiveTags] = useState([]);
  const [sortBy, setSortBy] = useState('Rating');
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter vendors based on search, category, and tags
  const filteredVendors = allVendors.filter(vendor => {
    // Search term filter
    const matchesSearch = searchTerm === '' || 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Category filter
    const matchesCategory = activeCategory === 'All' || 
      vendor.categories.includes(activeCategory);
    
    // Tags filter
    const matchesTags = activeTags.length === 0 || 
      activeTags.some(tag => vendor.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });
  
  // Sort vendors
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === 'Rating') {
      return b.rating - a.rating;
    } else if (sortBy === 'Distance') {
      return a.distance - b.distance;
    } else if (sortBy === 'Delivery Time') {
      return parseInt(a.deliveryTime) - parseInt(b.deliveryTime);
    }
    return 0;
  });
  
  const handleTagToggle = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };
  
  const clearFilters = () => {
    setActiveCategory('All');
    setActiveTags([]);
    setSortBy('Rating');
  };
  
  return (
    <AppLayout title="Juice Vendors - JoosT">
      <div className="py-4 pb-24 lg:pb-6">
        <h1 className="text-2xl font-semibold mb-4">Juice Vendors</h1>
        
        {/* Search Bar */}
        <div className="mb-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
              <span className="material-symbols-rounded">search</span>
            </span>
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-primary" 
              placeholder="Search vendors or locations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button 
                className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                onClick={() => setSearchTerm('')}
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            )}
          </div>
        </div>
        
        {/* Categories */}
        <div className="mb-4">
          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            <button
              className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap flex-shrink-0 ${
                activeCategory === 'All' 
                  ? 'bg-primary text-white' 
                  : 'bg-gray-100 text-gray-700'
              }`}
              onClick={() => setActiveCategory('All')}
            >
              All
            </button>
            
            {filterOptions.categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap flex-shrink-0 ${
                  activeCategory === category 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Filter & Sort */}
        <div className="flex mb-4 gap-2">
          <button
            className={`flex items-center px-3 py-2 rounded-lg flex-1 border ${showFilters ? 'border-primary text-primary' : 'border-gray-300 text-gray-700'}`}
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="material-symbols-rounded mr-1 text-sm">filter_list</span>
            <span className="text-sm">Filters</span>
            {activeTags.length > 0 && (
              <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeTags.length}
              </span>
            )}
          </button>
          
          <div className="relative flex-1">
            <select
              className="w-full appearance-none border border-gray-300 px-3 py-2 rounded-lg bg-white text-gray-700 text-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="" disabled>Sort by</option>
              {filterOptions.sortOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <span className="material-symbols-rounded text-gray-500">expand_more</span>
            </div>
          </div>
        </div>
        
        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Filter Options</h2>
              <button 
                className="text-primary text-sm"
                onClick={clearFilters}
              >
                Clear All
              </button>
            </div>
            
            <h3 className="text-sm font-medium text-gray-700 mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {filterOptions.tags.map(tag => (
                <button
                  key={tag}
                  className={`px-3 py-1 rounded-full text-xs ${
                    activeTags.includes(tag)
                      ? 'bg-primary/10 border border-primary text-primary'
                      : 'bg-gray-100 text-gray-700'
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Results Count */}
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600 text-sm">
            {sortedVendors.length} vendors found
          </p>
          
          {sortBy && (
            <div className="text-sm text-gray-600 flex items-center">
              <span className="mr-1">Sorted by:</span>
              <span className="font-medium">{sortBy}</span>
            </div>
          )}
        </div>
        
        {/* Vendors List */}
        <div className="space-y-4">
          {sortedVendors.map(vendor => (
            <Link 
              href={`/vendor/${vendor.id}`} 
              key={vendor.id} 
              className="block bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="h-40 bg-gray-200 relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="material-symbols-rounded text-4xl">storefront</span>
                </div>
                
                {vendor.featured && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
                
                <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/70 to-transparent text-white">
                  <h3 className="font-semibold">{vendor.name}</h3>
                  <div className="flex items-center mt-1 text-sm">
                    <span className="material-symbols-rounded text-yellow-400 mr-1 text-sm">star</span>
                    <span>{vendor.rating}</span>
                    <span className="mx-1">•</span>
                    <span>{vendor.reviews} reviews</span>
                  </div>
                </div>
              </div>
              
              <div className="p-3">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <span className="material-symbols-rounded text-sm mr-1">location_on</span>
                  <span>{vendor.location}</span>
                  <span className="mx-1">•</span>
                  <span>{vendor.distance} km</span>
                </div>
                
                <div className="flex flex-wrap gap-1 mb-2">
                  {vendor.categories.map(category => (
                    <div key={category} className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {category}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center text-sm">
                    <span className="material-symbols-rounded text-sm mr-1">schedule</span>
                    <span>{vendor.deliveryTime}</span>
                  </div>
                  
                  <button className="text-primary text-sm font-medium">View Menu</button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
