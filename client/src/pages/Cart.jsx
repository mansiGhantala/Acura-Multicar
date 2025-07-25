import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import api from "../api/api";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.price * (item.quantity || 1),
    0
  );

  const handleCheckout = async () => {
    if (!cart.length) return;
    setLoading(true);
    setMessage("");

    try {
      const payload = {
        items: cart.map((item) => ({
          product: item.product._id,
          quantity: item.quantity || 1,
        })),
        total: totalAmount,
      };

      await api.post("/orders", payload);
      clearCart();
      navigate("/my-orders");
    } catch (err) {
      console.error(" Order error:", err);
      setMessage(" Failed to place order. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cart.length) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-semibold text-[#415D8A] mb-4">
          Your Cart is Empty 🛒
        </h2>
        <Link
          to="/products"
          className="bg-[#415D8A] text-white px-5 py-2 rounded hover:bg-[#2e4468] transition"
        >
          check Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#415D8A] text-center mb-6">
        Shopping Cart 🛒
      </h1>

      <div className="flex justify-end mb-4">
        <button
          onClick={clearCart}
          className="flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          <FaTrashAlt />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
        {cart.map((item) => {
  return (
    <div
      key={item.product._id}
      className="flex flex-col sm:flex-row items-center bg-white shadow-md rounded-lg p-4 border border-[#ABBCDA]"
    >

      <div className="flex-1 text-center sm:text-left sm:ml-4">
        <h2 className="text-lg font-semibold text-[#415D8A]">
          {item.product.name}
        </h2>
        <p className="text-gray-600 mt-1">
          ₹{item.product.price} × {item.quantity || 1}
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Category: {item.product.category}
        </p>
      </div>

      <button
        onClick={() => removeFromCart(item.product._id)}
        title="Remove item"
        className="text-red-600 hover:text-red-800 mt-4 sm:mt-0"
      >
        <FaTrashAlt size={18} />
      </button>
    </div>
  );
})}        </div>
        <div className="bg-white shadow-md rounded-lg p-6 border border-[#D0E1F5] h-fit">
          <h2 className="text-xl font-bold mb-4 text-[#415D8A]">
            Order Summary
          </h2>
          <div className="text-gray-700 space-y-2">
            <p>
              Total Items:{" "}
              <span className="font-medium text-[#415D8A]">{totalItems}</span>
            </p>
            <p>
              Total Price:{" "}
              <span className="font-semibold text-lg text-[#415D8A]">
                ₹{totalAmount}
              </span>
            </p>
          </div>

          {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className={`mt-6 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Placing Order..." : "Proceed to Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
