import { useContext } from 'react';
import { CartContext } from "../context/CartContext";
import ShoppingCart from "./ShoppingCart";
import PaymentModal from './PaymentModal';
import OrderConfirmationModal from './OrderConfirmationModal';

const GlobalCartWrapper = ({ children }) => {
  const { 
    cartItems, 
    setIsCartOpen, 
    isPaymentModalOpen, 
    setIsPaymentModalOpen,
    isConfirmationModalOpen,
    setIsConfirmationModalOpen,
    latestOrder
  } = useContext(CartContext);

  const cartTotal = (cartItems || []).reduce(
    (total, item) => total + (item.price * (item.quantity || 1)), 
    0
  );

  const handleCheckout = () => {
    if (cartItems && cartItems.length > 0) {
      setIsCartOpen(false);
      setIsPaymentModalOpen(true);
    }
  };

  return (
    <>
      {children}
      <ShoppingCart onCheckout={handleCheckout} />
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        cartItems={cartItems || []} 
        total={cartTotal} 
      />
      <OrderConfirmationModal 
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        order={latestOrder}
      />
    </>
  );
};

export default GlobalCartWrapper;
