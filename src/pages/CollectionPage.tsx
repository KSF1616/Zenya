import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function CollectionPage() {
  const { handle } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollectionProducts = async () => {
      if (!handle) return;
      setLoading(true);

      const { data: collectionData } = await supabase
        .from('ecom_collections')
        .select('*')
        .eq('handle', handle)
        .single();

      if (!collectionData) {
        setLoading(false);
        return;
      }
      setCollection(collectionData);

      const { data: productLinks } = await supabase
        .from('ecom_product_collections')
        .select('product_id, position')
        .eq('collection_id', collectionData.id)
        .order('position');

      if (!productLinks || productLinks.length === 0) {
        setProducts([]);
        setLoading(false);
        return;
      }

      const productIds = productLinks.map(pl => pl.product_id);
      const { data: productsData } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .in('id', productIds)
        .eq('status', 'active');

      const sortedProducts = productIds
        .map(id => productsData?.find(p => p.id === id))
        .filter(Boolean);

      setProducts(sortedProducts as any[]);
      setLoading(false);
    };

    fetchCollectionProducts();
  }, [handle]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <Link to="/library" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>

          {loading ? (
            <div>
              <div className="h-12 w-64 bg-gray-200 rounded-xl animate-pulse mb-4" />
              <div className="h-6 w-96 bg-gray-200 rounded-lg animate-pulse mb-8" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1,2,3,4].map(i => (
                  <div key={i} className="bg-white rounded-2xl h-96 animate-pulse" />
                ))}
              </div>
            </div>
          ) : !collection ? (
            <div className="text-center py-16">
              <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-500 mb-2">Collection not found</h2>
              <Link to="/library" className="text-purple-600 hover:underline">Browse all resources</Link>
            </div>
          ) : (
            <>
              <div className="mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">{collection.title}</h1>
                {collection.description && (
                  <p className="text-lg text-gray-600">{collection.description}</p>
                )}
                <p className="text-sm text-gray-400 mt-2">{products.length} resource{products.length !== 1 ? 's' : ''}</p>
              </div>

              {products.length === 0 ? (
                <div className="text-center py-16">
                  <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No resources in this collection yet</h3>
                  <Link to="/library" className="text-purple-600 hover:underline">Browse all resources</Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
