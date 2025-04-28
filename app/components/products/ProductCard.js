"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  const addToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle add to cart logic here
    console.log("Added to cart:", product.name);
  };

  const quickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle quick view logic here
    console.log("Quick view:", product.name);
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="relative h-64 bg-gray-light overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: "cover" }}
            className="transition-transform duration-500 hover:scale-110"
            priority={product.isBestSeller || product.isNew || product.isSale}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isBestSeller && (
              <span className="bg-primary text-white text-xs px-3 py-1 rounded-full font-medium">
                Best Seller
              </span>
            )}
            {product.isNew && (
              <span className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                New
              </span>
            )}
            {product.isSale && (
              <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-medium">
                Sale
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-3 right-3 bg-white bg-opacity-70 hover:bg-opacity-100 p-2 rounded-full shadow transition-all"
          >
            <FaHeart
              className={`text-lg ${
                isWishlisted ? "text-red-500" : "text-gray-400"
              }`}
            />
          </button>

          {/* Action Buttons */}
          <div
            className={`absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center space-x-2 transition-all duration-300 ${
              isHovered
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-full"
            }`}
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={addToCart}
              className="bg-primary text-white p-2 rounded-full"
              title="Add to Cart"
            >
              <FaShoppingCart />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={quickView}
              className="bg-white text-secondary p-2 rounded-full"
              title="Quick View"
            >
              <FaEye />
            </motion.button>
          </div>
        </div>
      </Link>

      {/* Product Info */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="mb-1">
          <span className="text-xs text-gray-dark">{product.category}</span>
        </div>

        <Link href={`/product/${product.id}`} className="block group">
          <h3 className="text-lg font-bold mb-1 group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center mb-2">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i < Math.floor(product.rating)
                    ? "text-amber-400"
                    : i < product.rating
                    ? "text-amber-400 opacity-50"
                    : "text-gray"
                }
                size={14}
              />
            ))}
          </div>
          <span className="ml-2 text-xs text-gray-dark">
            ({product.reviewCount})
          </span>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline">
            {product.salePrice ? (
              <>
                <span className="text-xl font-bold text-primary">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="ml-2 text-sm text-gray-dark line-through">
                  ${product.price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <Link
            href={`/product/${product.id}`}
            className="text-primary text-sm font-semibold hover:underline hover:text-primary-dark transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
