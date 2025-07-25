import React from "react";
import { motion } from "framer-motion";
import heroBg from "../assets/home.jpg"
const Hero = () => {
  return (
    <div
      className="h-[80vh] bg-cover bg-center flex items-center justify-center relative"
      style={{
        backgroundImage: `url(${heroBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black/50" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center relative z-10 text-white px-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Acura MutiCar Workshop
        </h1>
        <p className="text-lg md:text-xl mb-6">
          One stop for premium auto care & parts
        </p>
        <a
          href="/products"
          className="inline-block bg-[#415D8A] hover:bg-[#31496D] text-white py-3 px-6 rounded-md text-sm uppercase tracking-wide transition"
        >
          Shop Now
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
