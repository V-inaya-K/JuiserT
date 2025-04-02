import React, { useState } from 'react';
import { useRouter } from 'next/router';
import AppLayout from '../components/layout/AppLayout';
import Link from 'next/link';

export default function GroupOrderPage() {
  const router = useRouter();
  const [participants, setParticipants] = useState([
    { id: 1, name: 'You', email: '', isAdmin: true }
  ]);
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '' });
  const [paymentMethod, setPaymentMethod] = useState('equal');
  const [expiryTime, setExpiryTime] = useState('30');
  
  const handleAddParticipant = () => {
    if (newParticipant.name.trim() === '') return;
    
    setParticipants([
      ...participants,
      {
        id: participants.length + 1,
        name: newParticipant.name,
        email: newParticipant.email,
        isAdmin: false
      }
    ]);
    
    setNewParticipant({ name: '', email: '' });
  };
  
  const handleRemoveParticipant = (id) => {
    setParticipants(participants.filter(p => p.id !== id));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would create a group order and send invitations
    router.push('/group-order-confirmation');
  };

  return (
    <AppLayout title="Group Order - JoosT">
      <div className="py-4 pb-24">
        <div className="flex items-center mb-4">
          <button onClick={() => router.back()} className="mr-3">
            <span className="material-symbols-rounded">arrow_back</span>
          </button>
          <h1 className="text-2xl font-semibold">Group Order</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4 mb-4">
          <h2 className="font-medium text-lg mb-3">Create a Group Order</h2>
          <p className="text-gray-600 mb-4">
            Invite friends or colleagues to add items to this order. Everyone can pay their share separately or you can split the bill equally.
          </p>
          
          <form onSubmit={handleSubmit}>
            {/* Group Name */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">Group Name</label>
              <input
                type="text"
                placeholder="E.g., Office Lunch, Team Meeting"
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            {/* Expiry Time */}
            <div className="mb-4">
              <label className="block font-medium text-gray-700 mb-2">Group Order Expires In</label>
              <select 
                className="w-full p-3 border rounded-lg bg-white"
                value={expiryTime}
                onChange={(e) => setExpiryTime(e.target.value)}
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
                <option value="120">2 hours</option>
              </select>
            </div>
            
            {/* Participants */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Participants</h3>
              
              <div className="space-y-2 mb-3">
                {participants.map(participant => (
                  <div key={participant.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm mr-3">
                        {participant.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{participant.name}</div>
                        {participant.email && <div className="text-xs text-gray-500">{participant.email}</div>}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      {participant.isAdmin ? (
                        <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Admin</span>
                      ) : (
                        <button 
                          type="button"
                          onClick={() => handleRemoveParticipant(participant.id)}
                          className="text-gray-400"
                        >
                          <span className="material-symbols-rounded">close</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border rounded-lg p-3">
                <h4 className="text-sm font-medium mb-2">Add Participant</h4>
                <div className="flex flex-col space-y-2">
                  <input
                    type="text"
                    placeholder="Name"
                    className="p-2 border rounded"
                    value={newParticipant.name}
                    onChange={(e) => setNewParticipant({...newParticipant, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email (optional)"
                    className="p-2 border rounded"
                    value={newParticipant.email}
                    onChange={(e) => setNewParticipant({...newParticipant, email: e.target.value})}
                  />
                  <button 
                    type="button"
                    onClick={handleAddParticipant}
                    className="bg-gray-100 py-2 rounded text-gray-700"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            {/* Payment Method */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Payment Method</h3>
              
              <div className="space-y-2">
                <label className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="equal"
                      checked={paymentMethod === 'equal'}
                      onChange={() => setPaymentMethod('equal')}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Split Equally</div>
                      <div className="text-xs text-gray-500">Everyone pays the same amount</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="individual"
                      checked={paymentMethod === 'individual'}
                      onChange={() => setPaymentMethod('individual')}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">Pay for What You Order</div>
                      <div className="text-xs text-gray-500">Each person pays for their items</div>
                    </div>
                  </div>
                </label>
                
                <label className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="one-person"
                      checked={paymentMethod === 'one-person'}
                      onChange={() => setPaymentMethod('one-person')}
                      className="mr-3"
                    />
                    <div>
                      <div className="font-medium">One Person Pays</div>
                      <div className="text-xs text-gray-500">You pay for everyone</div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            
            {/* Group Order Message */}
            <div className="mb-4">
              <h3 className="font-medium text-gray-700 mb-2">Add a Message (Optional)</h3>
              <textarea
                className="w-full p-3 border rounded-lg"
                rows="2"
                placeholder="Add a note to participants..."
              ></textarea>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg font-medium mt-4"
            >
              Start Group Order
            </button>
          </form>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-4">
          <h2 className="font-semibold text-lg mb-3">How Group Orders Work</h2>
          <div className="space-y-3">
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">1</div>
              <div>
                <h3 className="font-medium">Invite Participants</h3>
                <p className="text-sm text-gray-600">Add friends who want to join your order</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">2</div>
              <div>
                <h3 className="font-medium">Everyone Orders</h3>
                <p className="text-sm text-gray-600">Each person selects their items</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">3</div>
              <div>
                <h3 className="font-medium">Pay As Selected</h3>
                <p className="text-sm text-gray-600">Split the bill according to your chosen method</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mr-3">4</div>
              <div>
                <h3 className="font-medium">Single Delivery</h3>
                <p className="text-sm text-gray-600">All items arrive together for your group</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
