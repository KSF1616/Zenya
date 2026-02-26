import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/lib/supabase';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import { ArrowLeft, Lock, ShieldCheck } from 'lucide-react';

const STRIPE_ACCOUNT_ID = 'STRIPE_ACCOUNT_ID';
const stripePromise = STRIPE_ACCOUNT_ID && STRIPE_ACCOUNT_ID !== 'STRIPE_ACCOUNT_ID'
  ? loadStripe('pk_live_51OJhJBHdGQpsHqInIzu7c6PzGPSH0yImD4xfpofvxvFZs0VFhPRXZCyEgYkkhOtBOXFWvssYASs851mflwQvjnrl00T6DbUwWZ', { stripeAccount: STRIPE_ACCOUNT_ID })
  : null;

function CheckoutPaymentForm({ onSuccess }: { onSuccess: (paymentIntent: any) => void }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError('');
    const { error: submitError, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (submitError) {
      setError(submitError.message || 'Payment failed');
      setLoading(false);
    } else if (paymentIntent?.status === 'succeeded') {
      onSuccess(paymentIntent);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {error && <p className="text-red-500 mt-3 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-pink-600 transition-all"
      >
        {loading ? (
          <>
            <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Processing...
          </>
        ) : (
          <>
            <Lock className="w-5 h-5" /> Pay Now
          </>
        )}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCart();
  const [clientSecret, setClientSecret] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingAddress, setShippingAddress] = useState({
    name: '', email: '', address: '', city: '', state: '', zip: '', country: 'US',
  });

  useEffect(() => {
    if (cart.length === 0) return;

    const total = cartTotal + shippingCost;
    if (total <= 0) return;

    supabase.functions.invoke('create-payment-intent', {
      body: { amount: total, currency: 'usd' },
    }).then(({ data, error }) => {
      if (error) {
        console.error('Payment intent error:', error);
        setPaymentError('Unable to initialize payment. Please try again.');
        return;
      }
      if (data?.clientSecret) setClientSecret(data.clientSecret);
      else setPaymentError('Unable to initialize payment. Please try again.');
    });
  }, [cart, cartTotal, shippingCost]);

  // Calculate shipping
  useEffect(() => {
    if (cart.length === 0) return;
    supabase.functions.invoke('calculate-shipping', {
      body: {
        cartItems: cart.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
        shippingRules: 'Free shipping on all orders',
        subtotal: cartTotal,
      },
    }).then(({ data }) => {
      if (data?.success) setShippingCost(data.shippingCents || 0);
    });
  }, [cart, cartTotal]);

  const handlePaymentSuccess = async (paymentIntent: any) => {
    const total = cartTotal + shippingCost;

    // Create or find customer
    const { data: customer } = await supabase
      .from('ecom_customers')
      .upsert({ email: shippingAddress.email, name: shippingAddress.name }, { onConflict: 'email' })
      .select('id')
      .single();

    // Create order
    const { data: order } = await supabase
      .from('ecom_orders')
      .insert({
        customer_id: customer?.id,
        status: 'paid',
        subtotal: cartTotal,
        tax: 0,
        shipping: shippingCost,
        total,
        shipping_address: shippingAddress,
        stripe_payment_intent_id: paymentIntent.id,
      })
      .select('id')
      .single();

    if (order) {
      const orderItems = cart.map(item => ({
        order_id: order.id,
        product_id: item.product_id,
        variant_id: item.variant_id || null,
        product_name: item.name,
        variant_title: item.variant_title || null,
        sku: item.sku || null,
        quantity: item.quantity,
        unit_price: item.price,
        total: item.price * item.quantity,
      }));
      await supabase.from('ecom_order_items').insert(orderItems);

      // Send confirmation email
      await supabase.functions.invoke('send-order-confirmation', {
        body: {
          orderId: order.id,
          customerEmail: shippingAddress.email,
          customerName: shippingAddress.name,
          orderItems,
          subtotal: cartTotal,
          shipping: shippingCost,
          tax: 0,
          total,
          shippingAddress,
        },
      });

      clearCart();
      navigate(`/order-confirmation?orderId=${order.id}`);
    }
  };

  const updateField = (field: string, value: string) => {
    setShippingAddress(prev => ({ ...prev, [field]: value }));
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-20 md:pt-24">
          <div className="max-w-4xl mx-auto px-4 py-16 text-center">
            <h1 className="text-2xl font-bold text-gray-500 mb-4">Your cart is empty</h1>
            <Link to="/library" className="text-purple-600 hover:underline">Browse Library</Link>
          </div>
        </main>
      </div>
    );
  }

  const total = cartTotal + shippingCost;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="pt-20 md:pt-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <Link to="/cart" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-purple-700 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Cart
          </Link>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 space-y-8">
              {/* Shipping Info */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Contact & Shipping</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    placeholder="Full Name"
                    value={shippingAddress.name}
                    onChange={e => updateField('name', e.target.value)}
                    className="col-span-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                    required
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={shippingAddress.email}
                    onChange={e => updateField('email', e.target.value)}
                    className="col-span-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                    required
                  />
                  <input
                    placeholder="Street Address"
                    value={shippingAddress.address}
                    onChange={e => updateField('address', e.target.value)}
                    className="col-span-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                  <input
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={e => updateField('city', e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                  <input
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={e => updateField('state', e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                  <input
                    placeholder="ZIP Code"
                    value={shippingAddress.zip}
                    onChange={e => updateField('zip', e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                  <input
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={e => updateField('country', e.target.value)}
                    className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 transition-all"
                  />
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-purple-600" /> Payment
                </h2>
                {!stripePromise ? (
                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl">
                    <p className="text-amber-800 text-sm">Payment processing is being set up. Please check back soon.</p>
                  </div>
                ) : paymentError ? (
                  <div className="bg-red-50 border border-red-200 p-4 rounded-xl">
                    <p className="text-red-800 text-sm">{paymentError}</p>
                  </div>
                ) : clientSecret ? (
                  <Elements stripe={stripePromise} options={{ clientSecret }}>
                    <CheckoutPaymentForm onSuccess={handlePaymentSuccess} />
                  </Elements>
                ) : (
                  <div className="flex items-center justify-center py-8">
                    <svg className="animate-spin w-8 h-8 text-purple-600" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span className="ml-3 text-gray-500">Loading payment form...</span>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-gray-400">
                  <ShieldCheck className="w-4 h-4" />
                  Secured by Stripe. Your payment information is encrypted.
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 sticky top-28">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  {cart.map(item => (
                    <div key={item.product_id + (item.variant_id || '')} className="flex gap-3">
                      {item.image && (
                        <div className="w-12 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900 shrink-0">
                        ${((item.price * item.quantity) / 100).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-medium">${(cartTotal / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Shipping</span>
                    <span className="font-medium text-green-600">{shippingCost === 0 ? 'Free' : `$${(shippingCost / 100).toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Tax</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900 text-lg">Total</span>
                    <span className="font-bold text-xl text-gray-900">${(total / 100).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
