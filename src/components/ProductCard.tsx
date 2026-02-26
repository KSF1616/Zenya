import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { ShoppingBag, Download, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
  product: any;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const isFree = !product.price || product.price === 0;
  const price = product.price || 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      product_id: product.id,
      name: product.name,
      sku: product.sku || product.handle,
      price: product.price,
      image: product.images?.[0],
    });
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <Link
      to={`/product/${product.handle}`}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <img
          src={product.images?.[0]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isFree && (
            <span className="px-3 py-1 rounded-full bg-green-500 text-white text-xs font-bold uppercase tracking-wider">
              Free
            </span>
          )}
          {product.tags?.includes('bestseller') && (
            <span className="px-3 py-1 rounded-full bg-amber-500 text-white text-xs font-bold uppercase tracking-wider">
              Bestseller
            </span>
          )}
          {product.tags?.includes('featured') && !product.tags?.includes('bestseller') && (
            <span className="px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-bold uppercase tracking-wider">
              Featured
            </span>
          )}
        </div>
        {/* Product Type Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-xs font-medium">
            {product.product_type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 group-hover:text-purple-700 transition-colors line-clamp-2 mb-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mb-3 flex-1">
          {product.description}
        </p>

        {/* Metadata */}
        {product.metadata && (
          <div className="flex gap-3 mb-3 text-xs text-gray-400">
            {product.metadata.pages && <span>{product.metadata.pages} pages</span>}
            {product.metadata.format && <span>{product.metadata.format}</span>}
          </div>
        )}

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <div>
            {isFree ? (
              <span className="text-lg font-bold text-green-600">Free</span>
            ) : (
              <span className="text-lg font-bold text-gray-900">${(price / 100).toFixed(2)}</span>
            )}
          </div>
          {isFree ? (
            <span className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-semibold hover:bg-green-200 transition-colors">
              <Download className="w-4 h-4" /> Get Free
            </span>
          ) : (
            <button
              onClick={handleAddToCart}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold hover:bg-purple-200 transition-colors"
            >
              <ShoppingBag className="w-4 h-4" /> Add to Cart
            </button>
          )}
        </div>
      </div>
    </Link>
  );
}
