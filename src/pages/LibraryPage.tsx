import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { BookOpen, Filter, Search } from 'lucide-react';

export default function LibraryPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, collectionsRes] = await Promise.all([
        supabase.from('ecom_products').select('*').eq('status', 'active'),
        supabase.from('ecom_collections').select('*').eq('is_visible', true),
      ]);
      if (productsRes.data) setProducts(productsRes.data);
      if (collectionsRes.data) setCollections(collectionsRes.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(p => {
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeFilter === 'all') return matchesSearch;
    if (activeFilter === 'free') return matchesSearch && (!p.price || p.price === 0);
    if (activeFilter === 'paid') return matchesSearch && p.price > 0;
    return matchesSearch && p.product_type?.toLowerCase() === activeFilter.toLowerCase();
  });

  const productTypes = [...new Set(products.map(p => p.product_type).filter(Boolean))];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Page Header */}
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-4">
              <BookOpen className="w-4 h-4" /> ZENYA Library
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              Wellness Library
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Journals, planners, guides, and workbooks to deepen your mindfulness practice. 
              Free and premium resources available.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-8">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search resources..."
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'all' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({products.length})
              </button>
              <button
                onClick={() => setActiveFilter('free')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'free' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Free
              </button>
              <button
                onClick={() => setActiveFilter('paid')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === 'paid' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Premium
              </button>
              {productTypes.map(type => (
                <button
                  key={type}
                  onClick={() => setActiveFilter(type)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeFilter === type ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}s
                </button>
              ))}
            </div>
          </div>

          {/* Collections Quick Links */}
          <div className="flex flex-wrap gap-3 mb-8">
            {collections.map(col => (
              <Link
                key={col.id}
                to={`/collections/${col.handle}`}
                className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-medium text-gray-600 hover:border-purple-300 hover:text-purple-700 hover:shadow-sm transition-all"
              >
                {col.title}
              </Link>
            ))}
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[1,2,3,4,5,6,7,8].map(i => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-500 mb-2">No resources found</h3>
              <p className="text-gray-400">Try adjusting your search or filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="mt-6 text-center text-sm text-gray-500">
            Showing {filteredProducts.length} of {products.length} resources
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
