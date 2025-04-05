import React, { useState } from 'react';

const QRScanner = ({ onScan }) => {
  const [scanning, setScanning] = useState(true);
  
  // This would be integrated with a QR scanning library in production
  const simulateScan = () => {
    setScanning(false);
    setTimeout(() => {
      onScan && onScan({ vendorId: 123, tableNumber: 5 });
    }, 1000);
  };
  
  return (
    <div className="flex flex-col items-center my-6">
      <div className="qr-scanner-container">
        <div className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center">
          {scanning ? (
            <>
              <div className="w-3/4 h-3/4 border-2 border-primary relative rounded">
                <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary -translate-x-1 -translate-y-1"></div>
                <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-primary translate-x-1 -translate-y-1"></div>
                <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-primary -translate-x-1 translate-y-1"></div>
                <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary translate-x-1 translate-y-1"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-0.5 bg-primary/50 animate-pulse"></div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <p className="text-gray-700 text-sm text-black dark:text-white">Position QR code within the frame</p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center">
              <span className="material-symbols-rounded text-5xl text-primary animate-pulse">
                hourglass_top
              </span>
              <p className="mt-2 text-gray-700">Processing...</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={simulateScan} 
          className="btn-primary flex items-center"
        >
          <span className="material-symbols-rounded mr-1">qr_code_scanner</span>
          {scanning ? "Tap to Scan" : "Scanning..."}
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
