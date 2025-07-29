import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await api.get("/orders/mine");
        setOrders(res.data);
      } catch (err) {
        // console.error("Failed to fetch orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(price);

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading orders...</div>;
  }

  if (!orders.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        You have no orders yet.
        <br />
        <Link to="/products" className="text-[#415D8A] underline">Shop Now</Link>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-[#415D8A] mb-6 text-center">My Orders</h2>

      <div className="space-y-4">
        {orders.map((order) => (
          <Link
            to={`/orders/${order._id}`}
            key={order._id}
            className="block border rounded-xl p-4 shadow hover:shadow-md transition"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-[#415D8A] font-semibold">
                      Order #{order._id.slice(-6)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Placed on: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="text-sm text-gray-700 mt-2">
                  {order.items.length} items · {formatPrice(order.total)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
