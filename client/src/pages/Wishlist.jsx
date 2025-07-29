import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useWishlist } from "../context/WishlistContext";
import api from "../api/api";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      try {
        if (wishlist.length === 0) {
          setProducts([]);
          return;
        }
        const { data } = await api.get("/products");
        const filtered = data.filter((p) => wishlist.includes(p._id));
        setProducts(filtered);
      } catch (err) {
        // console.error("Failed to fetch wishlist:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWishlistProducts();
  }, [wishlist]);

  if (loading)
    return <div className="text-center py-16 text-gray-500">Loading wishlist...</div>;

  if (products.length === 0)
    return (
       <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
              <h2 className="text-2xl font-semibold text-[#415D8A] mb-4">
               Your Wishlist is Empty ❤️
              </h2>
              <Link
                to="/products"
                className="bg-[#415D8A] text-white px-5 py-2 rounded hover:bg-[#2e4468] transition"
              >
                check Products
              </Link>
            </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-[#415D8A]">
        My Wishlist ❤️
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded shadow p-4 flex flex-col"
          >
 <img
            src={
              product.images?.[0]
                ? `${import.meta.env.VITE_API_BASE_URL}${product.images[0]}`
                : "https://dummyimage.com/400x300/cccccc/000000&text=No+Image"
            }
            alt={product.name}
            className="rounded mb-4 h-52 object-cover" 
          />  
            <h2 className="font-bold text-lg text-[#415D8A] mb-1">{product.name}</h2>
            <p className="text-gray-600 text-sm mb-2">
              {product.description?.slice(0, 60)}...
            </p>
            <p className="text-green-700 font-semibold text-lg mb-4">
              ${product.price}
            </p>
            <div className="flex justify-between items-center mt-auto">
      <Link to={`/products/${product._id}`} className="text-[#415D8A] font-semibold hover:underline">
  View
</Link>


              <button
                onClick={() => toggleWishlist(product._id)}
                className="text-red-600 hover:text-red-800 flex items-center gap-1"
              >
                <FaHeart /> Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
