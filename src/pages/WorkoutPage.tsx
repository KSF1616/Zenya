import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WheelSection from '@/components/WheelSection';
import { Sparkles } from 'lucide-react';

export default function WorkoutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> Daily Practice
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Your Daily ZENYA Workout
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a wheel, spin it, and receive your personalized mindfulness practice card. 
              Each day brings a new opportunity for growth and transformation.
            </p>
          </div>

          <WheelSection standalone />

          {/* Tips Section */}
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-purple-50 rounded-2xl p-6">
              <h3 className="font-bold text-purple-900 mb-2">Morning Practice</h3>
              <p className="text-sm text-purple-700/80">Start your day with the ZENYA Wheel for grounding practices like Zen meditation and affirmations.</p>
            </div>
            <div className="bg-pink-50 rounded-2xl p-6">
              <h3 className="font-bold text-pink-900 mb-2">Afternoon Reset</h3>
              <p className="text-sm text-pink-700/80">Use the SHAKEN Wheel midday for an energy boost with holistic living and attitude practices.</p>

            </div>
            <div className="bg-teal-50 rounded-2xl p-6">
              <h3 className="font-bold text-teal-900 mb-2">Evening Wind-Down</h3>
              <p className="text-sm text-teal-700/80">End your day with kindness and nature cards to cultivate gratitude and peaceful rest.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
