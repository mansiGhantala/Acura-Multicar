import React, { useEffect, useState } from "react";
import api from "../../api/api";
import { useGlobalMessage } from "../../context/GlobalMessageContext";
import GlobalMessage from "../../components/GlobalMessage";

const statusOptions = ["pending", "confirmed", "ready for pickup", "completed", "cancelled"];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [recentlyDeleted, setRecentlyDeleted] = useState(null);
  const { setGlobalMessage } = useGlobalMessage();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders");
      setOrders(res.data);
    } catch (err) {
      console.error("Fetch orders error:", err);
      setGlobalMessage({ text: "Failed to load orders.", type: "error" });
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/admin/orders/${id}`, { status: newStatus });
      setOrders((prev) =>
        prev.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      setGlobalMessage({ text: "Order status updated.", type: "success" });
    } catch (err) {
      console.error("Status update error:", err);
      setGlobalMessage({ text: "Failed to update status.", type: "error" });
    }
  };

  const handleDelete = async (id) => {
    const deletedOrder = orders.find((order) => order._id === id);
    try {
      await api.delete(`/admin/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
      setRecentlyDeleted(deletedOrder);
      setGlobalMessage({ text: "Order deleted successfully.", type: "success" });
    } catch (err) {
      console.error("Delete order error:", err);
      setGlobalMessage({ text: "Failed to delete order.", type: "error" });
    }
  };

  const handleUndoDelete = async () => {
    if (!recentlyDeleted) return;
    try {
      const res = await api.post("/admin/orders", recentlyDeleted);
      setOrders((prev) => [res.data, ...prev]);
      setRecentlyDeleted(null);
      setGlobalMessage({ text: "Order restored.", type: "success" });
    } catch (err) {
      console.error("Undo delete error:", err);
      setGlobalMessage({ text: "Failed to restore order.", type: "error" });
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#415D8A]">All Orders</h1>

      <div className="mb-4 flex items-center justify-between min-h-[40px]">
        <GlobalMessage />
        {recentlyDeleted && (
          <button
            onClick={handleUndoDelete}
            className="text-sm text-blue-600 underline hover:text-blue-800"
          >
            Undo Delete
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <p className="text-gray-500 text-sm">No orders found.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200">
          <table className="min-w-full text-sm text-left bg-white">
            <thead className="bg-[#3B5A89] text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3">Order ID</th>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Total</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="odd:bg-[#F9FBFF] even:bg-white hover:bg-[#F0F8FF] transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-gray-700">
                    {order._id.slice(-6)}
                  </td>
                  <td className="px-4 py-3">{order.user?.name || "-"}</td>
                  <td className="px-4 py-3">{order.user?.email || "-"}</td>
                  <td className="px-4 py-3">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800">
                    ₹{order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => handleDelete(order._id)}
                      className="px-3 py-1 border border-red-500 text-red-500 rounded hover:bg-red-500 hover:text-white transition text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
