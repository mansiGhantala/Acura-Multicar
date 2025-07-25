import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ products: 0, contacts: 0, users: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const { data } = await api.get("/admin/counts");
        setCounts(data);
      } catch (error) {
        console.error("Failed to fetch counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-[#415D8A] mb-4">Admin Dashboard</h1>
      <p className="mb-6 text-gray-600">Welcome, Admin! You have full access to manage your site.</p>

      {loading ? (
        <p className="text-[#415D8A]">Loading dashboard counts...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/admin/products"
            className="p-6 bg-[#ABBCDA] text-[#415D8A] rounded-xl shadow hover:shadow-lg transition font-semibold text-center"
          >
            Products ({counts.products || 0})
          </Link>  <Link
            to="/admin/orders"
            className="p-6 bg-[#ABBCDA] text-[#415D8A] rounded-xl shadow hover:shadow-lg transition font-semibold text-center"
          >
            Orders ({counts.orders || 0})
          </Link>
          <Link
            to="/admin/contacts"
            className="p-6 bg-[#ABBCDA] text-[#415D8A] rounded-xl shadow hover:shadow-lg transition font-semibold text-center"
          >
            Contacts ({counts.contacts || 0})
          </Link>
          <Link
            to="/admin/users"
            className="p-6 bg-[#ABBCDA] text-[#415D8A] rounded-xl shadow hover:shadow-lg transition font-semibold text-center"
          >
            Users ({counts.users || 0})
          </Link>
        
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
