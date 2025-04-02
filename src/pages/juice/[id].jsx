import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../../components/layout/AppLayout';
import Link from 'next/link';

// Sample juice data - in production, this would come from an API
const juiceData = {
  id: 1,
  name: 'Green Detox',
  description: 'A refreshing blend of leafy greens and fruits that helps detoxify your body.',
  price: 149,
  category: 'Detox',
  rating: 4.7,
  reviews: 86,
  image: '/juices/green-detox.jpg',
  healthBenefits: [
    'Improves digestion',
    'Boosts immunity',
    'Rich in antioxidants',
    'Helps with weight management',
    'Reduces inflammation'
  ],
  ingredients: [
    { name: 'Fresh spinach', quantity: '50g' },
    { name: 'Green apple', quantity: '1 medium' },
    { name: 'Cucumber', quantity: '50g' },
    { name: 'Celery', quantity: '25g' },
    { name: 'Lemon', quantity: '10ml' },
    { name: 'Ginger', quantity: '5g' }
  ],
  nutritionalValues: {
    calories: 120,
    protein: 2.5,
    carbs: 25,
    fat: 0.5,
    fiber: 4.5
  },
  customizationOptions: [
    {
      name: 'Sugar Level',
      options: ['No Sugar', 'Less Sweet', 'Regular']
    },
    {
      name: 'Add-ons',
      options: ['Chia Seeds (+₹20)', 'Protein Powder (+₹30)', 'Aloe Vera (+₹15)']
    },
    {
      name: 'Size',
      options: ['Regular (300ml)', 'Large (450ml) (+₹50)']
    }
  ]
};

export default function JuiceDetail() {
  const router = useRouter();
  const { id } = router.query;
  
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({
    'Sugar Level': 'Regular',
    'Add-ons': [],
    'Size': 'Regular (300ml)'
  });
  
  const handleOptionChange = (category, option) => {
    if (category === 'Add-ons') {
      // For add-ons, we allow multiple selections
      const updatedAddOns = selectedOptions['Add-ons'].includes(option)
        ? selectedOptions['Add-ons'].filter(item => item !== option)
        : [...selectedOptions['Add-ons'], option];
      
      setSelectedOptions({
        ...selectedOptions,
        'Add-ons': updatedAddOns
      });
    } else {
      // For other options, just update the selection
      setSelectedOptions({
        ...selectedOptions,
        [category]: option
      });
    }
  };
  
  const calculateTotalPrice = () => {
    let total = juiceData.price * quantity;
    
    // Add price for add-ons
    selectedOptions['Add-ons'].forEach(addon => {
      const priceMatch = addon.match(/\+₹(\d+)/);
      if (priceMatch && priceMatch[1]) {
        total += parseInt(priceMatch[1]) * quantity;
      }
    });
    
    // Add price for size upgrade
    if (selectedOptions['Size'].includes('Large')) {
      const priceMatch = selectedOptions['Size'].match(/\+₹(\d+)/);
      if (priceMatch && priceMatch[1]) {
        total += parseInt(priceMatch[1]) * quantity;
      }
    }
    
    return total;
  };

  return (
    <AppLayout title={`${juiceData.name} - JoosT`}>
      <div className="pb-24">
        {/* Juice Image */}
        <div className="relative h-64 bg-gray-200">
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <span className="material-symbols-rounded text-6xl">local_drink</span>
          </div>
          
          <button 
            onClick={() => router.back()} 
            className="absolute top-4 left-4 bg-white/80 rounded-full p-2"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          
          <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2">
            <span className="material-symbols-rounded">favorite_border</span>
          </div>
        </div>
        
        {/* Juice Details */}
        <div className="bg-white p-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{juiceData.name}</h1>
              <p className="text-gray-600">{juiceData.description}</p>
            </div>
            <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-lg">
              ₹{juiceData.price}
            </div>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="flex items-center text-yellow-500">
              <span className="material-symbols-rounded">star</span>
              <span className="ml-1">{juiceData.rating}</span>
            </div>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{juiceData.reviews} reviews</span>
            <span className="mx-2 text-gray-300">|</span>
            <span className="text-gray-500">{juiceData.category}</span>
          </div>
        </div>
        
        {/* Customization */}
        <div className="bg-white mt-2 p-4">
          <h2 className="font-semibold text-lg mb-3">Customize Your Juice</h2>
          
          {juiceData.customizationOptions.map((category, idx) => (
            <div key={idx} className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.options.map((option, optionIdx) => (
                  <button
                    key={optionIdx}
                    className={`px-3 py-1.5 rounded-full text-sm border ${
                      category.name === 'Add-ons'
                        ? selectedOptions[category.name].includes(option)
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'border-gray-300 text-gray-700'
                        : selectedOptions[category.name] === option
                          ? 'bg-primary/10 border-primary text-primary'
                          : 'border-gray-300 text-gray-700'
                    }`}
                    onClick={() => handleOptionChange(category.name, option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          
          {/* Quantity Selector */}
          <div className="mb-4">
            <h3 className="font-medium text-gray-700 mb-2">Quantity</h3>
            <div className="flex items-center">
              <button 
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              >
                <span className="material-symbols-rounded">remove</span>
              </button>
              <span className="mx-4 font-medium">{quantity}</span>
              <button 
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center"
                onClick={() => setQuantity(quantity + 1)}
              >
                <span className="material-symbols-rounded">add</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Health Benefits */}
        <div className="bg-white mt-2 p-4">
          <h2 className="font-semibold text-lg mb-3">Health Benefits</h2>
          <div className="grid grid-cols-1 gap-2">
            {juiceData.healthBenefits.map((benefit, idx) => (
              <div key={idx} className="flex items-center">
                <span className="material-symbols-rounded text-secondary mr-2">check_circle</span>
                <span className="text-gray-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Ingredients */}
        <div className="bg-white mt-2 p-4">
          <h2 className="font-semibold text-lg mb-3">Ingredients</h2>
          <div className="grid grid-cols-2 gap-3">
            {juiceData.ingredients.map((ingredient, idx) => (
              <div key={idx} className="bg-gray-50 p-2 rounded flex flex-col items-center">
                <span className="text-gray-700 font-medium">{ingredient.name}</span>
                <span className="text-gray-500 text-sm">{ingredient.quantity}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Nutritional Information */}
        <div className="bg-white mt-2 p-4">
          <h2 className="font-semibold text-lg mb-3">Nutritional Information</h2>
          <div className="grid grid-cols-5 gap-2 text-center">
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-primary font-medium">{juiceData.nutritionalValues.calories}</div>
              <div className="text-xs text-gray-500">Calories</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-primary font-medium">{juiceData.nutritionalValues.protein}g</div>
              <div className="text-xs text-gray-500">Protein</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-primary font-medium">{juiceData.nutritionalValues.carbs}g</div>
              <div className="text-xs text-gray-500">Carbs</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-primary font-medium">{juiceData.nutritionalValues.fat}g</div>
              <div className="text-xs text-gray-500">Fat</div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <div className="text-primary font-medium">{juiceData.nutritionalValues.fiber}g</div>
              <div className="text-xs text-gray-500">Fiber</div>
            </div>
          </div>
        </div>
        
        {/* Pre-booking Option */}
        <div className="bg-white mt-2 p-4">
          <h2 className="font-semibold text-lg mb-2">Pre-book for Later</h2>
          <p className="text-gray-600 text-sm mb-3">Schedule your juice for a specific time slot</p>
          
          <Link href="/pre-booking" className="flex items-center justify-between px-4 py-3 border border-primary rounded-lg">
            <div className="flex items-center text-primary">
              <span className="material-symbols-rounded mr-2">event</span>
              <span>Schedule for Later</span>
            </div>
            <span className="material-symbols-rounded text-primary">chevron_right</span>
          </Link>
        </div>
        
        {/* Add to Cart Button */}
        <div className="fixed bottom-16 left-0 right-0 bg-white py-3 px-4 shadow-lg border-t">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Total Price</span>
            <span className="font-bold text-xl">₹{calculateTotalPrice()}</span>
          </div>
          
          <div className="flex gap-2">
            <Link 
              href="/group-order" 
              className="flex-1 border border-primary text-primary py-2 rounded-lg text-center"
            >
              Group Order
            </Link>
            <button className="flex-1 bg-primary text-white py-2 rounded-lg">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
