import "../styles/Modal.css"; // primero, para que sus estilos se mantengan
import "../styles/CartDetail.css";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartItemsList from "../components/CartItemsList";
import { useState, useEffect } from "react";
import Modal from "../components/Modal";
import ProductCarousel from "../components/ProductCarousel";
import { ProductClient } from "../api/ProductClient";
import PaymentModal from "../components/PaymentModal";

export default function CartDetail() {
  const { cartItems, clearCart, addToCart } = useCart();
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponMessage, setCouponMessage] = useState("");

  // Cupones por defecto
  const COUPONS = [
    { code: "KANKICUPON", discount: 0.1, label: "10% de descuento" },
    { code: "ITEBI", discount: 0, label: "Quita el ITBIS" },
    { code: "COLAFURRA", discount: 0.05, label: "5% de descuento y Cola Furra gratis" }
  ];

  const [colaFurraAdded, setColaFurraAdded] = useState(false);

  useEffect(() => {
    const loadProducts = () => {
      try {
        setLoadingProducts(true);
        const response = ProductClient.getAllProducts(1, 20);
        setProducts(response.data?.items || []);
      } catch (err) {
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };
    loadProducts();
  }, []);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * item.quantity,
    0
  );
  // Lógica de cupones especiales
  let taxes = subtotal * 0.18;
  let discountAmount = appliedCoupon ? appliedCoupon.discount * subtotal : 0;

  // Si el cupón es ITVIS, quita el ITBIS
  if (appliedCoupon && appliedCoupon.code === "ITVIS") {
    taxes = 0;
  }

  // Si el cupón es COLAFURRA, añade producto gratis si no está ya
  useEffect(() => {
    if (appliedCoupon && appliedCoupon.code === "COLAFURRA" && !colaFurraAdded) {
      addToCart({
        id: "cola-furra-gratis",
        name: "Cola Furra Gratis",
        price: 0,
        quantity: 1,
        brand: "Cola Furra",
        category: "Bebidas"
      });
      setColaFurraAdded(true);
    }
    if (!appliedCoupon || appliedCoupon.code !== "COLAFURRA") {
      setColaFurraAdded(false);
    }
  }, [appliedCoupon, addToCart, colaFurraAdded]);

  const total = subtotal + taxes - discountAmount;

  const handleProceedToPayment = () => setIsPaymentModalOpen(true);

  const handleClearCart = () => {
    clearCart();
    setIsClearModalOpen(false);
  };

  const handleApplyCoupon = () => {
    const found = COUPONS.find(c => c.code === couponInput.trim().toUpperCase());
    if (found) {
      setAppliedCoupon(found);
      setCouponMessage(`Cupón "${found.code}" aplicado: ${found.label}`);
    } else {
      setAppliedCoupon(null);
      setCouponMessage("Cupón inválido. Prueba con: DESCUENTO10, ENVIOGRATIS, REVENGE5");
    }
  };

  return (
    <div>
      <Header />
      <div className="cart-detail-container">
        <div className="left-section">
          <div className="criteria-box">
            <h2>Criterios de sustitución</h2>
            <div className="criteria-options">
              <label>
                <input type="radio" name="criterio" value="contactar" />
                Contactar
              </label>
              <label>
                <input type="radio" name="criterio" value="desestimar" />
                Desestimar
              </label>
            </div>
          </div>

          <div className="items-box">
            <h3>Productos en el carrito</h3>
            <CartItemsList />
          </div>

          {/* Botón Vaciar Carrito */}
          <button 
            className="clear-cart-btn" 
            onClick={() => setIsClearModalOpen(true)}
            disabled={cartItems.length === 0} // opcional: deshabilitar si está vacío
          >
            Vaciar carrito
          </button>
        </div>

        <div className="right-section">
          <h2>Aplicar cupón</h2>
          <div className="coupon-box">
            <input
              type="text"
              placeholder="Introduce tu cupón"
              value={couponInput}
              onChange={e => setCouponInput(e.target.value)}
              disabled={!!appliedCoupon}
            />
            <button
              onClick={handleApplyCoupon}
              disabled={!!appliedCoupon || !couponInput.trim()}
            >
              Aplicar
            </button>
          </div>
          {couponMessage && (
            <div className={`coupon-message${appliedCoupon ? " success" : " error"}`}>
              {couponMessage}
            </div>
          )}
          <div className="summary-box">
            <h3>Resumen de la compra</h3>
            <hr />
            <div className="summary-line">
              <span>Subtotal:</span>
              <span>${subtotal.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="summary-line">
              <span>Impuestos (18 %):</span>
              <span>${taxes.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            {appliedCoupon && (
              <div className="summary-line">
                <span>Descuento ({appliedCoupon.label}):</span>
                <span>-${discountAmount.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
              </div>
            )}
            <div className="summary-line total">
              <span>Total:</span>
              <span>${total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
            </div>
            <button className="checkout-btn3" onClick={handleProceedToPayment}>
              Proceder al pago
            </button>
          </div>
        </div>
      </div>

      <div className="cart-detail-container">
        <ProductCarousel
          title="También te puede interesar"
          products={products}
          loading={loadingProducts}
          onAdd={addToCart} 
        />
      </div>

      <Modal
        message="¿Estás seguro de que deseas vaciar todo el carrito?"
        isOpen={isClearModalOpen}
        onClose={() => setIsClearModalOpen(false)}
        onConfirm={handleClearCart}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        cartItems={cartItems}
        subtotal={subtotal}
        taxes={taxes}
        discountAmount={discountAmount}
        appliedCoupon={appliedCoupon}
        total={total}
      />

      <Footer />
    </div>
  );
}
