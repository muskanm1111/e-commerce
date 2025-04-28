"use client";

import { useCart } from "../../contexts/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaTrash, FaMinus, FaPlus, FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CartPage() {
  const { cart, total, updateQuantity, removeFromCart, clearCart } = useCart();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            Looks like you haven&apos;t added any products to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-10">Your Cart</h1>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <div className="hidden md:grid grid-cols-12 font-medium text-gray-500 mb-6 pb-2 border-b">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>

                {/* Cart Items */}
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center py-6 border-b"
                  >
                    {/* Product Info */}
                    <div className="col-span-6 flex items-center space-x-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
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
                      <div>
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.variant || "Default"}
                        </p>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="md:col-span-2 flex md:block items-center justify-between">
                      <span className="md:hidden">Price:</span>
                      <span className="font-medium">
                        ${item.price.toFixed(2)}
                      </span>
                    </div>

                    {/* Quantity */}
                    <div className="md:col-span-2 flex md:justify-center items-center">
                      <span className="md:hidden mr-2">Quantity:</span>
                      <div className="flex items-center border rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:text-primary transition-colors"
                        >
                          <FaMinus size={12} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1 text-gray-600 hover:text-primary transition-colors"
                        >
                          <FaPlus size={12} />
                        </button>
                      </div>
                    </div>

                    {/* Total */}
                    <div className="md:col-span-2 flex justify-between md:justify-center items-center">
                      <span className="md:hidden">Total:</span>
                      <div className="flex items-center">
                        <span className="font-medium mr-3">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <Link
                href="/products"
                className="inline-flex items-center text-primary hover:underline"
              >
                <FaArrowLeft className="mr-2" /> Continue Shopping
              </Link>
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
