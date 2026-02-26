import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import ProductCard from './ProductCard';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function LibraryPreview() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data } = await supabase
        .from('ecom_products')
        .select('*')
        .eq('status', 'active')
        .contains('tags', ['featured'])
        .limit(4);
      if (data) setProducts(data);
      setLoading(false);
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" /> ZENYA Library
            </span>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Guides, Journals & Planners
            </h2>
            <p className="text-lg text-gray-600 max-w-xl">
              Deepen your practice with our curated collection of wellness resources. Free and premium downloads available.
            </p>
          </div>
          <Link
            to="/library"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-gray-700 font-semibold hover:border-purple-300 hover:text-purple-700 transition-all shrink-0"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Free Shipping Banner */}
        <div className="mt-12 bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2">Free Shipping on All Orders</h3>
          <p className="text-white/80 mb-4">Digital downloads delivered instantly to your inbox</p>
          <Link
            to="/library"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-purple-700 font-semibold hover:bg-gray-100 transition-colors"
          >
            Browse Library <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
