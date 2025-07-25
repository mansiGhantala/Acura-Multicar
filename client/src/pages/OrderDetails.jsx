import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const COMPANY_ADDRESS = {
    name: "Acura Multicar",
    address: "canal road , near fountain hotel ,simada gam",
    city: "surat",
    pincode: "395006",
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get(`/orders/${id}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Failed to fetch order:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-500">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center py-10 text-red-500">
        Order not found or an error occurred.
      </div>
    );
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold text-[#415D8A] mb-6 text-center">
        Order Details
      </h2>

      <div className="border p-5 rounded-xl shadow bg-white space-y-4">
        <div className="flex justify-between text-sm text-gray-600">
          <p><strong>Order ID:</strong> {order._id}</p>
          <span
            className={`px-3 py-1 text-xs font-semibold rounded-full ${
              order.status === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "confirmed"
                ? "bg-blue-100 text-blue-800"
                : order.status === "ready for pickup"
                ? "bg-purple-100 text-purple-800"
                : order.status === "completed"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.status}
          </span>
        </div>

        <p className="text-sm text-gray-600">
          <strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}
        </p>

        <p className="text-sm text-gray-700">
          <strong>Total:</strong> ₹{order.total}
        </p>

       
        <div className="text-sm text-gray-700">
          <strong> Pickup Address:</strong> 
          {order.status === "ready for pickup" ? (
            <span>
              {COMPANY_ADDRESS.name}, {COMPANY_ADDRESS.address}, {COMPANY_ADDRESS.city},{" "}
              {COMPANY_ADDRESS.pincode}
            </span>
          ) : (
            <span>Not provided</span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Items:</h3>
          <div className="space-y-3">
            {order.items.map((item, i) => (
              <div
                key={item._id || i}
                className="flex flex-col border rounded p-3 shadow-sm"
              >
                <p className="font-medium text-gray-800">
                  {item.product?.name || "Deleted Product"}
                </p>

                {item.product?.description && (
                  <p className="text-sm text-gray-500 mt-1">
                    {item.product.description}
                  </p>
                )}

                <p className="text-sm text-gray-600 mt-1">
                  Price: ₹{item.product?.price || 0} × {item.quantity} = ₹
                  {(item.product?.price || 0) * item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 text-center">
          <Link
            to="/"
            className="inline-block text-sm text-[#415D8A] underline hover:text-blue-900"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
