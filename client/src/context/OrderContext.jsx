import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const { user } = useAuth();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      const { data } = await api.get("/orders/mine"); 
      setOrders(data);
    } catch (err) {
      // console.error("Failed to fetch orders:", err);
      setError(err.response?.data?.message || "Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };
  const placeOrder = async (orderData, refetch = false) => {
    try {
      const { data } = await api.post("/orders", orderData);
      if (refetch) {
        await fetchOrders();
      } else {
        setOrders((prev) => [data, ...prev]);
      }
      return { success: true, data };
    } catch (err) {
      // console.error("Order placement failed:", err);
      return {
        success: false,
        error: err.response?.data?.message || "Order failed",
      };
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      const { data } = await api.patch(`/orders/${orderId}`, {
        status: "cancelled",
      });

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "cancelled" } : order
        )
      );

      return { success: true, data };
    } catch (err) {
      // console.error("Cancel order failed:", err);
      return {
        success: false,
        error: err.response?.data?.message || "Cancel failed",
      };
    }
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        fetchOrders,
        placeOrder,
        cancelOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
