"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane } from "react-icons/fa";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setEmail("");

      // Reset submission status after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-white"></div>
        <div className="absolute top-1/2 left-1/3 w-40 h-40 rounded-full bg-white"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Join Our Community
          </h2>
          <p className="text-lg mb-8 text-white/80">
            Subscribe to our newsletter for exclusive offers, fitness tips, and
            first access to new products.
          </p>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-8 md:p-10">
            <form onSubmit={handleSubmit}>
              <div className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`w-full bg-white text-gray-900 px-6 py-4 rounded-full focus:outline-none focus:ring-2 focus:ring-white pr-36 ${
                      error ? "border-2 border-red-500" : ""
                    }`}
                    disabled={isSubmitted || isLoading}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full flex items-center justify-center hover:bg-primary-dark transition-colors"
                    disabled={isSubmitted || isLoading}
                  >
                    {isLoading ? (
                      <div className="h-5 w-5 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    ) : isSubmitted ? (
                      "Subscribed!"
                    ) : (
                      <>
                        <FaPaperPlane className="mr-2" />
                        <span>Subscribe</span>
                      </>
                    )}
                  </motion.button>
                </div>
                {error && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-300 mt-2 text-sm text-left ml-4"
                  >
                    {error}
                  </motion.p>
                )}
                <p className="text-xs text-white/60 mt-4">
                  By subscribing, you agree to our Privacy Policy and consent to
                  receive updates from our company.
                </p>
              </div>
            </form>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="font-bold text-2xl"
                >
                  Weekly
                </motion.div>
                <div className="text-sm text-white/60">Fitness Tips</div>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="font-bold text-2xl"
                >
                  10%
                </motion.div>
                <div className="text-sm text-white/60">
                  First Order Discount
                </div>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="font-bold text-2xl"
                >
                  Early
                </motion.div>
                <div className="text-sm text-white/60">
                  Access to New Products
                </div>
              </div>
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="font-bold text-2xl"
                >
                  VIP
                </motion.div>
                <div className="text-sm text-white/60">Exclusive Offers</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;
