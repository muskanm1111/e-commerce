"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";

const FeaturedProducts = () => {
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [hoveredId, setHoveredId] = useState(null);

   const products = [
     {
       id: 1,
       name: "Ultimate Whey Protein",
       category: "Protein",
       price: 59.99,
       rating: 4.9,
       image: "/c1.jpg",
       isBestSeller: true,
     },
     {
       id: 2,
       name: "Power Pre-Workout",
       category: "Pre-Workout",
       price: 44.99,
       rating: 4.8,
       image: "/c2.webp",
       isNew: true,
     },
     {
       id: 3,
       name: "Max Mass Gainer",
       category: "Weight Gainer",
       price: 62.99,
       rating: 4.7,
       image: "/c3.jpg",
       isBestSeller: false,
     },
     {
       id: 4,
       name: "BCAA Recovery Formula",
       category: "Recovery",
       price: 36.99,
       rating: 4.6,
       image: "/c4.webp",
       isNew: false,
     },
     {
       id: 5,
       name: "Keto-Friendly Protein",
       category: "Protein",
       price: 54.99,
       rating: 4.5,
       image: "/c1.jpg",
       isSale: true,
     },
     {
       id: 6,
       name: "Creatine Monohydrate",
       category: "Performance",
       price: 29.99,
       rating: 4.9,
       image: "/c2.webp",

       isBestSeller: true,
     },
   ];

  const scroll = (direction) => {
    if (sliderRef.current) {
      const { scrollLeft, clientWidth } = sliderRef.current;
      const scrollTo =
        direction === "left"
          ? scrollLeft - clientWidth * 0.8
          : scrollLeft + clientWidth * 0.8;

      sliderRef.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16"
        >
          <div className="mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Featured Products
            </h2>
            <p className="text-gray-600 text-lg max-w-xl">
              Discover our premium selection of supplements designed to elevate
              your performance
            </p>
          </div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("left")}
              className="bg-gray-100 hover:bg-primary hover:text-white p-4 rounded-full transition-all duration-300 shadow-lg"
            >
              <FaArrowLeft className="text-xl" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1, backgroundColor: "#4F46E5" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scroll("right")}
              className="bg-gray-100 hover:bg-primary hover:text-white p-4 rounded-full transition-all duration-300 shadow-lg"
            >
              <FaArrowRight className="text-xl" />
            </motion.button>
          </div>
        </motion.div>

        <div
          ref={sliderRef}
          className="flex overflow-x-auto space-x-6 pb-8 no-scrollbar"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onHoverStart={() => setHoveredId(product.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="flex-none w-[300px] md:w-[350px]"
            >
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col group">
                {/* Product Image */}
                <div className="relative h-[300px] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 300px, 350px"
                    style={{ objectFit: "cover" }}
                    className="transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isBestSeller && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-primary text-white text-sm px-4 py-1.5 rounded-full font-medium shadow-lg"
                      >
                        Best Seller
                      </motion.span>
                    )}
                    {product.isNew && (
                      <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-blue-500 text-white text-sm px-4 py-1.5 rounded-full font-medium shadow-lg"
                      >
                        New Arrival
                      </motion.span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute right-4 top-4 flex flex-col gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/90 hover:bg-primary hover:text-white rounded-full shadow-lg transition-colors duration-300"
                    >
                      <FaHeart className="text-lg" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/90 hover:bg-primary hover:text-white rounded-full shadow-lg transition-colors duration-300"
                    >
                      <FaShoppingCart className="text-lg" />
                    </motion.button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-sm text-primary font-medium mb-2">
                    {product.category}
                  </span>
                  <Link href={`/product/${product.id}`} className="group/title">
                    <h3 className="text-xl font-bold mb-3 group-hover/title:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center mb-4">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400"
                              : "text-gray-300"
                          } text-lg`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-gray-600">
                      ({product.rating})
                    </span>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.isSale && (
                        <span className="text-lg text-gray-500 line-through">
                          ${(product.price * 1.2).toFixed(2)}
                        </span>
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 px-6 bg-gray-100 hover:bg-[#c40000]  hover:text-white rounded-xl font-semibold transition-all duration-300"
                    >
                      View Details
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#c40000] text-white py-4 px-8 rounded-xl font-semibold hover:bg-primary/90 transition-colors duration-300 shadow-lg"
            >
              Explore All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;