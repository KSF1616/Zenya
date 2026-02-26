import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

          {cart.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-500 mb-2">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">Browse our library to find wellness resources.</p>
              <Link
                to="/library"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Browse Library
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => (
                  <div
                    key={item.product_id + (item.variant_id || '')}
                    className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 flex gap-4"
                  >
                    {item.image && (
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                      {item.variant_title && (
                        <p className="text-sm text-gray-500">{item.variant_title}</p>
                      )}
                      <p className="text-lg font-bold text-gray-900 mt-1">
                        {item.price === 0 ? 'Free' : `$${(item.price / 100).toFixed(2)}`}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity - 1)}
                            className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-3 py-1.5 font-medium text-sm min-w-[2rem] text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product_id, item.variant_id, item.quantity + 1)}
                            className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product_id, item.variant_id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-28">
                  <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal</span>
                      <span className="font-medium">${(cartTotal / 100).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-gray-900">${(cartTotal / 100).toFixed(2)}</span>
                    </div>
                  </div>

                  <Link
                    to="/checkout"
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold hover:from-purple-700 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all"
                  >
                    Checkout <ArrowRight className="w-4 h-4" />
                  </Link>

                  <Link
                    to="/library"
                    className="w-full flex items-center justify-center gap-2 mt-3 py-3 rounded-xl text-gray-600 font-medium hover:bg-gray-50 transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" /> Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
