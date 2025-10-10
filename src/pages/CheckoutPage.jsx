import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/PaymentForm';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Obtener el total del carrito desde la ubicación o usar un valor predeterminado
  const cartTotal = location.state?.cartTotal || 99.99;
  
  // Si no hay total, redirigir al carrito
  if (!location.state?.cartTotal) {
    navigate('/');
    return null;
  }
  
  const handlePaymentSuccess = () => {
    setOrderPlaced(true);
    // Aquí podrías limpiar el carrito o hacer otras acciones post-pago
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md text-center">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">¡Pago exitoso!</h1>
          <p className="text-gray-600 mb-6">Tu pedido ha sido procesado correctamente.</p>
          <p className="text-gray-600 mb-8">Recibirás un correo de confirmación con los detalles de tu compra.</p>
          <button
            onClick={() => navigate('/')}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold text-gray-900 mb-8">Finalizar compra</h1>
          
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">Resumen del pedido</h2>
            <div className="bg-gray-50 p-4 rounded-md">
              <div className="flex justify-between py-2">
                <span>Subtotal</span>
                <span>${(cartTotal * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Envío</span>
                <span>${(cartTotal * 0.1).toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 my-2"></div>
              <div className="flex justify-between py-2 font-bold">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
          
          <PaymentForm total={cartTotal} onPaymentSuccess={handlePaymentSuccess} />
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Tu información de pago está protegida con encriptación de 256 bits.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
