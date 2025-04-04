import React from "react";
import AppLayout from "../components/layout/AppLayout";
import Link from "next/link";
import { useUser, UserButton , useClerk } from "@clerk/nextjs";

export default function ProfilePage() {
  const { user } = useUser(); // Get the logged-in user
  const clerk = useClerk();

  return (
    <AppLayout title="My Profile - JoosT">
      <div className="py-4">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex items-center">
            {/* Profile Image */}
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="Profile"
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.firstName?.charAt(0) || "U"}
              </div>
            )}

            {/* User Name & Phone */}
            <div className="ml-4">
              <h1 className="text-xl font-semibold">
                {user ? `${user.firstName} ${user.lastName}` : "Loading..."}
              </h1>
              <p className="text-gray-500">
                {user?.primaryPhoneNumber?.toString() || "No Phone Number"}
              </p>
            </div>
          </div>

          {/* Orders & Points */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-primary text-xl font-semibold">12</p>
                <p className="text-sm text-gray-500">Orders</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-primary text-xl font-semibold">320</p>
                <p className="text-sm text-gray-500">Points</p>
              </div>
            </div>
          </div>
        </div>

        {/* Account Settings */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h2 className="font-semibold">Account Settings</h2>
          </div>

          <div className="divide-y divide-gray-100">
            <Link href="/profile/edit" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="material-symbols-rounded text-gray-500 mr-3">person</span>
                <span>Edit Profile</span>
              </div>
              <span className="material-symbols-rounded text-gray-400">chevron_right</span>
            </Link>

            <Link href="/profile/address" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="material-symbols-rounded text-gray-500 mr-3">location_on</span>
                <span>Saved Addresses</span>
              </div>
              <span className="material-symbols-rounded text-gray-400">chevron_right</span>
            </Link>

            <Link href="/profile/payment" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="material-symbols-rounded text-gray-500 mr-3">credit_card</span>
                <span>Payment Methods</span>
              </div>
              <span className="material-symbols-rounded text-gray-400">chevron_right</span>
            </Link>

            <Link href="/profile/preferences" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="material-symbols-rounded text-gray-500 mr-3">tune</span>
                <span>Preferences</span>
              </div>
              <span className="material-symbols-rounded text-gray-400">chevron_right</span>
            </Link>

            <Link href="/help" className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="material-symbols-rounded text-gray-500 mr-3">help</span>
                <span>Help & Support</span>
              </div>
              <span className="material-symbols-rounded text-gray-400">chevron_right</span>
            </Link>

            {/* Logout Button */}
            <button onClick={() => clerk.signOut(() => router.push('/auth'))} 
            className="flex items-center w-full text-left p-4 text-red-500">
              <span className="material-symbols-rounded mr-3">logout</span>
              <UserButton />
            </button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
