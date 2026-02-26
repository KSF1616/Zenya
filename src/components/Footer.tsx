import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Send, Instagram, Facebook, Youtube } from 'lucide-react';

const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/692bc9245f44a664483e6b47_1772077911324_749f1ad2.png';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-950 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">Join the ZENYA Community</h3>
            <p className="text-gray-400 mb-6">Get weekly mindfulness tips, free resources, and exclusive offers delivered to your inbox.</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full font-semibold hover:from-purple-700 hover:to-pink-600 transition-all flex items-center gap-2 shrink-0"
              >
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-3 text-green-400 text-sm animate-in fade-in">Welcome to the ZENYA family!</p>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img src={LOGO_URL} alt="ZENYA" className="h-16 w-auto mb-4 brightness-0 invert" />
            <p className="text-gray-400 text-sm leading-relaxed">
              Your daily mindfulness companion. Spin, draw, and transform your wellness journey one card at a time.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-purple-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Explore</h4>
            <ul className="space-y-2.5">
              <li><Link to="/workout" className="text-gray-400 hover:text-white text-sm transition-colors">Daily Workout</Link></li>
              <li><Link to="/cards" className="text-gray-400 hover:text-white text-sm transition-colors">Card Deck</Link></li>
              <li><Link to="/library" className="text-gray-400 hover:text-white text-sm transition-colors">Library</Link></li>
              <li><Link to="/collections/free-resources" className="text-gray-400 hover:text-white text-sm transition-colors">Free Resources</Link></li>
            </ul>
          </div>

          {/* Library */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Library</h4>
            <ul className="space-y-2.5">
              <li><Link to="/collections/journals" className="text-gray-400 hover:text-white text-sm transition-colors">Journals</Link></li>
              <li><Link to="/collections/planners" className="text-gray-400 hover:text-white text-sm transition-colors">Planners</Link></li>
              <li><Link to="/collections/guides-workbooks" className="text-gray-400 hover:text-white text-sm transition-colors">Guides</Link></li>
              <li><Link to="/collections/bundles" className="text-gray-400 hover:text-white text-sm transition-colors">Bundles</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-300 mb-4">Support</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ZENYA. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" /> for your wellness journey
          </p>
        </div>
      </div>
    </footer>
  );
}
