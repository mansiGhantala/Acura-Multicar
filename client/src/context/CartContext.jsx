import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get("/cart");
      setCart(data.items || []);
    } catch (err) {
      // console.error(" Failed to fetch cart:", err);
      setError("Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!productId) return;
    try {
      const { data } = await api.post("/cart", { productId, quantity });
      setCart(data.items || []);
    } catch (err) {
      // console.error(" Failed to add to cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const { data } = await api.delete(`/cart/${productId}`);
      setCart(data.items || []);
    } catch (err) {
      // console.error("Failed to remove from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      await api.delete("/cart");
      setCart([]);
    } catch (err) {
      // console.error(" Failed to clear cart:", err);
    }
  };

  useEffect(() => {
    if (user) fetchCart();
    else setCart([]);
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        error,
        addToCart,
        removeFromCart,
        clearCart,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
