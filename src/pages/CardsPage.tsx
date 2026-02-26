import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CardDeck from '@/components/CardDeck';
import { Layers } from 'lucide-react';

export default function CardsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-4">
              <Layers className="w-4 h-4" /> Full Deck
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              ZENYA Card Deck
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse all mindfulness practice cards from both the ZENYA and SHAKEN wheels. 

              Filter by category or draw a random card.
            </p>
          </div>

          <CardDeck />
        </div>
      </main>
      <Footer />
    </div>
  );
}
