"use client"

import { useEffect } from "react"
import { HeroSection } from "@/components/Health/hero-section"
import { DietPlansSection } from "@/components/Health/diet-plans-section"
import { ExerciseRoutinesSection } from "@/components/Health/exercise-routines-section"
import { DosAndDontsSection } from "@/components/Health/dos-and-donts-section"
import { DailyHabitsSection } from "@/components/Health/daily-habits-section"

export default function HealthAndWellnessPage() {
  useEffect(() => {
    document.title = "Health & Wellness Hub| Diascan";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", "Sign in to access Diascan features.");
  }, []);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800">
      <HeroSection />
      <main className="container mx-auto px-4 py-8">
        <DietPlansSection />
        <ExerciseRoutinesSection />
        <DosAndDontsSection />
        <DailyHabitsSection />
      </main>
    </div>
  )
}