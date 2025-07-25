import React from "react";
import ProductCard from "./ProductCard";

const ProductGrid = ({ title, products = [] }) => {
  return (
    <section className="py-16 px-4 bg-white">
      <h2 className="text-2xl font-bold text-center text-[#415D8A] mb-10">
        {title}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
