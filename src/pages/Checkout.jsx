import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';

const api = import.meta.env.VITE_API_BASE || 'http://localhost:7033';

function CheckoutForm(){
  const { cartItems, clearCart } = useCart();
  const [stripe, setStripe] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  const [loading, setLoading] = useState(false);

  const amountCents = Math.round(cartItems.reduce((acc, i) => acc + (i.price * (i.quantity || 1)), 0) * 1.18 * 100); // con 18% impuestos

  useEffect(() => {
    const createIntent = async () => {
      try {
        const { data } = await axios.post(`${api}/api/payment/create-payment-intent`, {
          amount: amountCents,
          currency: 'usd',
          metadata: { items: String(cartItems.length) }
        });
        setClientSecret(data.clientSecret);
      } catch {
        Swal.fire({ icon: 'error', title: 'No se pudo iniciar el pago' });
      }
    };
    if (amountCents > 0) createIntent();
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '';
    if (pk) loadStripe(pk).then(setStripe);
  }, [amountCents, cartItems.length]);

  const handlePay = async (e) => {
    e.preventDefault();
    if (!stripe || !clientSecret) return;
    setLoading(true);
    try {
      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: 'pm_card_visa' // Demo en modo test. Para producción usar Elements/Payment Element.
      });
      if (error) {
        Swal.fire({ icon: 'error', title: 'Pago rechazado', text: error.message });
      } else if (paymentIntent?.status === 'succeeded') {
        Swal.fire({ icon: 'success', title: 'Pago realizado' });
        clearCart();
      }
    } catch {
      Swal.fire({ icon: 'error', title: 'Error procesando pago' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handlePay} style={{ display: 'grid', gap: 12, maxWidth: 480 }}>
  <p>Demo: se usará un método de prueba (pm_card_visa). Para producción, integra Payment Element.</p>
      <button className="nl-btn" disabled={!clientSecret || loading}>
        {loading ? 'Procesando…' : 'Pagar ahora'}
      </button>
    </form>
  );
}

export default function Checkout(){
  return (
    <>
      <Header />
      <main className="container" style={{ padding: '24px 0' }}>
        <h1>Checkout</h1>
        <CheckoutForm />
      </main>
      <Footer />
    </>
  );
}
