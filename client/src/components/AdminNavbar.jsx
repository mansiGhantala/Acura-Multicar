import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

const AdminNavbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  if (!user || user.role !== "admin") return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-[#415D8A] text-white px-4 py-3 shadow-md font-sans">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link
          to="/admin"
          className="text-xl md:text-2xl font-bold text-white hover:text-[#ABBCDA] transition-colors"
        >
          Admin Panel
        </Link>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isOpen ? <AiOutlineClose /> : <GiHamburgerMenu />}
          </button>
        </div>

        <div className="hidden md:flex gap-4 items-center text-sm font-medium">
          <AdminLinks logout={logout} />
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 bg-[#415D8A] rounded-md p-4 text-sm font-medium">
          <AdminLinks logout={logout} toggleMenu={toggleMenu} />
        </div>
      )}
    </nav>
  );
};

const AdminLinks = ({ logout, toggleMenu }) => {
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive
        ? "bg-[#ABBCDA] text-[#415D8A] font-semibold"
        : "hover:bg-[#ABBCDA] hover:text-[#415D8A]"
    }`;

  return (
    <>
      <NavLink to="/admin/products" className={navLinkStyle} onClick={toggleMenu}>
        Products
      </NavLink>
       <NavLink to="/admin/orders" className={navLinkStyle} onClick={toggleMenu}>
        Orders
      </NavLink>
      <NavLink to="/admin/contacts" className={navLinkStyle} onClick={toggleMenu}>
        Contacts
      </NavLink>
      <NavLink to="/admin/users" className={navLinkStyle} onClick={toggleMenu}>
        Users
      </NavLink>
      <Link
        to="/"
        className="px-4 py-2 rounded-md text-white hover:text-[#ABBCDA] transition-colors duration-200"
        onClick={toggleMenu}
      >
        View Site
      </Link>
      <button
        onClick={() => {
          logout();
          toggleMenu?.();
        }}
        className="px-4 py-2 rounded-md bg-[#ABBCDA] text-[#415D8A] hover:bg-red-300 transition-colors duration-200"
      >
        Logout
      </button>
    </>
  );
};

export default AdminNavbar;
