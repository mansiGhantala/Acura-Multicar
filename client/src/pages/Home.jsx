import React, { useEffect, useState } from "react";
import Hero from "../components/Hero";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import api from "../api/api";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/products");
        setProducts(data);
      } catch (error) {
        // console.error("Failed to load products:", error);
      }
    })();
  }, []);

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div>
      <Hero />
      <section className="py-16 px-4 bg-[#f8f9fb]">
        <h2 className="text-2xl font-bold text-center text-[#415D8A] mb-10">
          Explore Categories
        </h2>
        <CategoryGrid categories={categories} products={products} />
      </section>

      <ProductGrid title="New Arrivals" products={products.slice(0, 8)} />
    </div>
  );
};

export default Home;
