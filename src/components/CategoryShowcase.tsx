import React from 'react';
import { Link } from 'react-router-dom';
import { Flower2, Zap, Apple, UserCircle, MessageCircle, Sparkles, Heart, Leaf, Sun, HandHeart, TreePine, Flame } from 'lucide-react';

const zenyaCategories = [
  { name: 'Zen', icon: Flower2, color: '#86699D', description: 'Meditation & mindfulness practices' },
  { name: 'Energy', icon: Zap, color: '#ACD9E0', description: 'Movement & vitality exercises' },
  { name: 'Nutrition', icon: Apple, color: '#E9E4B5', description: 'Mindful eating & nourishment' },
  { name: 'You First', icon: UserCircle, color: '#86699D', description: 'Self-care & boundary setting' },
  { name: 'Affirmations', icon: MessageCircle, color: '#ACD9E0', description: 'Positive mantras & gratitude' },
  { name: 'WILD', icon: Sparkles, color: '#D4A574', description: 'Surprise practices & creativity' },
];

const shakenCategories = [
  { name: 'Sexual Healing', icon: Heart, color: '#5D3578', description: 'Body connection & sensory awareness' },
  { name: 'Holistic Living', icon: Sun, color: '#E4A2CB', description: 'Whole-body wellness & balance' },
  { name: 'Attitude', icon: Flame, color: '#1D736B', description: 'Mindset shifts & perspective' },
  { name: 'Kindness', icon: HandHeart, color: '#5D3578', description: 'Compassion & loving-kindness' },
  { name: 'Energy', icon: Leaf, color: '#E4A2CB', description: 'Grounding & energy healing' },
  { name: 'Nature', icon: TreePine, color: '#1D736B', description: 'Earth connection & outdoor practices' },
  { name: 'WILD', icon: Sparkles, color: '#D4A574', description: 'Surprise practices & play' },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            Explore All Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Two wheels, thirteen categories, endless possibilities for your wellness journey.
          </p>
        </div>

        {/* ZENYA Wheel Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-purple-700 mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5" /> ZENYA Wheel
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {zenyaCategories.map(cat => (
              <Link
                key={cat.name}
                to="/cards"
                className="group bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-purple-200 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* SHAKEN Wheel Categories */}
        <div>
          <h3 className="text-xl font-bold text-pink-700 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5" /> SHAKEN Wheel
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
            {shakenCategories.map(cat => (
              <Link
                key={cat.name + '-shaken'}
                to="/cards"
                className="group bg-white rounded-2xl p-5 border-2 border-gray-100 hover:border-pink-200 hover:shadow-lg transition-all duration-300 text-center"
              >
                <div
                  className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center text-white group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: cat.color }}
                >
                  <cat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 text-sm mb-1">{cat.name}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
