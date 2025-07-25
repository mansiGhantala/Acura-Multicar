import { FaWhatsapp } from "react-icons/fa";

const WhatsAppOrderButton = ({ product }) => {
  const whatsappNumber = "+919687553179"; 
  const message = `Hi, I want to order:\n\n*${product.name}*\nPrice: $${product.price}\n\nPlease guide me.`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace("+", "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-3 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white py-2 px-4 rounded-md font-semibold transition-all duration-300 w-full sm:w-auto text-sm sm:text-base"
    >
      <FaWhatsapp className="text-lg sm:text-xl" />
      Any Query 
    </a>
  );
};

export default WhatsAppOrderButton;
