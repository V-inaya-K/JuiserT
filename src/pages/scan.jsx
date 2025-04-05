import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';
import QRScanner from '../components/scan/QRScanner';

export default function ScanPage() {
  const router = useRouter();
  const [scanStatus, setScanStatus] = useState(null);
  
  const handleScan = (data) => {
    setScanStatus('success');
    // Redirect to vendor page after successful scan
    setTimeout(() => {
      router.push(`/vendor/${data.vendorId}?table=${data.tableNumber}`);
    }, 1500);
  };
  
  return (
    <AppLayout title="Scan QR Code - JoosT">
      <div className="py-4">
        <h1 className="text-2xl font-semibold text-center">Scan QR Code</h1>
        <p className="text-gray-600 text-center mt-2 text-black dark:text-white">
          Scan the QR code at your table to place an order
        </p>
        
        <QRScanner onScan={handleScan} />
        
        {scanStatus === 'success' && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center">
            <p className="font-semibold">QR Code scanned successfully!</p>
            <p className="text-sm mt-1">Redirecting to vendor page...</p>
          </div>
        )}
        
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-3">How it works</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">1</div>
              <div>
                <h3 className="font-medium">Scan QR Code</h3>
                <p className="text-sm text-gray-600">Find the QR code on your table at the juice shop</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">2</div>
              <div>
                <h3 className="font-medium">Browse & Order</h3>
                <p className="text-sm text-gray-600">Select your favorite juices and customize them</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mr-3">3</div>
              <div>
                <h3 className="font-medium">Pay & Enjoy</h3>
                <p className="text-sm text-gray-600">Pay securely through the app and enjoy your juice</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
