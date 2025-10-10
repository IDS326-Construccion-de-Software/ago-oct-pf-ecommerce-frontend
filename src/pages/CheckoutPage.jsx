// src/pages/CheckoutPage.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCheckout } from '../context/CheckoutContext';
import { useCart } from '../context/CartContext';
import PaymentForm from '../components/PaymentForm';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { formatCurrency } from '../services/orderService';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { checkoutData, completeCheckout } = useCheckout();
  const { clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Obtener datos del carrito desde location.state o checkoutData
  const cartItems = location.state?.cartItems || checkoutData?.items || [];
  const cartTotal = location.state?.cartTotal || checkoutData?.total || 0;
  const source = location.state?.source || checkoutData?.source || 'cart';
  
  // Si no hay productos, redirigir
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      navigate('/');
    }
  }, [cartItems, navigate]);
  
  const handlePaymentSuccess = async (paymentData) => {
    setIsProcessing(true);
    
    try {
      const result = await completeCheckout(paymentData);
      
      if (result.success) {
        setOrderPlaced(true);
        
        // Si vino del carrito, limpiarlo
        if (source === 'cart') {
          clearCart();
        }
      }
    } catch (error) {
      console.error('Error procesando el pago:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-green-500 text-6xl mb-4">✓</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago exitoso!</h1>
            <p className="text-gray-600 mb-6">Tu pedido ha sido procesado correctamente.</p>
            <p className="text-gray-600 mb-8">Recibirás un correo de confirmación con los detalles de tu compra.</p>
            <button
              onClick={() => navigate('/')}
              className="w-full bg-[#EC6426] text-white py-3 px-4 rounded-md hover:bg-[#D95420] transition-colors font-semibold"
            >
              Volver al inicio
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const subtotal = cartTotal * 0.9;
  const shipping = cartTotal * 0.1;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-[#632713] mb-8">Finalizar compra</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Resumen del pedido */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#632713]">Resumen del pedido</h2>
                
                {/* Lista de productos */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item, index) => (
                    <div key={item.id || index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {item.image && (
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/64?text=Producto";
                          }}
                        />
                      )}
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">
                          {formatCurrency(item.price)} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-semibold text-[#EC6426]">
                        {formatCurrency(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Totales */}
                <div className="bg-gradient-to-br from-[#FFF5EC] to-[#FDE3CF] p-6 rounded-lg space-y-3">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Subtotal</span>
                    <span className="font-semibold">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Envío</span>
                    <span className="font-semibold">{formatCurrency(shipping)}</span>
                  </div>
                  <div className="border-t-2 border-[#632713]/20 my-2"></div>
                  <div className="flex justify-between py-2">
                    <span className="text-xl font-bold text-[#632713]">Total</span>
                    <span className="text-xl font-bold text-[#EC6426]">{formatCurrency(cartTotal)}</span>
                  </div>
                </div>
              </div>
              
              {/* Formulario de pago */}
              <div>
                <h2 className="text-xl font-semibold mb-4 text-[#632713]">Información de pago</h2>
                <PaymentForm 
                  total={cartTotal} 
                  onPaymentSuccess={handlePaymentSuccess}
                  isProcessing={isProcessing}
                />
                
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p className="flex items-center justify-center gap-2">
                    <span className="text-green-600">🔒</span>
                    Tu información de pago está protegida con encriptación de 256 bits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;