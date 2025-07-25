import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import ProductTable from "../../components/admin/ProductTable";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/products");
      setProducts(data);
    } catch (error) {
      console.error("Failed to fetch products", error);
      setMessage({ type: "error", text: "Failed to load products." });
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/admin/products/${id}`);
      setMessage({ type: "success", text: "Product deleted successfully." });
      setConfirmDeleteId(null);
      fetchProducts();
    } catch (error) {
      console.error("Delete failed", error);
      setMessage({ type: "error", text: "Failed to delete product." });
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#415D8A]">Products Management</h1>
        <Link
          to="/admin/product"
          className="bg-[#415D8A] text-white font-semibold px-5 py-3 rounded-lg hover:bg-[#33466c] transition"
        >
          + Add Product
        </Link>
      </div>

<div className="min-h-[3rem]">
  {message.text && (
    <div
      className={`p-4 mb-4 rounded text-sm font-medium ${
        message.type === "success"
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {message.text}
    </div>
  )}
</div>


      {loading ? (
        <p className="text-center text-lg">Loading products...</p>
      ) : products.length === 0 ? (
        <p className="text-center text-gray-500">No products found.</p>
      ) : (
        <ProductTable
          products={products}
          onDelete={deleteProduct}
          confirmDeleteId={confirmDeleteId}
          setConfirmDeleteId={setConfirmDeleteId}
        />
      )}
    </div>
  );
};

export default AdminProducts;
