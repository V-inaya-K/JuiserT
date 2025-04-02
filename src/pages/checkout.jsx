import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';
import Link from 'next/link';

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: 'Green Detox',
    price: 149,
    quantity: 1,
    customizations: ['No Sugar', 'Chia Seeds (+₹20)']
  },
  {
    id: 3,
    name: 'Citrus Immunity',
    price: 129,
    quantity: 2,
    customizations: ['Regular', 'Large (450ml) (+₹50)']
  }
];

export default function CheckoutPage() {
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  
  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      let itemPrice = item.price;
      if (item.customizations.some(c => c.includes('Large'))) {
        itemPrice += 50;
      }
      if (item.customizations.some(c => c.includes('Chia Seeds'))) {
        itemPrice += 20;
      }
      return total + (itemPrice * item.quantity);
    }, 0);
  };
  
  const subtotal = calculateSubtotal();
  const discount = promoApplied ? Math.round(subtotal * 0.10) : 0;
  const deliveryFee = 30;
  const totalAmount = subtotal - discount + deliveryFee;
  
  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'first10') {
      setPromoApplied(true);
    }
  };
  
  const handlePlaceOrder = () => {
    // In a real app, this would submit the order to an API
    router.push('/order-confirmation');
  };
  
  return (
    <AppLayout title="Checkout - JoosT">
      <div className="py-4 pb-24 lg:pb-6 max-w-2xl mx-auto">
        <div className="flex items-center mb-4">
          <button onClick={() => router.back()} className="mr-3">
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>
        
        {/* Order Items */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-medium text-gray-700 mb-3">Order Summary</h2>
          
          <div className="space-y-3">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-start">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                    <span className="material-symbols-rounded text-gray-500">local_drink</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <div className="text-xs text-gray-500">
                      {item.customizations.join(' • ')}
                    </div>
                    <div className="text-sm mt-1">₹{item.price} × {item.quantity}</div>
                  </div>
                </div>
                
                <div className="font-medium">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Delivery Details */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-medium text-gray-700">Delivery Details</h2>
            <Link href="#" className="text-primary text-sm">Change</Link>
          </div>
          
          <div className="flex items-start mb-4">
            <span className="material-symbols-rounded text-gray-500 mr-3">location_on</span>
            <div>
              <p className="font-medium">Office</p>
              <p className="text-sm text-gray-600">123 Work Street, Building A, Floor 5</p>
            </div>
          </div>
          
          <div className="flex items-start">
            <span className="material-symbols-rounded text-gray-500 mr-3">schedule</span>
            <div>
              <p className="font-medium">Delivery Time</p>
              <p className="text-sm text-gray-600">15-20 minutes</p>
            </div>
          </div>
        </div>
        
        {/* Promo Code */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-medium text-gray-700 mb-3">Promo Code</h2>
          
          <div className="flex">
            <input
              type="text"
              className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2"
              placeholder="Enter promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button 
              className="bg-primary text-white px-4 py-2 rounded-r-lg"
              onClick={handleApplyPromo}
            >
              Apply
            </button>
          </div>
          
          {promoApplied && (
            <div className="mt-2 text-green-600 text-sm flex items-center">
              <span className="material-symbols-rounded text-sm mr-1">check_circle</span>
              <span>10% discount applied!</span>
            </div>
          )}
        </div>
        
        {/* Payment Method */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-medium text-gray-700 mb-3">Payment Method</h2>
          
          <div className="space-y-2">
            <label className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="upi"
                  checked={paymentMethod === 'upi'}
                  onChange={() => setPaymentMethod('upi')}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <span className="material-symbols-rounded text-primary mr-2">currency_rupee</span>
                  <div>
                    <div className="font-medium">UPI</div>
                    <div className="text-xs text-gray-500">Google Pay, PhonePe, Paytm</div>
                  </div>
                </div>
              </div>
            </label>
            
            <label className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <span className="material-symbols-rounded text-primary mr-2">credit_card</span>
                  <div>
                    <div className="font-medium">Credit/Debit Card</div>
                    <div className="text-xs text-gray-500">Visa, Mastercard, RuPay</div>
                  </div>
                </div>
              </div>
            </label>
            
            <label className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mr-3"
                />
                <div className="flex items-center">
                  <span className="material-symbols-rounded text-primary mr-2">payments</span>
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-xs text-gray-500">Pay when you receive your order</div>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-medium text-gray-700 mb-3">Price Details</h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            
            {promoApplied && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>- ₹{discount}</span>
              </div>
            )}
            
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            
            <div className="flex justify-between font-semibold text-base pt-2 border-t mt-2">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
        </div>
        
        {/* Place Order Button */}
        <button 
          className="w-full bg-primary text-white py-3 rounded-lg font-medium"
          onClick={handlePlaceOrder}
        >
          Place Order - ₹{totalAmount}
        </button>
      </div>
    </AppLayout>
  );
}
