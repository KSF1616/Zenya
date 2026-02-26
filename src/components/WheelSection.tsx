import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Zap } from 'lucide-react';
import { getRandomCard, MindfulnessCard } from '@/lib/cardData';
import CardDrawModal from './CardDrawModal';

const WHEEL_1_URL = 'https://gamemick.com/game/c/wheel?c=eyJpdGVtcyI6WyJaZW4iLCJFbmVyZ3kiLCJOdXRyaXRpb24iLCJZb3UgRmlyc3QiLCJBZmZpcm1hdGlvbnMiLCJXSUxEIl0sIml0ZW1Db2xvciI6WyIjODY2OTlEIiwiI0FDRDlFMCIsIiNFOUU0QjUiXSwic3Ryb2tlQ29sb3IiOiIjZmZmZmZmIiwiZm9udFNpemUiOjAsInBpbiI6eyJpbm5lciI6IiM1N0NBRDIiLCJvdXRlciI6IiM2RjU1QjkiLCJib3JkZXIiOiIjRDNDNDY2In19';

const WHEEL_2_URL = 'https://gamemick.com/game/c/wheel?c=eyJpdGVtcyI6WyJTZXh1YWwgSGVhbGluZyIsIkhvbGlzdGljIExpdmluZyIsIkF0dGl0dWRlIiwiS2luZG5lc3MiLCJFbmVyZ3kiLCJOYXR1cmUiLCJXSUxEIl0sIml0ZW1Db2xvciI6WyIjNUQzNTc4IiwiI0U0QTJDQiIsIiMxRDczNkIiXSwic3Ryb2tlQ29sb3IiOiIjZmZmZmZmIiwiZm9udFNpemUiOjAsInBpbiI6eyJpbm5lciI6IiMwMTdGQ0IiLCJvdXRlciI6IiNFQTlBNkQiLCJib3JkZXIiOiIjMEI1MEQwIn19';

const WHEEL_1_CATEGORIES = ['Zen', 'Energy', 'Nutrition', 'You First', 'Affirmations', 'WILD'];
const WHEEL_2_CATEGORIES = ['Sexual Healing', 'Holistic Living', 'Attitude', 'Kindness', 'Energy', 'Nature', 'WILD'];

interface WheelSectionProps {
  standalone?: boolean;
}

export default function WheelSection({ standalone = false }: WheelSectionProps) {
  const [activeWheel, setActiveWheel] = useState<1 | 2>(1);
  const [drawnCard, setDrawnCard] = useState<MindfulnessCard | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleSpin = (wheelNum: 1 | 2) => {
    setIsSpinning(true);
    const categories = wheelNum === 1 ? WHEEL_1_CATEGORIES : WHEEL_2_CATEGORIES;
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];

    // Simulate wheel spin time
    setTimeout(() => {
      setSelectedCategory(randomCategory);
      const card = getRandomCard(randomCategory, wheelNum === 1 ? 'zenya' : 'shaken');
      setDrawnCard(card);
      setIsSpinning(false);
    }, 3500);
  };

  const handleDrawAgain = () => {
    setDrawnCard(null);
    setSelectedCategory(null);
    handleSpin(activeWheel);
  };

  return (
    <section className={`${standalone ? '' : 'py-16 md:py-24'}`}>
      <div className={`${standalone ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}`}>
        {!standalone && (
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Sparkles className="w-4 h-4" /> Daily ZENYA Workout
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
              Spin the Wheel, Draw Your Card
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose a wheel, give it a spin, and receive your personalized mindfulness practice for today.
            </p>
          </div>
        )}

        {/* Wheel Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-2xl p-1.5">
            <button
              onClick={() => setActiveWheel(1)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeWheel === 1
                  ? 'bg-white text-purple-700 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> ZENYA Wheel
              </span>
            </button>
            <button
              onClick={() => setActiveWheel(2)}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all ${
                activeWheel === 2
                  ? 'bg-white text-pink-700 shadow-md'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" /> SHAKEN Wheel
              </span>
            </button>
          </div>
        </div>

        {/* Wheel Display */}
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-50 via-white to-pink-50 rounded-3xl p-4 md:p-8 shadow-inner border border-purple-100/50">
            {/* Wheel Categories */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {(activeWheel === 1 ? WHEEL_1_CATEGORIES : WHEEL_2_CATEGORIES).map(cat => (
                <span
                  key={cat}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    selectedCategory === cat
                      ? 'bg-purple-600 text-white scale-110'
                      : 'bg-white text-gray-600 border border-gray-200'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>

            {/* Embedded Wheel */}
            <div className="relative w-full" style={{ paddingBottom: '75%' }}>
              <iframe
                key={activeWheel}
                src={activeWheel === 1 ? WHEEL_1_URL : WHEEL_2_URL}
                className="absolute inset-0 w-full h-full rounded-2xl"
                style={{ border: 'none' }}
                title={activeWheel === 1 ? 'ZENYA Wheel' : 'SHAKEN Wheel'}
                allow="autoplay"
              />
            </div>

            {/* Draw Card Button */}
            <div className="mt-6 text-center">
              <button
                onClick={() => handleSpin(activeWheel)}
                disabled={isSpinning}
                className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg transition-all ${
                  isSpinning
                    ? 'bg-gray-200 text-gray-500 cursor-wait'
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                }`}
              >
                {isSpinning ? (
                  <>
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Drawing Your Card...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" /> Draw Your Card
                  </>
                )}
              </button>
              <p className="mt-3 text-sm text-gray-500">
                Spin the wheel above or click to draw a random card from the {activeWheel === 1 ? 'ZENYA' : 'SHAKEN'} deck
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Draw Modal */}
      <CardDrawModal
        card={drawnCard}
        onClose={() => { setDrawnCard(null); setSelectedCategory(null); }}
        onDrawAgain={handleDrawAgain}
        wheelName={activeWheel === 1 ? 'ZENYA' : 'SHAKEN'}
      />
    </section>
  );
}
