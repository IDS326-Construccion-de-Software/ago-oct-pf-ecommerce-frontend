import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OrdersManager from '../components/OrdersManager';
import '../styles/OrdersPage.css';

export default function OrdersPage() {
  useEffect(() => {
    // Scroll al inicio cuando se carga la página
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <OrdersManager />
        </div>
      </main>
      <Footer />
    </div>
  );
}