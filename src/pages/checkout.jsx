import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, cartCount, removeFromCart, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      let itemPrice = item.price;

      item.selectedOptions?.['Add-ons']?.forEach((addon) => {
        const match = addon.match(/\+₹(\d+)/);
        if (match?.[1]) itemPrice += parseInt(match[1]);
      });

      const sizeMatch = item.selectedOptions?.['Size']?.match(/\+₹(\d+)/);
      if (sizeMatch?.[1]) itemPrice += parseInt(sizeMatch[1]);

      return total + itemPrice * item.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const deliveryFee = 30;
  const totalAmount = subtotal - discount + deliveryFee;

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === 'first10') {
      setPromoApplied(true);
    }
  };

  const handlePlaceOrder = async () => {
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmount * 100 }),
    });

    const data = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: 'INR',
      name: 'JoosT Juices',
      description: 'Fresh Juice Order',
      order_id: data.id,
      handler: function (response) {
        clearCart();
        router.push('/order-confirmation');
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999',
      },
      theme: { color: '#10b981' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <AppLayout title="Checkout - JoosT">
      <div className="py-4 pb-24 max-w-2xl mx-auto ">
        <div className="flex items-center mb-4">
          <button onClick={() => router.back()} className="mr-3">
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <h1 className="text-2xl font-semibold">Checkout</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 text-black dark:text-white">
            Your cart is empty.
          </div>
        ) : (
          <>
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 text-black dark:text-black">
              <h2 className="font-medium text-gray-700 mb-3">Order Summary</h2>
              <div className="space-y-3">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="relative flex justify-between border-b pb-3"
                  >
                    <div>
                      <div className="font-medium">{item.name}</div>

                      {item.selectedOptions && (
                        <div className="text-xs text-gray-500 mt-1">
                          {Object.entries(item.selectedOptions).map(([label, value]) => (
                            <div key={label}>
                              <strong>{label}:</strong>{' '}
                              {Array.isArray(value) ? value.join(', ') : value}
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="text-sm text-gray-700 mt-1">
                        Base: ₹{item.price} × {item.quantity || 1}
                      </div>

                      <div className="text-sm font-medium text-gray-800 mt-1">
                        Subtotal: ₹
                        {(() => {
                          let base = item.price;
                          let extra = 0;
                          const quantity = item.quantity || 1;
                          item.selectedOptions?.['Add-ons']?.forEach((addon) => {
                            const match = addon.match(/\+₹(\d+)/);
                            if (match?.[1]) extra += parseInt(match[1]);
                          });

                          const sizeMatch = item.selectedOptions?.['Size']?.match(/\+₹(\d+)/);
                          if (sizeMatch?.[1]) extra += parseInt(sizeMatch[1]);

                          return (base + extra) * quantity;
                        })()}
                      </div>
                    </div>

                    {/* 🗑️ Remove button */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-0 right-0 text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Promo Code */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
              <h2 className="font-medium text-gray-700 mb-3">Promo Code</h2>
              <div className="flex p-4">
                <input
                  type="text"
                  className="flex-1 border border-gray-300 rounded-l-lg px-3 py-2 text-black dark:text-black"
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
            <div className="bg-white rounded-xl shadow-sm p-4 mb-4 text-black dark:text-black">
              <h2 className="font-medium text-gray-700 mb-3">Payment Method</h2>
              <div className="space-y-2">
                {['upi', 'card', 'cod'].map((method) => (
                  <label key={method} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="mr-3"
                      />
                      <div className="capitalize font-medium">
                        {method === 'cod' ? 'Cash on Delivery' : method.toUpperCase()}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Details */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-6 text-black dark:text-black">
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

            {/* Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium"
            >
              Place Order - ₹{totalAmount}
            </button>
          </>
        )}
      </div>
    </AppLayout>
  );
}

