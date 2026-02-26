import React, { useState } from 'react';
import { X, Clock, Sparkles, RotateCcw, Heart, ListPlus, ChevronDown } from 'lucide-react';
import { MindfulnessCard } from '@/lib/cardData';
import { useFavorites } from '@/contexts/FavoritesContext';

interface CardDrawModalProps {
  card: MindfulnessCard | null;
  onClose: () => void;
  onDrawAgain?: () => void;
  wheelName?: string;
}

export default function CardDrawModal({ card, onClose, onDrawAgain, wheelName }: CardDrawModalProps) {
  const [flipped, setFlipped] = useState(false);
  const [playlistMenuOpen, setPlaylistMenuOpen] = useState(false);
  const { isFavorite, toggleFavorite, playlists, addToPlaylist, createPlaylist } = useFavorites();
  const [newPlaylistName, setNewPlaylistName] = useState('');

  if (!card) return null;

  const fav = isFavorite(card.id);

  const handleCreateAndAdd = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName.trim());
    addToPlaylist(card.id, newPlaylistName.trim());
    setNewPlaylistName('');
    setPlaylistMenuOpen(false);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-lg animate-in zoom-in-95 fade-in duration-500"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={() => toggleFavorite(card.id)}
          className={`absolute -top-3 -left-3 z-10 w-10 h-10 rounded-full shadow-lg flex items-center justify-center transition-all ${
            fav ? 'bg-pink-500 hover:bg-pink-600' : 'bg-white hover:bg-pink-50'
          }`}
          title={fav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-5 h-5 transition-colors ${fav ? 'text-white fill-white' : 'text-pink-500'}`} />
        </button>

        {/* Card */}
        <div
          className="relative cursor-pointer"
          onClick={() => setFlipped(!flipped)}
          style={{ perspective: '1000px' }}
        >
          <div
            className="relative transition-transform duration-700"
            style={{
              transformStyle: 'preserve-3d',
              transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front of Card */}
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div
                className="relative h-64 bg-cover bg-center"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-xs font-bold text-white uppercase tracking-wider"
                    style={{ backgroundColor: card.color }}
                  >
                    {card.category}
                  </span>
                </div>
                {wheelName && (
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-bold text-white/80 bg-white/20 backdrop-blur-sm uppercase tracking-wider">
                      {wheelName} Wheel
                    </span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4">
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-1">{card.title}</h2>
                  <p className="text-white/80 text-sm">{card.description}</p>
                </div>
              </div>

              <div className="bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-600">{card.duration}</span>
                  <span className="text-gray-300 mx-2">|</span>
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-gray-500">Tap card to flip</span>
                </div>

                <p className="text-gray-600 leading-relaxed">{card.practice}</p>

                {/* Playlist Add */}
                <div className="mt-4 relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setPlaylistMenuOpen(!playlistMenuOpen); }}
                    className="flex items-center gap-2 text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors"
                  >
                    <ListPlus className="w-4 h-4" /> Add to Playlist <ChevronDown className="w-3 h-3" />
                  </button>
                  {playlistMenuOpen && (
                    <div className="absolute bottom-full left-0 mb-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-20" onClick={e => e.stopPropagation()}>
                      {playlists.filter(p => p.name !== 'Favorites').map(pl => {
                        const isIn = pl.cardIds.includes(card.id);
                        return (
                          <button
                            key={pl.name}
                            onClick={() => { if (!isIn) addToPlaylist(card.id, pl.name); setPlaylistMenuOpen(false); }}
                            className={`w-full text-left px-4 py-2 text-sm transition-colors ${isIn ? 'text-green-600 bg-green-50' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-700'}`}
                            disabled={isIn}
                          >
                            {pl.name} {isIn && <span className="text-xs ml-1">(added)</span>}
                          </button>
                        );
                      })}
                      <div className="border-t border-gray-100 mt-1 pt-1 px-3 pb-1">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newPlaylistName}
                            onChange={e => setNewPlaylistName(e.target.value)}
                            placeholder="New playlist name..."
                            className="flex-1 text-sm px-2 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-400"
                            onKeyDown={e => { if (e.key === 'Enter') handleCreateAndAdd(); }}
                          />
                          <button
                            onClick={handleCreateAndAdd}
                            className="px-3 py-1.5 text-xs font-semibold bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-4 flex gap-3">
                  {onDrawAgain && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setFlipped(false); onDrawAgain(); }}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-purple-100 text-purple-700 font-semibold hover:bg-purple-200 transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" /> Draw Again
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); onClose(); }}
                    className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all"
                  >
                    Begin Practice
                  </button>
                </div>
              </div>
            </div>

            {/* Back of Card */}
            <div
              className="absolute inset-0 rounded-3xl overflow-hidden shadow-2xl"
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="h-full bg-gradient-to-br from-purple-700 via-purple-600 to-pink-500 p-8 flex flex-col items-center justify-center text-center text-white">
                <Sparkles className="w-12 h-12 mb-6 opacity-80" />
                <h3 className="text-2xl font-bold mb-4">Your Practice</h3>
                <p className="text-lg leading-relaxed opacity-90 mb-6">{card.practice}</p>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">{card.duration}</span>
                </div>
                <p className="mt-6 text-sm opacity-60">Tap to flip back</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
