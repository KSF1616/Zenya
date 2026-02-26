import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CheckCircle2, Download, ArrowRight, Mail } from 'lucide-react';

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    if (!orderId) return;
    const fetchOrder = async () => {
      const { data: orderData } = await supabase
        .from('ecom_orders')
        .select('*')
        .eq('id', orderId)
        .single();
      if (orderData) setOrder(orderData);

      const { data: items } = await supabase
        .from('ecom_order_items')
        .select('*')
        .eq('order_id', orderId);
      if (items) setOrderItems(items);
    };
    fetchOrder();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Order Confirmed!</h1>
            <p className="text-lg text-gray-600">
              Thank you for your purchase. Your digital downloads are on their way.
            </p>
          </div>

          {order && (
            <div className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 mb-6">
              <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
                <span>Order #{orderId?.slice(0, 8).toUpperCase()}</span>
                <span className="text-gray-300">|</span>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold">Paid</span>
              </div>

              {/* Order Items */}
              <div className="space-y-3 mb-6">
                {orderItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{item.product_name}</p>
                      {item.variant_title && <p className="text-sm text-gray-500">{item.variant_title}</p>}
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-medium text-gray-900">${(item.total / 100).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${(order.subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600">{order.shipping === 0 ? 'Free' : `$${(order.shipping / 100).toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-100">
                  <span>Total</span>
                  <span>${(order.total / 100).toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-purple-50 rounded-2xl p-6 mb-6">
            <h3 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5" /> What's Next?
            </h3>
            <ul className="space-y-2 text-sm text-purple-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-purple-600" />
                A confirmation email with your download links has been sent.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-purple-600" />
                Your digital products are available for immediate download.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0 text-purple-600" />
                You have lifetime access to any future updates.
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/workout"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold hover:from-purple-700 hover:to-pink-600 transition-all"
            >
              Start Your Workout <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/library"
              className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border-2 border-gray-200 text-gray-700 font-bold hover:border-purple-300 transition-all"
            >
              <Download className="w-4 h-4" /> Browse More Resources
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
