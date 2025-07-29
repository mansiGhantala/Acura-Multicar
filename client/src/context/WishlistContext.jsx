import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import api from "../api/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]); 
  const [wishlistItems, setWishlistItems] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchWishlist = async () => {
    setLoading(true);
    if (user) {
      try {
        const { data } = await api.get("/wishlist");
        const ids = (data?.wishlist || []).map((item) => item._id);
        setWishlist(ids);
        setWishlistItems(data?.wishlist || []);
        setWishlistCount(data?.count || ids.length);
      } catch (err) {
        // console.error("❌ Failed to fetch wishlist:", err);
      }
    } else {
      const stored = localStorage.getItem("wishlist");
      const localIds = stored ? JSON.parse(stored) : [];
      setWishlist(localIds);
      setWishlistCount(localIds.length);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  useEffect(() => {
    if (!user) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlistCount(wishlist.length);
    }
  }, [wishlist, user]);

  const toggleWishlist = async (productId) => {
    if (!productId) return;

    if (user) {
      try {
        const exists = wishlist.includes(productId);

        if (exists) {
          const { data } = await api.delete("/wishlist", { data: { productId } });
          const ids = data?.wishlist?.map((item) => item._id) || [];
          setWishlist(ids);
          setWishlistItems(data?.wishlist || []);
          setWishlistCount(data?.count || ids.length);
        } else {
          const { data } = await api.post("/wishlist", { productId });
          const ids = data?.wishlist?.map((item) => item._id) || [];
          setWishlist(ids);
          setWishlistItems(data?.wishlist || []);
          setWishlistCount(data?.count || ids.length);
        }
      } catch (err) {
        // console.error(" Wishlist toggle failed:", err);
      }
    } else {
      const exists = wishlist.includes(productId);
      const updated = exists
        ? wishlist.filter((id) => id !== productId)
        : [...wishlist, productId];
      setWishlist(updated);
      setWishlistCount(updated.length);
    }
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        wishlistItems,
        wishlistCount,
        loading,
        toggleWishlist,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
