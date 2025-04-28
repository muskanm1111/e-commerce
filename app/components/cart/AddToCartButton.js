"use client";

import { useState } from "react";
import { useCart } from "../../contexts/CartContext";
import { FaShoppingCart, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AddToCartButton({
  product,
  className = "",
  size = "default",
}) {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);

    // Simulate a small delay to show loading state
    setTimeout(() => {
      addToCart(product);
      setIsAdded(true);
      setIsLoading(false);

      // Reset button after 2 seconds
      setTimeout(() => {
        setIsAdded(false);
      }, 2000);
    }, 300);
  };

  const sizeClasses = {
    small: "text-sm px-3 py-1",
    default: "px-4 py-2",
    large: "text-lg px-6 py-3",
  };

  const buttonClass = `
    ${className} 
    ${sizeClasses[size] || sizeClasses.default}
    rounded-full 
    flex 
    items-center 
    justify-center 
    transition-all 
    ${
      isAdded
        ? "bg-green-500 text-white"
        : "bg-primary hover:bg-primary-dark text-white"
    }
  `;

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleAddToCart}
      disabled={isLoading}
      className={buttonClass}
    >
      {isLoading ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : isAdded ? (
        <>
          <FaCheck className="mr-2" /> Added
        </>
      ) : (
        <>
          <FaShoppingCart className="mr-2" /> Add to Cart
        </>
      )}
    </motion.button>
  );
}
