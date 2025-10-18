  /* eslint react-refresh/only-export-components: 0 */
  import { createContext, useState, useContext } from "react";

  export const CartContext = createContext();

  // Custom hook para usar el contexto más fácilmente
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error("useCart debe ser usado dentro de un CartProvider");
    }
    return context;
  };

  export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);  
    const [isCartOpen, setIsCartOpen] = useState(false); 
    const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [latestOrder, setLatestOrder] = useState(null);

    // Helper: Normalizar el producto para asegurar que tenga el campo 'image'
    const normalizeProduct = (product) => {
      // Si ya tiene 'image', lo dejamos como está
      if (product.image) {
        return product;
      }
      
      // Si tiene 'images' (array), tomamos la primera imagen
      if (product.images && Array.isArray(product.images) && product.images.length > 0) {
        return {
          ...product,
          image: product.images[0], // Extraemos la primera imagen
        };
      }
      
      // Si no tiene ninguna, ponemos un placeholder
      return {
        ...product,
        image: "https://via.placeholder.com/80?text=Sin+Imagen",
      };
    };

  const addToCart = (product, quantityToAdd = 1) => {
    const normalizedProduct = normalizeProduct(product);

    setCartItems((prev) => {
      const wasEmpty = prev.length === 0; // <-- guardamos si estaba vacío
      const existing = prev.find((p) => p.id === normalizedProduct.id);
      let newCart;
      if (existing) {
        newCart = prev.map((p) =>
          p.id === normalizedProduct.id
            ? { ...p, quantity: p.quantity + quantityToAdd }
            : p
        );
      } else {
        newCart = [...prev, { ...normalizedProduct, quantity: quantityToAdd }];
      }

      // Abrir carrito solo si estaba vacío antes de agregar
      if (wasEmpty) {
        setIsCartOpen(true);
      }

      return newCart;
    });
  };

    // Incrementar cantidad (para los botones +/- DENTRO del carrito)
    const increaseQuantity = (productId) => {
      setCartItems((prev) =>
        prev.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    };

    // Disminuir cantidad
    const decreaseQuantity = (productId) => {
      setCartItems((prev) =>
        prev
          .map((p) =>
            p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
          )
          .filter((p) => p.quantity > 0) // eliminar si llega a 0
      );
    };

    // Vaciar carrito
    const clearCart = () => {
      setCartItems([]);
    };

    // Eliminar un producto por su ID
    const removeItem = (productId) => {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    };

    return (
      <CartContext.Provider value={{
        cartItems,
        addToCart,
        removeItem,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        increaseQuantity,
        decreaseQuantity,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        isConfirmationModalOpen,
        setIsConfirmationModalOpen,
        latestOrder,
        setLatestOrder,
      }}
      >
        {children}
      </CartContext.Provider>
    );
  }