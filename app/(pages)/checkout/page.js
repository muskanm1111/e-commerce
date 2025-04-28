"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../contexts/CartContext";
import Link from "next/link";
import { FaArrowLeft, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

export default function CheckoutPage() {
  const { cart, total, clearCart } = useCart();
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
    paymentMethod: "credit-card",
    cardName: "",
    cardNumber: "",
    expMonth: "",
    expYear: "",
    cvv: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);

  if (cart.length === 0 && !orderCompleted) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Your Cart is Empty
          </h1>
          <p className="text-lg text-gray-600 mb-10">
            You need to add products to your cart before checking out.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            <FaArrowLeft className="mr-2" /> Browse Products
          </Link>
        </div>
      </div>
    );
  }

  if (orderCompleted) {
    return (
      <div className="container mx-auto py-16 px-4">
        <div className="max-w-4xl mx-auto text-center py-16">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span className="text-white text-4xl">✓</span>
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            Order Completed!
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Thank you for your purchase. A confirmation email has been sent to{" "}
            {formData.email}.
          </p>
          <p className="text-md text-gray-500 mb-10">
            Order reference: #{Math.floor(100000 + Math.random() * 900000)}
          </p>
          <Link
            href="/"
            className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Basic validation
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.city) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "State is required";
    if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";

    if (formData.paymentMethod === "credit-card") {
      if (!formData.cardName) newErrors.cardName = "Name on card is required";
      if (!formData.cardNumber)
        newErrors.cardNumber = "Card number is required";
      if (!formData.expMonth)
        newErrors.expMonth = "Expiration month is required";
      if (!formData.expYear) newErrors.expYear = "Expiration year is required";
      if (!formData.cvv) newErrors.cvv = "CVV is required";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // Simulate order processing
    setTimeout(() => {
      clearCart();
      setOrderCompleted(true);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold">Checkout</h1>
          <Link
            href="/cart"
            className="inline-flex items-center text-primary hover:underline"
          >
            <FaArrowLeft className="mr-2" /> Back to Cart
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">
                    Personal Information
                  </h2>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="firstName"
                      >
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="lastName"
                      >
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.email ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="phone"
                      >
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Shipping Address</h2>

                  <div className="space-y-4">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="address"
                      >
                        Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                          errors.address ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.address}
                        </p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="city"
                        >
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.city ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="state"
                        >
                          State <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.state ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.state && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.state}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="zipCode"
                        >
                          ZIP Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            errors.zipCode
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        />
                        {errors.zipCode && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.zipCode}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          className="block text-gray-700 mb-2"
                          htmlFor="country"
                        >
                          Country <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                          <option value="USA">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="UK">United Kingdom</option>
                          <option value="Australia">Australia</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>

                  <div className="space-y-4">
                    <div className="flex items-center mb-4">
                      <input
                        type="radio"
                        id="credit-card"
                        name="paymentMethod"
                        value="credit-card"
                        checked={formData.paymentMethod === "credit-card"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="credit-card">Credit Card</label>
                    </div>

                    {formData.paymentMethod === "credit-card" && (
                      <div className="space-y-4 pl-6">
                        <div>
                          <label
                            className="block text-gray-700 mb-2"
                            htmlFor="cardName"
                          >
                            Name on Card <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors.cardName
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.cardName && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardName}
                            </p>
                          )}
                        </div>

                        <div>
                          <label
                            className="block text-gray-700 mb-2"
                            htmlFor="cardNumber"
                          >
                            Card Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="XXXX XXXX XXXX XXXX"
                            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                              errors.cardNumber
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="expMonth"
                            >
                              Month <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="expMonth"
                              name="expMonth"
                              value={formData.expMonth}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.expMonth
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option value="">MM</option>
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1}
                                </option>
                              ))}
                            </select>
                            {errors.expMonth && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.expMonth}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="expYear"
                            >
                              Year <span className="text-red-500">*</span>
                            </label>
                            <select
                              id="expYear"
                              name="expYear"
                              value={formData.expYear}
                              onChange={handleChange}
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.expYear
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            >
                              <option value="">YYYY</option>
                              {Array.from({ length: 10 }, (_, i) => (
                                <option
                                  key={i}
                                  value={new Date().getFullYear() + i}
                                >
                                  {new Date().getFullYear() + i}
                                </option>
                              ))}
                            </select>
                            {errors.expYear && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.expYear}
                              </p>
                            )}
                          </div>

                          <div>
                            <label
                              className="block text-gray-700 mb-2"
                              htmlFor="cvv"
                            >
                              CVV <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={formData.cvv}
                              onChange={handleChange}
                              maxLength={4}
                              placeholder="XXX"
                              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                                errors.cvv
                                  ? "border-red-500"
                                  : "border-gray-300"
                              }`}
                            />
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="paypal"
                        name="paymentMethod"
                        value="paypal"
                        checked={formData.paymentMethod === "paypal"}
                        onChange={handleChange}
                        className="mr-2"
                      />
                      <label htmlFor="paypal">PayPal</label>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
              >
                {loading ? (
                  <span className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <FaLock className="mr-2" /> Complete Order
                  </span>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="max-h-60 overflow-y-auto mb-6">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b"
                    >
                      <div className="flex items-center">
                        <div className="text-gray-800 font-medium">
                          {item.name}
                          <span className="text-gray-500 block text-sm">
                            Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <div className="font-medium text-right">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">
                      ${(total * 0.1).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${(total + total * 0.1).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-500">
                  <p className="flex items-center">
                    <FaLock className="mr-2 text-green-500" />
                    Secure Checkout
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
