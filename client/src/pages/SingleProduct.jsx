import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaHeart, FaMinus, FaPlus } from "react-icons/fa";
import api from "../api/api";
import WhatsAppOrderButton from "../components/WhatsAppOrderButton";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const [activeImg, setActiveImg] = useState("");
  const [qty, setQty] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setActiveImg(
          data.images?.[0]
            ? `${import.meta.env.VITE_API_BASE_URL}${data.images[0]}`
            : "https://via.placeholder.com/600"
        );
      } catch (err) {
        console.error("Failed to load product", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const isWishlisted = wishlist.includes(id);
  const inc = () => setQty((q) => Math.min(q + 1, 10));
  const dec = () => setQty((q) => Math.max(q - 1, 1));

  const handleAddToCart = () => {
    addToCart(product._id, qty);
    navigate("/cart");
  };

  if (loading)
    return <div className="text-center py-16 text-[#415D8A]">Loading…</div>;
  if (!product)
    return (
      <div className="text-center py-16 text-red-600">Product not found.</div>
    );
        
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10">
<div className="flex gap-4">
          <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible">
            {product.images.map((img, i) => {
              const src = `${import.meta.env.VITE_API_BASE_URL}${img}`;
              return (
                <img
                  key={i}
                  src={src}
                  alt="thumb"
                  onMouseEnter={() => setActiveImg(src)}
                  onClick={() => setActiveImg(src)}
                  className={`w-20 h-24 object-cover rounded-md cursor-pointer border ${
                    activeImg === src
                      ? "border-[#415D8A]"
                      : "border-transparent"
                  } hover:border-[#415D8A]`}
                />
              );
            })}
          </div>
          <div className="w-[350px] h-[450px] md:w-[400px] md:h-[500px]">
            <img
              src={activeImg}
              alt={product.name}
              className="w-full h-full object-cover rounded-md shadow-sm transition-all duration-300"
            />
          </div>
        </div>
        <div className="flex-1 space-y-6">
          <h1 className="text-2xl md:text-3xl font-semibold text-[#2c2c2c]">
            {product.name}
          </h1>

          <p className="text-lg font-bold text-green-700">
            ₹{product.price.toLocaleString("en-IN")}.00
          </p>

          <p className="text-sm text-gray-600">
            Category: <span className="font-medium">{product.category}</span>
          </p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <button
            onClick={() => toggleWishlist(product._id)}
            className="flex items-center gap-2 text-sm font-medium text-[#415D8A] hover:underline"
          >
            <FaHeart
              className={`${
                isWishlisted ? "text-red-500" : "text-gray-400"
              } transition`}
            />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </button>

          <div className="flex flex-col gap-5 mt-6">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Quantity:
              </label>
              <div className="flex items-center border border-[#ABBCDA] rounded-md overflow-hidden w-[120px]">
                <button
                  onClick={dec}
                  className="w-8 h-8 flex items-center justify-center bg-[#D0E1F5] hover:bg-[#ABBCDA] text-[#415D8A] disabled:opacity-40 transition"
                  disabled={qty === 1}
                >
                  <FaMinus size={12} />
                </button>
                <span className="flex-1 flex items-center justify-center text-[#415D8A] font-medium text-sm">
                  {qty}
                </span>
                <button
                  onClick={inc}
                  className="w-8 h-8 flex items-center justify-center bg-[#D0E1F5] hover:bg-[#ABBCDA] text-[#415D8A] disabled:opacity-40 transition"
                  disabled={qty === 10}
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-md bg-[#415D8A] text-white font-semibold text-sm hover:bg-[#31496D] transition duration-200"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  addToCart(product._id, qty);
                  navigate("/checkout");
                }}
                className="w-full py-3 rounded-md bg-[#e74c3c] text-white font-semibold text-sm hover:bg-[#c0392b] transition duration-200"
              >
                Buy It Now
              </button>
            </div>
            <div className="w-full max-w-lg">
              <WhatsAppOrderButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
