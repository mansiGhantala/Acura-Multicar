import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { cat } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products");
        const filtered = data.filter(
          (product) => product.category === decodeURIComponent(cat)
        );
        setProducts(filtered);
      } catch (error) {
        // console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [cat]);

  return (
    <div className="py-16 px-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-[#415D8A] mb-10 text-center">
        {decodeURIComponent(cat)} Products
      </h1>

      {loading ? (
        <p className="text-center text-[#415D8A]">Loading...</p>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No products found in this category.
        </p>
      )}
    </div>
  );
};

export default CategoryPage;
