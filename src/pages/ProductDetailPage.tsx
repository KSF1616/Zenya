import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowLeft, ShoppingBag, Download, FileText, Check, Truck } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage() {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!handle) return;
      setLoading(true);

      const { data } = await supabase
        .from('ecom_products')
        .select('*, variants:ecom_product_variants(*)')
        .eq('handle', handle)
        .single();

      if (data) {
        let variants = data.variants || [];
        if (data.has_variants && variants.length === 0) {
          const { data: variantData } = await supabase
            .from('ecom_product_variants')
            .select('*')
            .eq('product_id', data.id)
            .order('position');
          variants = variantData || [];
          data.variants = variants;
        }
        setProduct(data);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [handle]);

  const isFree = !product?.price || product?.price === 0;
  const price = product?.price || 0;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart({
      product_id: product.id,
      name: product.name,
      sku: product.sku || product.handle,
      price: product.price,
      image: product.images?.[0],
    }, quantity);
    toast.success(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="aspect-[3/4] bg-gray-100 rounded-3xl animate-pulse" />
              <div className="space-y-4">
                <div className="h-8 w-48 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-12 w-full bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-6 w-32 bg-gray-100 rounded-lg animate-pulse" />
                <div className="h-32 w-full bg-gray-100 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="max-w-6xl mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl font-bold text-gray-500 mb-4">Product not found</h2>
            <Link to="/library" className="text-purple-600 hover:underline">Browse library</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumb */}
          <Link to="/library" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Library
          </Link>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Image */}
            <div className="relative">
              <div className="sticky top-28">
                <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-gray-100 shadow-lg">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {isFree && (
                    <span className="px-3 py-1.5 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wider">Free</span>
                  )}
                  {product.tags?.includes('bestseller') && (
                    <span className="px-3 py-1.5 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">Bestseller</span>
                  )}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-purple-600 uppercase tracking-wider">{product.product_type}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.name}</h1>

              {/* Price */}
              <div className="mb-6">
                {isFree ? (
                  <span className="text-3xl font-bold text-green-600">Free Download</span>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">${(price / 100).toFixed(2)}</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

              {/* Metadata */}
              {product.metadata && (
                <div className="bg-gray-50 rounded-2xl p-5 mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-600" /> Product Details
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {product.metadata.pages && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Pages:</span>
                        <span className="font-medium text-gray-900">{product.metadata.pages}</span>
                      </div>
                    )}
                    {product.metadata.format && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Format:</span>
                        <span className="font-medium text-gray-900">{product.metadata.format}</span>
                      </div>
                    )}
                    {product.metadata.file_size && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">File Size:</span>
                        <span className="font-medium text-gray-900">{product.metadata.file_size}</span>
                      </div>
                    )}
                    {product.metadata.includes && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">Includes:</span>
                        <span className="font-medium text-gray-900">{product.metadata.includes}</span>
                      </div>
                    )}
                    {product.metadata.savings && (
                      <div className="flex items-center gap-2 text-sm col-span-2">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">{product.metadata.savings}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Quantity & Add to Cart */}
              {!isFree && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                    >
                      -
                    </button>
                    <span className="px-4 py-3 font-semibold text-gray-900 min-w-[3rem] text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-3 text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-sm text-gray-500">
                    Total: <span className="font-bold text-gray-900">${((price * quantity) / 100).toFixed(2)}</span>
                  </span>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-lg transition-all ${
                  isFree
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-green-600 hover:to-emerald-600 shadow-lg hover:shadow-xl'
                    : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl'
                }`}
              >
                {isFree ? (
                  <><Download className="w-5 h-5" /> Get Free Download</>
                ) : (
                  <><ShoppingBag className="w-5 h-5" /> Add to Cart</>
                )}
              </button>

              {/* Benefits */}
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  Instant digital download
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Truck className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  Free shipping on all orders
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  Printable PDF format
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-green-600" />
                  </div>
                  Lifetime access to updates
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
