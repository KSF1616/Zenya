import React from 'react';
import { Disc3, Layers, Sparkles, Heart } from 'lucide-react';

const steps = [
  {
    icon: Disc3,
    title: 'Choose Your Wheel',
    description: 'Pick between the ZENYA Wheel (Zen, Energy, Nutrition, You First, Affirmations) or the SHAKEN Wheel (Holistic Living, Kindness, Nature, and more).',

    color: 'from-purple-500 to-purple-600',
    bg: 'bg-purple-50',
  },
  {
    icon: Sparkles,
    title: 'Spin & Draw',
    description: 'Give the wheel a spin and watch it land on your category. Then draw a beautifully crafted mindfulness card with your personalized practice.',
    color: 'from-pink-500 to-pink-600',
    bg: 'bg-pink-50',
  },
  {
    icon: Layers,
    title: 'Practice Daily',
    description: 'Follow the guided practice on your card — from 3-minute breathwork to 30-minute rituals. Each card is designed to fit into your day.',
    color: 'from-teal-500 to-teal-600',
    bg: 'bg-teal-50',
  },
  {
    icon: Heart,
    title: 'Transform Your Life',
    description: 'Build a consistent wellness routine with our journals, planners, and guides. Track your journey and watch yourself grow.',
    color: 'from-amber-500 to-amber-600',
    bg: 'bg-amber-50',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            How ZENYA Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple, beautiful system to bring mindfulness into your daily life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-gray-200 to-gray-100 z-0" style={{ width: 'calc(100% - 3rem)' }} />
              )}
              
              <div className={`relative ${step.bg} rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1`}>
                {/* Step number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center text-sm font-bold text-gray-400">
                  {index + 1}
                </div>
                
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white mb-5 shadow-lg`}>
                  <step.icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
