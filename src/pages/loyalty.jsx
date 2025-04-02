import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import Link from 'next/link';

export default function LoyaltyPage() {
  // Mock user data for loyalty program
  const userData = {
    points: 320,
    streak: 3,
    nextReward: 400,
    level: 'Silver',
    progress: 70, // percentage to next level
    achievements: [
      { id: 1, name: 'First Order', icon: 'local_drink', completed: true },
      { id: 2, name: '3-Day Streak', icon: 'auto_awesome', completed: true },
      { id: 3, name: 'Health Enthusiast', icon: 'favorite', completed: false, progress: 60 },
      { id: 4, name: 'Refer 3 Friends', icon: 'group_add', completed: false, progress: 33 },
    ],
    rewards: [
      { id: 1, name: 'Free Juice', points: 400, icon: 'redeem' },
      { id: 2, name: '15% Off Next Order', points: 600, icon: 'percent' },
      { id: 3, name: 'Premium Add-on', points: 250, icon: 'add_circle' }
    ]
  };
  
  return (
    <AppLayout title="Loyalty & Rewards - JoosT">
      <div className="py-4 pb-24">
        <h1 className="text-2xl font-semibold mb-4">JoosT Rewards</h1>
        
        {/* Points & Streak Card */}
        <div className="bg-gradient-to-br from-primary to-primary-dark text-white rounded-xl p-4 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-white/80">Your Points</p>
              <h2 className="text-3xl font-bold">{userData.points}</h2>
            </div>
            <div className="bg-white/20 rounded-lg p-2">
              <span className="material-symbols-rounded">workspace_premium</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Progress to next reward</span>
              <span>{userData.points}/{userData.nextReward}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2" 
                style={{ width: `${(userData.points / userData.nextReward) * 100}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex mt-4 justify-between">
            <div className="text-center">
              <div className="text-sm text-white/80">Current Level</div>
              <div className="font-semibold flex items-center justify-center">
                <span className="material-symbols-rounded mr-1">emoji_events</span>
                {userData.level}
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-white/80">Streak</div>
              <div className="font-semibold flex items-center justify-center">
                <span className="material-symbols-rounded mr-1">local_fire_department</span>
                {userData.streak} days
              </div>
            </div>
            
            <div className="text-center">
              <div className="text-sm text-white/80">Next Level</div>
              <div className="text-xs bg-white/20 rounded-full px-2 py-1">
                {userData.progress}% Complete
              </div>
            </div>
          </div>
        </div>
        
        {/* Streak Challenge */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Streak Challenge</h2>
            <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
              Active
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">Order for 7 consecutive days and earn a free juice of your choice!</p>
          
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium">Your progress</span>
            <span className="text-sm font-medium">{userData.streak}/7 days</span>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-4">
            {[1, 2, 3, 4, 5, 6, 7].map(day => (
              <div 
                key={day}
                className={`aspect-square rounded-lg flex items-center justify-center ${
                  day <= userData.streak ? 'bg-primary text-white' : 'bg-gray-100 text-gray-400'
                }`}
              >
                {day <= userData.streak ? (
                  <span className="material-symbols-rounded">check</span>
                ) : (
                  day
                )}
              </div>
            ))}
          </div>
          
          <Link href="/" className="btn-primary w-full flex justify-center">
            Place Order to Continue Streak
          </Link>
        </div>
        
        {/* Available Rewards */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-semibold mb-3">Available Rewards</h2>
          
          <div className="space-y-3">
            {userData.rewards.map(reward => (
              <div key={reward.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                    <span className="material-symbols-rounded">{reward.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{reward.name}</h3>
                    <p className="text-xs text-gray-500">{reward.points} points required</p>
                  </div>
                </div>
                
                <button 
                  className={`px-3 py-1 rounded-lg text-sm ${
                    userData.points >= reward.points
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}
                  disabled={userData.points < reward.points}
                >
                  Redeem
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Achievements */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <h2 className="font-semibold mb-3">Achievements</h2>
          
          <div className="grid grid-cols-2 gap-3">
            {userData.achievements.map(achievement => (
              <div 
                key={achievement.id} 
                className={`p-3 rounded-lg ${
                  achievement.completed ? 'bg-green-50 border border-green-100' : 'bg-gray-50 border border-gray-100'
                }`}
              >
                <div className="flex items-center mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-2 ${
                    achievement.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <span className="material-symbols-rounded">{achievement.icon}</span>
                  </div>
                  <h3 className="font-medium text-sm">{achievement.name}</h3>
                </div>
                
                {achievement.completed ? (
                  <div className="text-xs text-green-600 flex items-center">
                    <span className="material-symbols-rounded text-xs mr-1">check_circle</span>
                    <span>Completed</span>
                  </div>
                ) : (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                      <div 
                        className="bg-primary rounded-full h-1.5" 
                        style={{ width: `${achievement.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500">{achievement.progress}% completed</div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Referral Program */}
        <div className="bg-white rounded-xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold">Refer Friends</h2>
            <div className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
              Earn 100 points
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">Invite friends to JoosT and earn rewards when they make their first purchase</p>
          
          <div className="border border-dashed border-gray-300 rounded-lg p-3 mb-4">
            <div className="text-center">
              <p className="text-sm font-medium mb-2">Your Referral Code</p>
              <div className="text-lg font-bold text-primary mb-2">RAHULJ2023</div>
              <button className="text-sm text-primary flex items-center mx-auto">
                <span className="material-symbols-rounded text-sm mr-1">content_copy</span>
                Copy Code
              </button>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <button className="flex-1 btn-outline flex items-center justify-center">
              <span className="material-symbols-rounded mr-1">share</span>
              Share Link
            </button>
            <button className="flex-1 btn-primary flex items-center justify-center">
              <span className="material-symbols-rounded mr-1">whatsapp</span>
              Send on WhatsApp
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
