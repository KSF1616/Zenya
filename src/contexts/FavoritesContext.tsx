import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { MindfulnessCard, zenyaCards, shakenCards, wildCards } from '@/lib/cardData';

const allCardsMap = new Map<string, MindfulnessCard>();
[...zenyaCards, ...shakenCards, ...wildCards].forEach(c => allCardsMap.set(c.id, c));

export interface Playlist {
  name: string;
  cardIds: string[];
}

interface SavedEntry {
  card_id: string;
  playlist_name: string;
}

interface FavoritesContextType {
  favorites: string[];
  playlists: Playlist[];
  isFavorite: (cardId: string) => boolean;
  toggleFavorite: (cardId: string) => void;
  addToPlaylist: (cardId: string, playlistName: string) => void;
  removeFromPlaylist: (cardId: string, playlistName: string) => void;
  createPlaylist: (name: string) => void;
  deletePlaylist: (name: string) => void;
  renamePlaylist: (oldName: string, newName: string) => void;
  getCardById: (id: string) => MindfulnessCard | undefined;
  getPlaylistCards: (name: string) => MindfulnessCard[];
  loading: boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  playlists: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
  addToPlaylist: () => {},
  removeFromPlaylist: () => {},
  createPlaylist: () => {},
  deletePlaylist: () => {},
  renamePlaylist: () => {},
  getCardById: () => undefined,
  getPlaylistCards: () => [],
  loading: false,
});

export const useFavorites = () => useContext(FavoritesContext);

const LOCAL_KEY = 'zenya_saved_cards';
const LOCAL_PLAYLISTS_KEY = 'zenya_playlists';

function loadLocal(): SavedEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocal(entries: SavedEntry[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(entries));
}

function loadLocalPlaylists(): string[] {
  try {
    const raw = localStorage.getItem(LOCAL_PLAYLISTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveLocalPlaylists(names: string[]) {
  localStorage.setItem(LOCAL_PLAYLISTS_KEY, JSON.stringify(names));
}

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [entries, setEntries] = useState<SavedEntry[]>([]);
  const [playlistNames, setPlaylistNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Load data on mount or user change
  useEffect(() => {
    if (user) {
      setLoading(true);
      supabase
        .from('zenya_saved_cards')
        .select('card_id, playlist_name')
        .eq('user_id', user.id)
        .then(({ data }) => {
          if (data) {
            setEntries(data);
            const names = [...new Set(data.map(d => d.playlist_name).filter(n => n !== 'Favorites'))];
            setPlaylistNames(names);
          }
          setLoading(false);
        });
    } else {
      setEntries(loadLocal());
      setPlaylistNames(loadLocalPlaylists());
    }
  }, [user]);

  // Persist local changes for non-auth users
  const persist = useCallback((newEntries: SavedEntry[], newPlaylistNames?: string[]) => {
    if (!user) {
      saveLocal(newEntries);
      if (newPlaylistNames !== undefined) saveLocalPlaylists(newPlaylistNames);
    }
  }, [user]);

  const favorites = [...new Set(entries.filter(e => e.playlist_name === 'Favorites').map(e => e.card_id))];

  const playlists: Playlist[] = [
    { name: 'Favorites', cardIds: favorites },
    ...playlistNames.map(name => ({
      name,
      cardIds: entries.filter(e => e.playlist_name === name).map(e => e.card_id),
    })),
  ];

  const isFavorite = useCallback((cardId: string) => {
    return entries.some(e => e.card_id === cardId && e.playlist_name === 'Favorites');
  }, [entries]);

  const toggleFavorite = useCallback(async (cardId: string) => {
    const exists = entries.some(e => e.card_id === cardId && e.playlist_name === 'Favorites');
    let newEntries: SavedEntry[];

    if (exists) {
      newEntries = entries.filter(e => !(e.card_id === cardId && e.playlist_name === 'Favorites'));
      if (user) {
        await supabase.from('zenya_saved_cards').delete()
          .eq('user_id', user.id).eq('card_id', cardId).eq('playlist_name', 'Favorites');
      }
    } else {
      newEntries = [...entries, { card_id: cardId, playlist_name: 'Favorites' }];
      if (user) {
        await supabase.from('zenya_saved_cards').insert({
          user_id: user.id, card_id: cardId, playlist_name: 'Favorites',
        });
      }
    }
    setEntries(newEntries);
    persist(newEntries);
  }, [entries, user, persist]);

  const addToPlaylist = useCallback(async (cardId: string, playlistName: string) => {
    if (entries.some(e => e.card_id === cardId && e.playlist_name === playlistName)) return;
    const newEntries = [...entries, { card_id: cardId, playlist_name: playlistName }];
    setEntries(newEntries);
    persist(newEntries);
    if (user) {
      await supabase.from('zenya_saved_cards').insert({
        user_id: user.id, card_id: cardId, playlist_name: playlistName,
      });
    }
  }, [entries, user, persist]);

  const removeFromPlaylist = useCallback(async (cardId: string, playlistName: string) => {
    const newEntries = entries.filter(e => !(e.card_id === cardId && e.playlist_name === playlistName));
    setEntries(newEntries);
    persist(newEntries);
    if (user) {
      await supabase.from('zenya_saved_cards').delete()
        .eq('user_id', user.id).eq('card_id', cardId).eq('playlist_name', playlistName);
    }
  }, [entries, user, persist]);

  const createPlaylist = useCallback(async (name: string) => {
    if (name === 'Favorites' || playlistNames.includes(name)) return;
    const newNames = [...playlistNames, name];
    setPlaylistNames(newNames);
    persist(entries, newNames);
  }, [playlistNames, entries, persist]);

  const deletePlaylist = useCallback(async (name: string) => {
    if (name === 'Favorites') return;
    const newNames = playlistNames.filter(n => n !== name);
    const newEntries = entries.filter(e => e.playlist_name !== name);
    setPlaylistNames(newNames);
    setEntries(newEntries);
    persist(newEntries, newNames);
    if (user) {
      await supabase.from('zenya_saved_cards').delete()
        .eq('user_id', user.id).eq('playlist_name', name);
    }
  }, [playlistNames, entries, user, persist]);

  const renamePlaylist = useCallback(async (oldName: string, newName: string) => {
    if (oldName === 'Favorites' || !newName || playlistNames.includes(newName)) return;
    const newNames = playlistNames.map(n => n === oldName ? newName : n);
    const newEntries = entries.map(e => e.playlist_name === oldName ? { ...e, playlist_name: newName } : e);
    setPlaylistNames(newNames);
    setEntries(newEntries);
    persist(newEntries, newNames);
    if (user) {
      await supabase.from('zenya_saved_cards').update({ playlist_name: newName })
        .eq('user_id', user.id).eq('playlist_name', oldName);
    }
  }, [playlistNames, entries, user, persist]);

  const getCardById = useCallback((id: string) => allCardsMap.get(id), []);

  const getPlaylistCards = useCallback((name: string) => {
    return entries
      .filter(e => e.playlist_name === name)
      .map(e => allCardsMap.get(e.card_id))
      .filter(Boolean) as MindfulnessCard[];
  }, [entries]);

  return (
    <FavoritesContext.Provider value={{
      favorites, playlists, isFavorite, toggleFavorite,
      addToPlaylist, removeFromPlaylist, createPlaylist, deletePlaylist, renamePlaylist,
      getCardById, getPlaylistCards, loading,
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};
