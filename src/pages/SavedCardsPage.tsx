import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CardDrawModal from '@/components/CardDrawModal';
import { useFavorites } from '@/contexts/FavoritesContext';
import { useAuth } from '@/contexts/AuthContext';
import { MindfulnessCard } from '@/lib/cardData';
import { Heart, ListMusic, Plus, Trash2, Clock, Pencil, Check, X, Play, Shuffle, Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SavedCardsPage() {
  const { user } = useAuth();
  const {
    favorites, playlists, isFavorite, toggleFavorite,
    addToPlaylist, removeFromPlaylist, createPlaylist, deletePlaylist, renamePlaylist,
    getCardById, getPlaylistCards, loading,
  } = useFavorites();

  const [activeTab, setActiveTab] = useState('Favorites');
  const [drawnCard, setDrawnCard] = useState<MindfulnessCard | null>(null);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [showNewPlaylist, setShowNewPlaylist] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const activePlaylist = playlists.find(p => p.name === activeTab);
  const activeCards = activePlaylist ? getPlaylistCards(activePlaylist.name) : [];

  const handleCreatePlaylist = () => {
    if (!newPlaylistName.trim()) return;
    createPlaylist(newPlaylistName.trim());
    setActiveTab(newPlaylistName.trim());
    setNewPlaylistName('');
    setShowNewPlaylist(false);
  };

  const handleRename = (oldName: string) => {
    if (!editName.trim() || editName === oldName) { setEditingPlaylist(null); return; }
    renamePlaylist(oldName, editName.trim());
    if (activeTab === oldName) setActiveTab(editName.trim());
    setEditingPlaylist(null);
  };

  const handleDelete = (name: string) => {
    deletePlaylist(name);
    if (activeTab === name) setActiveTab('Favorites');
    setConfirmDelete(null);
  };

  const handleShufflePlay = () => {
    if (activeCards.length === 0) return;
    const card = activeCards[Math.floor(Math.random() * activeCards.length)];
    setDrawnCard(card);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4">
                <Heart className="w-4 h-4 fill-pink-700" /> My Collection
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Saved Cards</h1>
              <p className="text-gray-600">
                {user
                  ? 'Your saved cards are synced to your account.'
                  : 'Sign in to sync your saved cards across devices.'}
              </p>
            </div>
            {activeCards.length > 0 && (
              <button
                onClick={handleShufflePlay}
                className="mt-4 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
              >
                <Shuffle className="w-4 h-4" /> Shuffle Play
              </button>
            )}
          </div>

          {/* Playlist Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {playlists.map(pl => (
              <div key={pl.name} className="relative group">
                {editingPlaylist === pl.name && pl.name !== 'Favorites' ? (
                  <div className="flex items-center gap-1 bg-white rounded-xl border-2 border-purple-400 px-2 py-1">
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      className="text-sm px-2 py-1 w-32 focus:outline-none"
                      autoFocus
                      onKeyDown={e => { if (e.key === 'Enter') handleRename(pl.name); if (e.key === 'Escape') setEditingPlaylist(null); }}
                    />
                    <button onClick={() => handleRename(pl.name)} className="p-1 text-green-600 hover:bg-green-50 rounded"><Check className="w-3.5 h-3.5" /></button>
                    <button onClick={() => setEditingPlaylist(null)} className="p-1 text-gray-400 hover:bg-gray-50 rounded"><X className="w-3.5 h-3.5" /></button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveTab(pl.name)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                      activeTab === pl.name
                        ? pl.name === 'Favorites' ? 'bg-pink-500 text-white shadow-md' : 'bg-purple-600 text-white shadow-md'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-purple-300 hover:text-purple-700'
                    }`}
                  >
                    {pl.name === 'Favorites' ? <Heart className="w-3.5 h-3.5 fill-current" /> : <ListMusic className="w-3.5 h-3.5" />}
                    {pl.name}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full ${activeTab === pl.name ? 'bg-white/20' : 'bg-gray-100'}`}>
                      {pl.cardIds.length}
                    </span>
                  </button>
                )}

                {/* Edit/Delete actions for custom playlists */}
                {pl.name !== 'Favorites' && activeTab === pl.name && editingPlaylist !== pl.name && (
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      onClick={() => { setEditingPlaylist(pl.name); setEditName(pl.name); }}
                      className="text-xs text-gray-400 hover:text-purple-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-purple-50 transition-colors"
                    >
                      <Pencil className="w-3 h-3" /> Rename
                    </button>
                    {confirmDelete === pl.name ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(pl.name)} className="text-xs text-red-600 px-2 py-1 rounded bg-red-50 hover:bg-red-100 font-medium">Delete</button>
                        <button onClick={() => setConfirmDelete(null)} className="text-xs text-gray-400 px-2 py-1 rounded hover:bg-gray-50">Cancel</button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setConfirmDelete(pl.name)}
                        className="text-xs text-gray-400 hover:text-red-600 flex items-center gap-1 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" /> Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* New Playlist Button */}
            {showNewPlaylist ? (
              <div className="flex items-center gap-2 bg-white rounded-xl border-2 border-purple-400 px-3 py-1.5">
                <input
                  type="text"
                  value={newPlaylistName}
                  onChange={e => setNewPlaylistName(e.target.value)}
                  placeholder="Playlist name..."
                  className="text-sm px-2 py-1 w-40 focus:outline-none"
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') handleCreatePlaylist(); if (e.key === 'Escape') setShowNewPlaylist(false); }}
                />
                <button onClick={handleCreatePlaylist} className="p-1.5 text-white bg-purple-600 rounded-lg hover:bg-purple-700"><Check className="w-3.5 h-3.5" /></button>
                <button onClick={() => { setShowNewPlaylist(false); setNewPlaylistName(''); }} className="p-1.5 text-gray-400 hover:text-gray-600"><X className="w-3.5 h-3.5" /></button>
              </div>
            ) : (
              <button
                onClick={() => setShowNewPlaylist(true)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium bg-white text-purple-600 border-2 border-dashed border-purple-300 hover:border-purple-400 hover:bg-purple-50 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" /> New Playlist
              </button>
            )}
          </div>

          {/* Cards Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {[1,2,3,4].map(i => <div key={i} className="bg-white rounded-2xl h-64 animate-pulse" />)}
            </div>
          ) : activeCards.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
              {activeTab === 'Favorites' ? (
                <>
                  <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-500 mb-2">No saved cards yet</h3>
                  <p className="text-gray-400 mb-6 max-w-md mx-auto">
                    Browse the card deck and tap the heart icon to save your favorite mindfulness practices.
                  </p>
                  <Link
                    to="/cards"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold hover:from-purple-700 hover:to-pink-600 transition-all"
                  >
                    Browse Card Deck <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              ) : (
                <>
                  <ListMusic className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-500 mb-2">This playlist is empty</h3>
                  <p className="text-gray-400 mb-6">Open any card and use "Add to Playlist" to build your custom practice routine.</p>
                  <Link
                    to="/cards"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Browse Cards <ArrowRight className="w-4 h-4" />
                  </Link>
                </>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {activeCards.map((card, index) => {
                const fav = isFavorite(card.id);
                return (
                  <div
                    key={card.id + activeTab}
                    className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    {/* Playlist number */}
                    {activeTab !== 'Favorites' && (
                      <div className="absolute top-3 left-3 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white text-xs font-bold">
                        {index + 1}
                      </div>
                    )}

                    {/* Favorite / Remove Button */}
                    <button
                      onClick={() => {
                        if (activeTab === 'Favorites') {
                          toggleFavorite(card.id);
                        } else {
                          removeFromPlaylist(card.id, activeTab);
                        }
                      }}
                      className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${
                        activeTab === 'Favorites'
                          ? 'bg-pink-500 hover:bg-pink-600'
                          : 'bg-white/90 hover:bg-red-50'
                      }`}
                      title={activeTab === 'Favorites' ? 'Remove from favorites' : 'Remove from playlist'}
                    >
                      {activeTab === 'Favorites' ? (
                        <Heart className="w-4 h-4 text-white fill-white" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
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
                        <div className={`absolute ${activeTab !== 'Favorites' ? 'top-3 left-12' : 'top-3 left-3'}`}>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{card.duration}</span>
                          </div>
                          <Play className="w-4 h-4 text-purple-400 group-hover:text-purple-600 transition-colors" />
                        </div>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* Total time estimate */}
          {activeCards.length > 0 && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">{activeCards.length} cards</strong> in this {activeTab === 'Favorites' ? 'collection' : 'playlist'}
                  {' · '}
                  Estimated time: <strong className="text-purple-600">
                    {activeCards.reduce((sum, c) => sum + parseInt(c.duration) || 0, 0)} min
                  </strong>
                </span>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Card Modal */}
      <CardDrawModal
        card={drawnCard}
        onClose={() => setDrawnCard(null)}
        onDrawAgain={handleShufflePlay}
      />
    </div>
  );
}
