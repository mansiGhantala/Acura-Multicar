import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const isInCart = cart.items?.some((item) => item.product === product._id);
  const isWishlisted = wishlist.includes(product._id);

  const handleAddToCart = () => {
    if (!isInCart) {
      addToCart(product._id);
    }
  };

  const imageSrc = product.images?.[0]
    ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${product.images[0]}`
    : "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";

  return (
    <div className="group w-full max-w-xs mx-auto">
      <div className="relative overflow-hidden rounded-2xl shadow-md bg-white">
        <Link to={`/products/${product._id}`} aria-label="View Product">
          <img
            src={imageSrc}
            alt={product.name || "Product Image"}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://dummyimage.com/400x300/cccccc/000000&text=No+Image";
            }}
            loading="lazy"
            decoding="async"
            className="w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex items-end justify-center bg-[#ABBCDA]/0 group-hover:bg-[#ABBCDA]/80 transition duration-300">
          <div className="flex gap-4 mb-4 opacity-0 group-hover:opacity-100 transition duration-300">
            {/* Wishlist */}
            <button
              onClick={() => toggleWishlist(product._id)}
              aria-label="Toggle Wishlist"
              className={`text-white hover:text-[#415D8A] transition ${
                isWishlisted ? "text-[#415D8A]" : ""
              }`}
              title="Add to Wishlist"
            >
              <FaHeart size={20} />
            </button>

            {/* Cart */}
            <button
              onClick={handleAddToCart}
              disabled={isInCart}
              aria-label="Add to Cart"
              className={`text-white hover:text-[#415D8A] transition ${
                isInCart ? "opacity-40 cursor-not-allowed" : ""
              }`}
              title="Add to Cart"
            >
              <FaShoppingCart size={20} />
            </button>

            {/* View */}
            <Link
              to={`/products/${product._id}`}
              aria-label="View Product"
              className="text-white hover:text-[#415D8A] transition"
              title="View Product"
            >
              <FaEye size={20} />
            </Link>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="text-center mt-3">
        <h3
          className="text-base font-semibold text-[#2c2c2c] line-clamp-1"
          title={product.name}
        >
          {product.name || "Untitled Product"}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {product.category || "Uncategorized"}
        </p>
        <p className="text-sm text-[#2c2c2c] font-bold mt-1">
          ₹{product.price?.toLocaleString("en-IN") || "0"}.00
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
