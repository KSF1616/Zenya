import React, { useState } from 'react';
import { zenyaCards, shakenCards, wildCards, MindfulnessCard } from '@/lib/cardData';
import { useFavorites } from '@/contexts/FavoritesContext';
import CardDrawModal from './CardDrawModal';
import { Clock, Filter, Shuffle, Heart } from 'lucide-react';

const allCards = [...zenyaCards, ...shakenCards, ...wildCards];
const allCategories = [...new Set(allCards.map(c => c.category))];

export default function CardDeck() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [drawnCard, setDrawnCard] = useState<MindfulnessCard | null>(null);
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredCards = selectedCategory === 'all'
    ? allCards
    : allCards.filter(c => c.category === selectedCategory);

  const handleRandomDraw = () => {
    const card = filteredCards[Math.floor(Math.random() * filteredCards.length)];
    setDrawnCard(card);
  };

  return (
    <div>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-8">
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <Filter className="w-4 h-4" /> Filter:
        </div>
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            selectedCategory === 'all'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All Cards ({allCards.length})
        </button>
        {allCategories.map(cat => {
          const count = allCards.filter(c => c.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat} ({count})
            </button>
          );
        })}
        <button
          onClick={handleRandomDraw}
          className="ml-auto flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white text-sm font-semibold hover:from-purple-700 hover:to-pink-600 transition-all"
        >
          <Shuffle className="w-4 h-4" /> Random Draw
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredCards.map(card => {
          const fav = isFavorite(card.id);
          return (
            <div
              key={card.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Favorite Button */}
              <button
                onClick={(e) => { e.stopPropagation(); toggleFavorite(card.id); }}
                className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                  fav ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white/90 hover:bg-white'
                }`}
                title={fav ? 'Remove from favorites' : 'Save to favorites'}
              >
                <Heart className={`w-4 h-4 ${fav ? 'text-white fill-white' : 'text-pink-500'}`} />
              </button>

              <button
                onClick={() => setDrawnCard(card)}
                className="w-full text-left"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider"
                      style={{ backgroundColor: card.color }}
                    >
                      {card.category}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 right-10">
                    <h3 className="text-white font-bold text-sm">{card.title}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">{card.description}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{card.duration}</span>
                  </div>
                </div>
              </button>
            </div>
          );
        })}
      </div>

      {/* Card Draw Modal */}
      <CardDrawModal
        card={drawnCard}
        onClose={() => setDrawnCard(null)}
        onDrawAgain={handleRandomDraw}
      />
    </div>
  );
}
