  /* eslint react-refresh/only-export-components: 0 */
  import { createContext, useState, useContext, useEffect } from "react";
  import { useAuth } from "./AuthContext";
  import { shoppingCartClient } from "../api/shoppingCartClient";
  import { cartItemClient } from "../api/cartItemsClient";

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
  const { user } = useAuth();
  const [activeCartId, setActiveCartId] = useState(null);
  // Map productId => { id: cartItemId, quantity }
  const [backendCartItems, setBackendCartItems] = useState({});

  // LocalStorage key for persisting cart items while offline/unauthenticated
  const LS_CART_KEY = "REVENGE_CART_ITEMS";

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Normalize items to ensure 'image' exists
          const normalized = parsed.map((p) => {
            if (p?.image) return p;
            if (Array.isArray(p?.images) && p.images.length > 0) {
              return { ...p, image: p.images[0] };
            }
            return { ...p, image: "https://via.placeholder.com/80?text=Sin+Imagen" };
          });
          setCartItems(normalized);
          if (normalized.length > 0) {
            setIsCartOpen(true);
          }
        }
      }
    } catch (e) {
      console.warn("No se pudo leer el carrito de localStorage:", e);
    }
  }, []);

  // Persist to localStorage on every cart update
  useEffect(() => {
    try {
      localStorage.setItem(LS_CART_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.warn("No se pudo guardar el carrito en localStorage:", e);
    }
  }, [cartItems]);

    // Ensure a backend cart exists for the current user
    const ensureBackendCart = async () => {
      try {
        if (!user?.email) return null;
        // 1) obtain userId from context (should be GUID). Backend requires Guid.
        const userId = user.id;
        // Basic GUID format check to avoid 400s
        const guidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
        if (!userId || !guidRegex.test(String(userId))) {
          console.warn("Cart: userId inválido o no es GUID, se omiten llamadas al backend.");
          return null;
        }

        // 2) get existing carts for user
        const existing = await shoppingCartClient.getCartsByUser(userId);
        if (existing.success && Array.isArray(existing.data) && existing.data.length > 0) {
          setActiveCartId(existing.data[0].id);
          // hydrate backend cart items map
          try {
            const ci = await cartItemClient.getByCartId(existing.data[0].id);
            if (ci.success && Array.isArray(ci.data)) {
              const map = {};
              for (const item of ci.data) {
                map[item.productId] = { id: item.id, quantity: item.quantity };
              }
              setBackendCartItems(map);
            }
          } catch (e) {
            console.warn("No se pudo hidratar los items del carrito:", e);
          }
          return existing.data[0].id;
        }

        // 3) create new cart
        const created = await shoppingCartClient.createCart({ userId });
        // Backend retorna { CartId: ... } (C# PascalCase). Normalizamos ambas variantes.
        const newId = created.success ? (created.data?.cartId || created.data?.CartId) : null;
        if (newId) {
          setActiveCartId(newId);
          return newId;
        }
        return null;
      } catch (e) {
        console.warn("ensureBackendCart error:", e);
        return null;
      }
    };

    // Sync local cart items to backend when we have a backend cart and a logged user
    const syncLocalToBackend = async (cartIdToUse) => {
      try {
        if (!user?.email || !cartIdToUse) return;

        // Refresh backend items map to know current state
        try {
          const ci = await cartItemClient.getByCartId(cartIdToUse);
          if (ci.success && Array.isArray(ci.data)) {
            const map = {};
            for (const item of ci.data) {
              map[item.productId] = { id: item.id, quantity: item.quantity };
            }
            setBackendCartItems(map);
          }
        } catch (e) {
          console.warn("syncLocalToBackend: no se pudo obtener items actuales:", e);
        }

        // For each local item, create or update backend entry to match local quantity
        for (const it of cartItems) {
          const productId = it.id;
          const qty = it.quantity || 1;
          const meta = backendCartItems[productId];
          try {
            if (meta?.id) {
              await cartItemClient.updateCartItem(meta.id, {
                id: meta.id,
                cartId: cartIdToUse,
                productId,
                quantity: qty,
              });
            } else {
              const created = await cartItemClient.createCartItem({
                cartId: cartIdToUse,
                productId,
                quantity: qty,
              });
              if (created.success && created.data?.id) {
                setBackendCartItems((m) => ({ ...m, [productId]: { id: created.data.id, quantity: qty } }));
              }
            }
          } catch (e) {
            console.warn(`syncLocalToBackend: fallo al sincronizar producto ${productId}:`, e);
          }
        }
      } catch (e) {
        console.warn("syncLocalToBackend error:", e);
      }
    };

    // When user logs in, ensure a backend cart exists and sync local items
    useEffect(() => {
      if (!user?.email) return; // only when authenticated
      (async () => {
        const id = await ensureBackendCart();
        if (id) await syncLocalToBackend(id);
      })();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user?.email]);

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

  const addToCart = async (product, quantityToAdd = 1) => {
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

    // Persist to backend if logged in
    try {
      if (!user?.email) return;
      const cartId = activeCartId || (await ensureBackendCart());
      if (!cartId) return;
      // Create or update cart-item
      const body = {
        cartId,
        productId: normalizedProduct.id,
        quantity: quantityToAdd,
      };
      await cartItemClient.createCartItem(body);
    } catch (e) {
      console.warn("addToCart backend error:", e);
    }
  };

    // Incrementar cantidad (para los botones +/- DENTRO del carrito)
    const increaseQuantity = async (productId) => {
      setCartItems((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity: p.quantity + 1 } : p)));
      try {
        if (!activeCartId) return;
        const itemMeta = backendCartItems[productId];
        if (itemMeta?.id) {
          await cartItemClient.updateCartItem(itemMeta.id, {
            id: itemMeta.id,
            cartId: activeCartId,
            productId,
            quantity: (itemMeta.quantity || 0) + 1,
          });
          setBackendCartItems((m) => ({ ...m, [productId]: { id: itemMeta.id, quantity: (itemMeta.quantity || 0) + 1 } }));
        } else {
          // create if missing
          const created = await cartItemClient.createCartItem({ cartId: activeCartId, productId, quantity: 1 });
          if (created.success && created.data?.id) {
            setBackendCartItems((m) => ({ ...m, [productId]: { id: created.data.id, quantity: 1 } }));
          }
        }
      } catch (e) {
        console.warn("increaseQuantity backend error:", e);
      }
    };

    // Disminuir cantidad
    const decreaseQuantity = async (productId) => {
      setCartItems((prev) => prev.map((p) => (p.id === productId ? { ...p, quantity: p.quantity - 1 } : p)).filter((p) => p.quantity > 0));
      try {
        if (!activeCartId) return;
        const itemMeta = backendCartItems[productId];
        if (itemMeta?.id) {
          const nextQty = (itemMeta.quantity || 0) - 1;
          if (nextQty <= 0) {
            await cartItemClient.deleteCartItem(itemMeta.id);
            setBackendCartItems((m) => {
              const copy = { ...m };
              delete copy[productId];
              return copy;
            });
          } else {
            await cartItemClient.updateCartItem(itemMeta.id, {
              id: itemMeta.id,
              cartId: activeCartId,
              productId,
              quantity: nextQty,
            });
            setBackendCartItems((m) => ({ ...m, [productId]: { id: itemMeta.id, quantity: nextQty } }));
          }
        }
      } catch (e) {
        console.warn("decreaseQuantity backend error:", e);
      }
    };

    // Vaciar carrito
    const clearCart = async () => {
      setCartItems([]);
      try {
        // Best-effort: delete each backend item
        for (const meta of Object.values(backendCartItems)) {
          if (meta?.id) await cartItemClient.deleteCartItem(meta.id);
        }
        setBackendCartItems({});
      } catch (e) {
        console.warn("clearCart backend error:", e);
      }
    };

    // Eliminar un producto por su ID
    const removeItem = async (productId) => {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      try {
        const meta = backendCartItems[productId];
        if (meta?.id) await cartItemClient.deleteCartItem(meta.id);
        setBackendCartItems((m) => {
          const copy = { ...m };
          delete copy[productId];
          return copy;
        });
      } catch (e) {
        console.warn("removeItem backend error:", e);
      }
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
        activeCartId,
      }}
      >
        {children}
      </CartContext.Provider>
    );
  }