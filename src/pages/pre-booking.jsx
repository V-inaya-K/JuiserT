import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';

export default function PreBookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  
  // Generate available dates (today + next 7 days)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
      const displayDate = i === 0 ? 'Today' : 
                          i === 1 ? 'Tomorrow' : 
                          date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
      
      dates.push({ value: dateString, display: displayDate });
    }
    
    return dates;
  };
  
  // Generate time slots (hourly from 9AM to 8PM)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour <= 20; hour++) {
      const time24h = `${hour}:00`;
      const time12h = `${hour > 12 ? hour - 12 : hour}:00 ${hour >= 12 ? 'PM' : 'AM'}`;
      slots.push({ value: time24h, display: time12h });
    }
    return slots;
  };
  
  const dates = generateDates();
  const timeSlots = generateTimeSlots();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would submit the booking to an API
    router.push({
      pathname: '/booking-confirmation',
      query: { date: selectedDate, time: selectedTime }
    });
  };

  return (
    <AppLayout title="Pre-book Your Juice - JoosT">
      <div className="py-4">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => router.back()} 
            className="mr-3"
          >
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <h1 className="text-2xl font-semibold">Schedule Your Order</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <p className="text-gray-600 mb-4">
            Select a date and time for your juice order. We'll have it fresh and ready for pickup at your selected time.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Date Selection */}
            <div className="mb-4">
              <h2 className="font-medium text-gray-700 mb-2">Select Date</h2>
              <div className="grid grid-cols-3 gap-2">
                {dates.map((date, index) => (
                  <button
                    type="button"
                    key={date.value}
                    className={`p-3 border rounded-lg text-center ${
                      selectedDate === date.value 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedDate(date.value)}
                  >
                    <div className="text-sm font-medium">{date.display}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Time Selection */}
            <div className="mb-4">
              <h2 className="font-medium text-gray-700 mb-2">Select Time</h2>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    type="button"
                    key={time.value}
                    className={`p-2 border rounded-lg text-center ${
                      selectedTime === time.value 
                        ? 'bg-primary/10 border-primary text-primary' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedTime(time.value)}
                  >
                    <div className="text-sm">{time.display}</div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Special Instructions */}
            <div className="mb-4">
              <h2 className="font-medium text-gray-700 mb-2">Special Instructions (Optional)</h2>
              <textarea 
                className="w-full p-3 border border-gray-200 rounded-lg" 
                rows="3"
                placeholder="Any special requests or notes for your order..."
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button 
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium"
              disabled={!selectedDate || !selectedTime}
            >
              Confirm Schedule
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-lg mb-3">Pre-Booking Benefits</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <span className="material-symbols-rounded text-primary mr-2">schedule</span>
              <div>
                <h3 className="font-medium">Skip the Wait</h3>
                <p className="text-sm text-gray-600">Your juice will be ready for pickup at your chosen time</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="material-symbols-rounded text-primary mr-2">verified</span>
              <div>
                <h3 className="font-medium">Guaranteed Availability</h3>
                <p className="text-sm text-gray-600">Reserve your favorite juices before they sell out</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="material-symbols-rounded text-primary mr-2">loyalty</span>
              <div>
                <h3 className="font-medium">Extra Loyalty Points</h3>
                <p className="text-sm text-gray-600">Earn 5% more JoosT points on all pre-booked orders</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
