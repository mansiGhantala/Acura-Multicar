import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaShoppingCart,
  FaHeart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { wishlist = [] } = useWishlist() || {};
  const { cart = [] } = useCart() || {};
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const closeAllMenus = () => {
    setMenuOpen(false);
    setAccountOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
    closeAllMenus();
  };

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-medium transition-colors ${
      isActive ? "text-[#415D8A] font-semibold" : "text-gray-700"
    } hover:text-[#415D8A]`;

  return (
    <nav className="bg-white shadow sticky top-0 z-50 font-sans">
      <div className="container mx-auto flex justify-between items-center p-4">
        <NavLink
          to="/"
          className="text-2xl md:text-3xl font-bold text-[#415D8A]"
          onClick={closeAllMenus}
        >
          Acura Multicar
        </NavLink>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/products" className={navLinkClass} onClick={closeAllMenus}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={closeAllMenus}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={closeAllMenus}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/my-orders" className={navLinkClass} onClick={closeAllMenus}>
              Orders
            </NavLink>
          )}

          <div className="relative">
            <button
              onClick={() => {
                setAccountOpen((prev) => !prev);
                setMenuOpen(false);
              }}
              className="text-[#415D8A] text-2xl relative focus:outline-none"
            >
              <FaUser />
            </button>

            {accountOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg py-2 z-50">
                {user ? (
                  <>
                    {user.role === "admin" && (
                      <button
                        onClick={() => {
                          navigate("/admin");
                          closeAllMenus();
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-[#415D8A] hover:bg-gray-100 font-semibold"
                      >
                        Admin Panel
                      </button>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink
                      to="/login"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={closeAllMenus}
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            )}
          </div>

          <button
            onClick={() => {
              navigate("/wishlist");
              closeAllMenus();
            }}
            className="relative text-[#415D8A] text-2xl"
          >
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-[6px] leading-none shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              navigate("/cart");
              closeAllMenus();
            }}
            className="relative text-[#415D8A] text-2xl"
          >
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] min-w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold px-[6px] leading-none shadow-sm">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => {
              navigate("/wishlist");
              closeAllMenus();
            }}
            className="relative text-[#415D8A] text-xl"
          >
            <FaHeart />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold px-[4px] leading-none shadow-sm">
                {wishlist.length}
              </span>
            )}
          </button>

          <button
            onClick={() => {
              navigate("/cart");
              closeAllMenus();
            }}
            className="relative text-[#415D8A] text-xl"
          >
            <FaShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[10px] min-w-[16px] h-[16px] rounded-full flex items-center justify-center font-bold px-[4px] leading-none shadow-sm">
                {cart.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setAccountOpen((prev) => !prev)}
            className="text-[#415D8A] text-xl relative focus:outline-none"
          >
            <FaUser />
          </button>

          <button
            className="text-[#415D8A] text-xl"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setAccountOpen(false);
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col space-y-3 border-t border-gray-200 p-4">
          <NavLink to="/" className={navLinkClass} onClick={closeAllMenus}>
            Home
          </NavLink>
          <NavLink to="/products" className={navLinkClass} onClick={closeAllMenus}>
            Products
          </NavLink>
          <NavLink to="/about" className={navLinkClass} onClick={closeAllMenus}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass} onClick={closeAllMenus}>
            Contact
          </NavLink>
          {user && (
            <NavLink to="/my-orders" className={navLinkClass} onClick={closeAllMenus}>
              Orders
            </NavLink>
          )}
          {user?.role === "admin" && (
            <button
              onClick={() => {
                navigate("/admin");
                closeAllMenus();
              }}
              className="text-left px-4 py-2 text-sm text-[#415D8A] hover:bg-gray-100 font-semibold"
            >
              Admin Panel
            </button>
          )}
          {user ? (
            <button
              onClick={handleLogout}
              className="text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink to="/login" className={navLinkClass} onClick={closeAllMenus}>
                Login
              </NavLink>
              <NavLink to="/register" className={navLinkClass} onClick={closeAllMenus}>
                Register
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
