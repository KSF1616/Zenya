import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useFavorites } from '@/contexts/FavoritesContext';
import { supabase } from '@/lib/supabase';
import { ShoppingBag, Menu, X, User, LogOut, ChevronDown, Heart, Bookmark } from 'lucide-react';

const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/692bc9245f44a664483e6b47_1772077911324_749f1ad2.png';

export default function Header() {
  const { cartCount } = useCart();
  const { user, signOut } = useAuth();
  const { favorites } = useFavorites();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fetchCollections = async () => {
      const { data } = await supabase
        .from('ecom_collections')
        .select('id, title, handle')
        .eq('is_visible', true);
      if (data) setCollections(data);
    };
    fetchCollections();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/80 backdrop-blur-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={LOGO_URL} alt="ZENYA" className="h-12 md:h-14 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive('/') ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'}`}
            >
              Home
            </Link>
            <Link
              to="/workout"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive('/workout') ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'}`}
            >
              Daily Workout
            </Link>
            <Link
              to="/cards"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${isActive('/cards') ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'}`}
            >
              Card Deck
            </Link>

            {/* Library Dropdown */}
            <div className="relative" onMouseEnter={() => setLibraryOpen(true)} onMouseLeave={() => setLibraryOpen(false)}>
              <Link
                to="/library"
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${isActive('/library') || location.pathname.startsWith('/collections') ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:text-purple-700 hover:bg-purple-50'}`}
              >
                Library <ChevronDown className="w-3 h-3" />
              </Link>
              {libraryOpen && (
                <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                  {collections.map(col => (
                    <Link
                      key={col.id}
                      to={`/collections/${col.handle}`}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      onClick={() => setLibraryOpen(false)}
                    >
                      {col.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-1.5">
            {/* Saved Cards */}
            <Link
              to="/saved-cards"
              className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-colors ${isActive('/saved-cards') ? 'bg-pink-100' : 'hover:bg-pink-50'}`}
              title="My Saved Cards"
            >
              <Heart className={`w-5 h-5 ${isActive('/saved-cards') ? 'text-pink-600 fill-pink-600' : favorites.length > 0 ? 'text-pink-500 fill-pink-500' : 'text-gray-700'}`} />
              {favorites.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-gray-700 hover:bg-purple-50 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user.name || user.email}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2">
                    <Link
                      to="/saved-cards"
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Bookmark className="w-4 h-4" /> My Saved Cards
                    </Link>
                    <button
                      onClick={() => { signOut(); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-gray-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
              >
                <User className="w-4 h-4" /> Sign In
              </Link>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-purple-50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-purple-50 transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 space-y-1">
            <Link to="/" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 font-medium" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link to="/workout" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 font-medium" onClick={() => setMobileOpen(false)}>Daily Workout</Link>
            <Link to="/cards" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 font-medium" onClick={() => setMobileOpen(false)}>Card Deck</Link>
            <Link to="/saved-cards" className="flex items-center gap-2 px-4 py-3 rounded-lg text-pink-600 hover:bg-pink-50 font-medium" onClick={() => setMobileOpen(false)}>
              <Heart className="w-4 h-4 fill-pink-600" /> My Saved Cards {favorites.length > 0 && <span className="ml-auto text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">{favorites.length}</span>}
            </Link>
            <Link to="/library" className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-purple-50 font-medium" onClick={() => setMobileOpen(false)}>Library</Link>
            <div className="pl-4 space-y-1">
              {collections.map(col => (
                <Link
                  key={col.id}
                  to={`/collections/${col.handle}`}
                  className="block px-4 py-2 rounded-lg text-sm text-gray-500 hover:bg-purple-50 hover:text-purple-700"
                  onClick={() => setMobileOpen(false)}
                >
                  {col.title}
                </Link>
              ))}
            </div>
            {!user && (
              <Link to="/login" className="block px-4 py-3 rounded-lg text-purple-700 hover:bg-purple-50 font-medium" onClick={() => setMobileOpen(false)}>Sign In</Link>
            )}
            {user && (
              <button onClick={() => { signOut(); setMobileOpen(false); }} className="block w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 font-medium">Sign Out</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
