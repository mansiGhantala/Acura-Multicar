import React from "react";
import { useNavigate } from "react-router-dom";

const CategoryGrid = ({ categories, products }) => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
      {categories.map((cat) => {
        const prod = products.find((p) => p.category === cat);
const image = prod?.images?.[0]
  ? `${import.meta.env.VITE_API_BASE_URL}/uploads/${prod.images[0]}`
  : "https://via.placeholder.com/400";

        return (
          <div
            key={cat}
            onClick={() => navigate(`/category/${cat}`)}
            className="cursor-pointer group overflow-hidden rounded-xl relative shadow hover:shadow-lg transition"
          >
           <img
  src={image}
  alt={cat}
  className="w-full h-[200px] object-cover group-hover:scale-105 transition duration-300"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/400";
  }}
/>

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-semibold text-lg uppercase tracking-wider">
                {cat}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CategoryGrid;
