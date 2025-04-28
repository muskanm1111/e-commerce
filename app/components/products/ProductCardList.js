"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart, FaHeart, FaEye } from "react-icons/fa";

const ProductCardList = ({ product }) => {
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
      whileHover={{ y: -2 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row">
        {/* Product Image */}
        <div className="relative h-60 md:h-auto md:w-64 lg:w-80 bg-gray-light flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
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
        </div>

        {/* Product Info */}
        <div className="p-6 flex flex-col flex-grow">
          <div className="mb-1">
            <span className="text-xs text-gray-dark">{product.category}</span>
          </div>

          <Link href={`/product/${product.id}`} className="block group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center mb-3">
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

          <p className="text-gray-dark text-sm mb-4 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-baseline mb-4 sm:mb-0">
              {product.salePrice ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    ${product.salePrice.toFixed(2)}
                  </span>
                  <span className="ml-2 text-sm text-gray-dark line-through">
                    ${product.price.toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={addToCart}
                className="btn btn-primary flex items-center"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={quickView}
                className="btn btn-outline flex items-center"
              >
                <FaEye className="mr-2" />
                View
              </motion.button>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray">
            {product.tags &&
              product.tags.map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-light text-gray-dark px-3 py-1 rounded-full"
                >
                  {tag}
                </span>
              ))}

            {product.inStock ? (
              <span className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">
                In Stock
              </span>
            ) : (
              <span className="text-xs bg-red-100 text-red-800 px-3 py-1 rounded-full">
                Out of Stock
              </span>
            )}

            {product.freeShipping && (
              <span className="text-xs bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                Free Shipping
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardList;
