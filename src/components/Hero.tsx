import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const LOGO_URL = 'https://d64gsuwffb70l.cloudfront.net/692bc9245f44a664483e6b47_1772077911324_749f1ad2.png';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-pink-50" />
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-green-200/20 rounded-full blur-3xl" />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #8B3A9C 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold mb-6">
              <Sparkles className="w-4 h-4" />
              Your Daily Mindfulness Companion
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Spin. Draw.{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-green-500 bg-clip-text text-transparent">
                Transform.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
              ZENYA brings mindfulness to life through interactive spinning wheels and beautifully crafted practice cards. 
              Discover your daily wellness workout in a whole new way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link
                to="/workout"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <Play className="w-5 h-5" /> Start Your Workout
              </Link>
              <Link
                to="/library"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-white text-gray-700 font-bold text-lg border-2 border-gray-200 hover:border-purple-300 hover:text-purple-700 shadow-sm hover:shadow-md transition-all"
              >
                Explore Library <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 mt-10 justify-center lg:justify-start">
              <div>
                <div className="text-2xl font-bold text-gray-900">30+</div>
                <div className="text-sm text-gray-500">Practice Cards</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-2xl font-bold text-gray-900">13</div>
                <div className="text-sm text-gray-500">Categories</div>
              </div>
              <div className="w-px h-10 bg-gray-200" />
              <div>
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-500">Wheels</div>
              </div>
            </div>
          </div>

          {/* Right - Logo Animation */}
          <div className="relative flex items-center justify-center">
            <div className="relative">
              {/* Glow rings */}
              <div className="absolute inset-0 -m-8 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-2xl animate-pulse" />
              <div className="absolute inset-0 -m-16 rounded-full bg-gradient-to-r from-green-400/10 to-purple-400/10 blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
              
              {/* Logo */}
              <div className="relative w-64 md:w-80 lg:w-96 animate-float">
                <img
                  src={LOGO_URL}
                  alt="ZENYA"
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white shadow-lg animate-bounce" style={{ animationDelay: '0.3s' }}>
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="absolute -bottom-2 -left-6 px-4 py-2 bg-white rounded-xl shadow-lg border border-gray-100 animate-bounce" style={{ animationDelay: '0.7s' }}>
                <span className="text-sm font-semibold text-gray-700">Zen</span>
                <span className="mx-1 text-gray-300">·</span>
                <span className="text-sm font-semibold text-purple-600">Energy</span>
                <span className="mx-1 text-gray-300">·</span>
                <span className="text-sm font-semibold text-pink-600">You</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for float animation */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
