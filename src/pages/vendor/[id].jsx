import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/layout/AppLayout';
import Link from 'next/link';

// Sample vendor data - in production, this would come from an API
const vendorData = {
  id: 123,
  name: 'Fresh Squeeze Co.',
  image: '/vendors/vendor1.jpg',
  description: 'Specializing in cold-pressed juices made from locally sourced, organic ingredients.',
  rating: 4.8,
  reviews: 124,
  location: 'Koramangala, Bangalore',
  operationHours: '9:00 AM - 9:00 PM',
  categories: ['Detox', 'Energy', 'Immunity'],
  featured: true,
  videoUrl: 'https://example.com/vendor-video',
  juices: [
    {
      id: 1,
      name: 'Green Detox',
      description: 'Spinach, apple, cucumber, celery',
      price: 149,
      category: 'Detox',
      healthBenefits: ['Improves digestion', 'Boosts immunity', 'Rich in antioxidants'],
      ingredients: ['Fresh spinach', 'Green apple', 'Cucumber', 'Celery', 'Lemon', 'Ginger'],
      image: '/juices/green-detox.jpg',
    },
    {
      id: 2,
      name: 'Berry Blast',
      description: 'Strawberry, blueberry, raspberry',
      price: 179,
      category: 'Energy',
      healthBenefits: ['Rich in antioxidants', 'Boosts energy', 'Improves skin health'],
      ingredients: ['Strawberry', 'Blueberry', 'Raspberry', 'Apple juice', 'Honey'],
      image: '/juices/berry-blast.jpg',
    },
    {
      id: 3,
      name: 'Citrus Immunity',
      description: 'Orange, lemon, ginger, turmeric',
      price: 129,
      category: 'Immunity',
      healthBenefits: ['Boosts immunity', 'Anti-inflammatory', 'Rich in Vitamin C'],
      ingredients: ['Orange', 'Lemon', 'Ginger', 'Turmeric', 'Honey', 'Black pepper'],
      image: '/juices/citrus-immunity.jpg',
    }
  ]
};

export default function VendorDetail() {
  const router = useRouter();
  const { id, table } = router.query;
  const [activeCategory, setActiveCategory] = useState('All');
  const [cart, setCart] = useState([]);
  
  const handleAddToCart = (juice) => {
    setCart([...cart, { ...juice, quantity: 1 }]);
  };
  
  const categories = ['All', ...new Set(vendorData.juices.map(juice => juice.category))];
  
  const filteredJuices = activeCategory === 'All' 
    ? vendorData.juices 
    : vendorData.juices.filter(juice => juice.category === activeCategory);

  return (
    <AppLayout title={`${vendorData.name} - JoosT`}>
      <div className="pb-24">
        {/* Vendor Header */}
        <div className="relative h-40 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="material-symbols-rounded text-5xl">storefront</span>
          </div>
          
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/70 to-transparent text-white">
            <h1 className="text-2xl font-bold">{vendorData.name}</h1>
            <div className="flex items-center text-sm mt-1">
              <div className="flex items-center mr-3">
                <span className="material-symbols-rounded text-yellow-400 mr-1">star</span>
                <span>{vendorData.rating} ({vendorData.reviews})</span>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-rounded mr-1">location_on</span>
                <span>{vendorData.location}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Table Number */}
        {table && (
          <div className="bg-primary/10 p-3 my-3 rounded-lg flex items-center">
            <span className="material-symbols-rounded text-primary mr-2">table_restaurant</span>
            <span className="text-sm">Your table: <strong>#{table}</strong></span>
          </div>
        )}
        
        {/* Vendor Info */}
        <div className="bg-white rounded-xl shadow-sm p-4 my-4">
          <p className="text-gray-600 text-sm">{vendorData.description}</p>
          
          <div className="flex flex-wrap mt-3 gap-2">
            <div className="flex items-center text-xs bg-gray-100 px-2 py-1 rounded">
              <span className="material-symbols-rounded text-gray-500 mr-1 text-sm">schedule</span>
              <span>{vendorData.operationHours}</span>
            </div>
            
            <Link href="#vendor-video" className="flex items-center text-xs bg-accent/10 text-accent px-2 py-1 rounded">
              <span className="material-symbols-rounded mr-1 text-sm">videocam</span>
              <span>Watch Preparation</span>
            </Link>
          </div>
        </div>
        
        {/* Categories */}
        <div className="bg-white sticky top-16 z-30 pt-3 pb-2 px-2 shadow-sm">
          <div className="flex overflow-x-auto no-scrollbar gap-2">
            {categories.map(category => (
              <button
                key={category}
                className={`px-3 py-1.5 rounded-full text-sm whitespace-nowrap ${
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
        
        {/* Juices Menu */}
        <div className="mt-4">
          {filteredJuices.map(juice => (
            <div key={juice.id} className="bg-white rounded-xl shadow-sm p-3 mb-3 flex">
              <div className="w-24 h-24 bg-gray-100 rounded-lg relative flex-shrink-0">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <span className="material-symbols-rounded text-3xl">local_drink</span>
                </div>
              </div>
              
              <div className="flex-1 ml-3">
                <div className="flex justify-between">
                  <h3 className="font-medium">{juice.name}</h3>
                  <span className="font-semibold">₹{juice.price}</span>
                </div>
                <p className="text-gray-500 text-sm">{juice.description}</p>
                
                <div className="flex justify-between items-end mt-1">
                  <Link href={`/juice/${juice.id}`} className="text-primary text-xs">
                    View Details
                  </Link>
                  <button 
                    className="bg-primary text-white text-sm px-3 py-1 rounded-lg flex items-center"
                    onClick={() => handleAddToCart(juice)}
                  >
                    <span className="material-symbols-rounded text-sm mr-1">add</span>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Health Benefits & Transparency Section */}
        <div className="bg-white rounded-xl shadow-sm p-4 my-4">
          <h2 className="font-semibold text-lg mb-3">Health & Transparency</h2>
          <div className="text-sm text-gray-600 space-y-3">
            <div className="flex items-start">
              <span className="material-symbols-rounded text-secondary mr-2">verified</span>
              <p>All ingredients are fresh, locally sourced, and organic whenever possible</p>
            </div>
            <div className="flex items-start">
              <span className="material-symbols-rounded text-secondary mr-2">eco</span>
              <p>No added preservatives, artificial flavors, or refined sugars</p>
            </div>
            <div className="flex items-start">
              <span className="material-symbols-rounded text-secondary mr-2">local_florist</span>
              <p>Cold-pressed to retain maximum nutrients and enzymes</p>
            </div>
          </div>
        </div>
        
        {/* Video Section */}
        <div id="vendor-video" className="bg-white rounded-xl shadow-sm p-4 my-4">
          <h2 className="font-semibold text-lg mb-3">Watch How We Make It</h2>
          <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
            <span className="material-symbols-rounded text-5xl text-gray-400">play_circle</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">See how our juices are freshly prepared with care and quality ingredients</p>
        </div>
        
        {/* Cart Bottom Bar */}
        {cart.length > 0 && (
          <div className="fixed bottom-16 left-0 right-0 bg-white py-3 px-4 shadow-lg border-t">
            <Link href="/checkout" className="bg-primary text-white py-2 rounded-lg flex items-center justify-between">
              <div className="flex items-center">
                <span className="material-symbols-rounded mr-1">shopping_cart</span>
                <span>{cart.length} {cart.length === 1 ? 'item' : 'items'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-1">₹{cart.reduce((total, item) => total + item.price, 0)}</span>
                <span className="material-symbols-rounded">chevron_right</span>
              </div>
            </Link>
            
            <div className="flex justify-center mt-2">
              <Link href="/group-order" className="text-primary text-sm flex items-center">
                <span className="material-symbols-rounded mr-1 text-sm">group</span>
                <span>Start Group Order</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
