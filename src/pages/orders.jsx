import React, { useState } from 'react';
import Link from 'next/link';
import AppLayout from '../components/layout/AppLayout';

// Sample orders data
const orders = [
  {
    id: 'OD1234567',
    date: '15 Jun 2023',
    vendor: 'Fresh Squeeze Co.',
    items: ['Green Detox', 'Berry Blast'],
    total: 328,
    status: 'delivered'
  },
  {
    id: 'OD1234568',
    date: '10 Jun 2023',
    vendor: 'Green Life Juices',
    items: ['Citrus Immunity'],
    total: 129,
    status: 'delivered'
  },
  {
    id: 'OD1234569',
    date: '5 Jun 2023',
    vendor: 'Tropical Juice Bar',
    items: ['Protein Powerhouse', 'Mango Tango'],
    total: 375,
    status: 'delivered'
  }
];

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState('past');
  
  return (
    <AppLayout title="My Orders - JoosT">
      <div className="py-4">
        <h1 className="text-2xl font-semibold mb-4">My Orders</h1>
        
        <div className="bg-gray-100 rounded-lg p-1 flex mb-6">
          <button 
            className={`flex-1 py-2 rounded-md text-center ${activeTab === 'active' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active
          </button>
          <button 
            className={`flex-1 py-2 rounded-md text-center ${activeTab === 'past' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Orders
          </button>
        </div>
        
        {activeTab === 'active' ? (
          <div className="flex flex-col items-center justify-center py-10">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-rounded text-gray-400 text-4xl">receipt_long</span>
            </div>
            <h3 className="text-lg font-medium">No active orders</h3>
            <p className="text-gray-500 text-center mt-2">You don't have any active orders right now</p>
            <Link href="/" className="btn-primary mt-4">Order Now</Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map(order => (
              <Link href={`/order/${order.id}`} key={order.id} className="block bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">{order.date}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {order.status}
                    </span>
                  </div>
                  <h3 className="font-medium mt-1">{order.vendor}</h3>
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between text-sm">
                    <div>
                      <p className="text-gray-500">Order ID</p>
                      <p>{order.id}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Items</p>
                      <p>{order.items.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Total</p>
                      <p className="font-medium">₹{order.total}</p>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-between">
                    <button className="text-primary text-sm font-medium">Reorder</button>
                    <div className="flex space-x-2">
                      <button className="text-sm border border-gray-300 px-3 py-1 rounded">Help</button>
                      <button className="text-sm bg-primary text-white px-3 py-1 rounded">Details</button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
