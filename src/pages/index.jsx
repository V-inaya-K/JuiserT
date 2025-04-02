import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import HeroSection from '../components/home/HeroSection';
import JuiceCategories from '../components/home/JuiceCategories';
import RecommendedJuices from '../components/home/RecommendedJuices';
import FeaturedVendors from '../components/home/FeaturedVendors';
import AIRecommendations from '../components/home/AIRecommendations';
import FeaturedActions from '../components/home/FeaturedActions';
import SponsoredAds from '../components/home/SponsoredAds';

export default function Home() {
  return (
    <AppLayout title="JoosT - Fresh & Healthy Juices">
      <HeroSection />
      <FeaturedActions />
      <JuiceCategories />
      <AIRecommendations />
      <RecommendedJuices />
      <FeaturedVendors />
      <SponsoredAds />
    </AppLayout>
  );
}
