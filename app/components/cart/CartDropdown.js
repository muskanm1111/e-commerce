"use client";

import { useCart } from "../../contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { FaTrash, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDropdown({ isOpen, onClose }) {
  const { cart, total, removeFromCart } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
          />

          {/* Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ duration: 0.3, type: "spring", damping: 25 }}
            className="fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-xl z-50 overflow-hidden flex flex-col"
          >
            <div className="p-6 bg-primary text-white flex justify-between items-center">
              <h2 className="text-xl font-bold">Your Cart ({cart.length})</h2>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200"
              >
                ✕
              </button>
            </div>

            <div className="flex-grow overflow-y-auto py-4 px-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link
                    href="/products"
                    className="text-primary hover:underline"
                    onClick={onClose}
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="flex items-center py-4 border-b"
                    >
                      <div className="relative w-16 h-16 rounded-md overflow-hidden bg-gray-100 mr-4">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            No Image
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-medium text-gray-800">
                          {item.name}
                        </h3>
                        <div className="flex items-center justify-between mt-1">
                          <div className="text-sm text-gray-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </div>
                          <div className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-gray-400 hover:text-red-500"
                      >
                        <FaTrash />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-gray-50 border-t">
                <div className="flex justify-between font-medium mb-4">
                  <span>Subtotal:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="text-center py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex items-center justify-center py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Checkout <FaArrowRight className="ml-2" size={14} />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
