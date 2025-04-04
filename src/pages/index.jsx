import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useUser } from "@clerk/nextjs";
import AppLayout from "../components/layout/AppLayout";
import HeroSection from "../components/home/HeroSection";
import JuiceCategories from "../components/home/JuiceCategories";
import RecommendedJuices from "../components/home/RecommendedJuices";
import FeaturedVendors from "../components/home/FeaturedVendors";
import AIRecommendations from "../components/home/AIRecommendations";
import FeaturedActions from "../components/home/FeaturedActions";
import SponsoredAds from "../components/home/SponsoredAds";

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push("/auth"); // Redirect to auth page if not signed in
    }
  }, [isSignedIn, router]);

  if (!isSignedIn) return null; // Prevents flickering before redirect

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
