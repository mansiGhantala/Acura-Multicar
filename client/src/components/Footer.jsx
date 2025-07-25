import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaGoogle,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const phoneNumber = "+919687553179";

  return (
    <footer className="bg-[#415D8A] text-white py-10 mt-10 rounded-t-2xl shadow-xl">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">About Us</h3>
          <p className="text-[#D0E1F5] leading-relaxed">
            Acura Multicar offers premium vehicles and accessories, focused on
            customer satisfaction and affordable luxury.
          </p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Contact</h3>
          <p className="text-[#D0E1F5]">Email: acuramultcar@gmai.com</p>
          <p className="text-[#D0E1F5]">Phone: {phoneNumber}</p>
          
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="#"
              className="bg-white text-[#415D8A] p-2 rounded-full hover:bg-[#ABBCDA] hover:text-white transition"
              title="Google"
            >
              <FaGoogle />
            </a>
            <a
              href="#"
              className="bg-white text-[#415D8A] p-2 rounded-full hover:bg-[#ABBCDA] hover:text-white transition"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              className="bg-white text-[#415D8A] p-2 rounded-full hover:bg-[#ABBCDA] hover:text-white transition"
              title="Facebook"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-white text-[#415D8A] p-2 rounded-full hover:bg-[#ABBCDA] hover:text-white transition"
              title="whastapp"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">We Accept</h3>
          <div className="flex gap-4 text-4xl text-[#D0E1F5]">
            <FaCcVisa />
            <FaCcMastercard />
            <FaCcPaypal />
          </div>
        </div>
      </div>

      <div className="border-t border-[#ABBCDA] mt-10 pt-4 text-center text-[#D0E1F5] text-sm">
        &copy; {currentYear} Acura Multicar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
