import React, { useEffect, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("wishlist") || "[]");
    setWishlist(stored);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data || []);
      } catch (err) {
        console.error(err);
        setError(" Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleWishlistToggle = (id) => {
    const updated = wishlist.includes(id)
      ? wishlist.filter((pid) => pid !== id)
      : [...wishlist, id];

    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  const handleClearSearch = () => {
    setSearch("");
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-[#415D8A]">
          Browse Our Latest Products
        </h1>

        <div className="relative w-full sm:w-64">
          <span className="absolute left-3 top-2.5 text-[#415D8A] text-sm">
            <FaSearch />
          </span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Product ,Category..."
            className="w-full pl-9 pr-8 py-2 border border-[#ABBCDA] rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#415D8A] bg-white"
          />
          {search && (
            <button
              className="absolute right-2 top-2.5 text-gray-500 hover:text-red-500 text-sm"
              onClick={handleClearSearch}
            >
              <FaTimes />
            </button>
          )}
        </div>
      </div>

      <div className="mt-6">
        {loading ? (
          <div className="text-center text-[#415D8A] text-lg">Loading products...</div>
        ) : error ? (
          <div className="text-center text-red-600 font-medium">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-gray-500">No matching products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                wishlist={wishlist}
                onWishlistToggle={handleWishlistToggle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
