"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Alex Johnson",
      role: "Professional Bodybuilder",
      image:
        "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      quote:
        "I've tried dozens of supplements over my 10-year career, but Power Supplements stands head and shoulders above the rest. The quality and results are unmatched.",
      rating: 5,
      before:
        "https://images.unsplash.com/photo-1583500178450-12ea638005a1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      after:
        "https://images.unsplash.com/photo-1534368786749-b63e05c90863?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Sarah Williams",
      role: "Fitness Coach",
      image:
        "https://images.unsplash.com/photo-1611432579699-484f7990b127?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      quote:
        "I recommend Power Supplements to all my clients. The results speak for themselves, and the clean ingredients make me confident in what I'm putting in my body.",
      rating: 5,
      before:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      after:
        "https://images.unsplash.com/photo-1545346315-f4c47e3e1b55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Michael Chen",
      role: "Competitive Athlete",
      image:
        "https://images.unsplash.com/photo-1540569014555-6276c290fa8c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      quote:
        "The pre-workout formula has been a game-changer for my training. I've seen significant improvements in my strength and endurance since making the switch.",
      rating: 4.5,
      before:
        "https://images.unsplash.com/photo-1623874228601-f4193c7b1818?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
      after:
        "https://images.unsplash.com/photo-1543975200-8e313fb04872?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Success Stories
          </h2>
          
          <p className="text-gray-500">
            See the real results from real people who have transformed their
            bodies and performance with our premium supplements.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto ">
          {/* Testimonial Card */}
          <motion.div
            key={testimonials[currentTestimonial].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-xl p-6 md:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-1 gap-10">
              <div className="flex flex-col justify-between">
                <div>
                  <FaQuoteLeft className="text-primary text-4xl mb-6 opacity-20" />
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={
                          i <
                          Math.floor(testimonials[currentTestimonial].rating)
                            ? "text-amber-400"
                            : i < testimonials[currentTestimonial].rating
                            ? "text-amber-400 opacity-50"
                            : "text-gray"
                        }
                      />
                    ))}
                    <span className="ml-2 text-gray-dark">
                      {testimonials[currentTestimonial].rating.toFixed(1)}
                    </span>
                  </div>
                  <blockquote className="text-lg md:text-xl font-medium mb-6">
                    &quot;{testimonials[currentTestimonial].quote}&quot;
                  </blockquote>
                </div>

                <div className="flex items-center">
                  <div className="relative w-14 h-14 rounded-full overflow-hidden mr-4">
                    <Image
                      src={testimonials[currentTestimonial].image}
                      alt={testimonials[currentTestimonial].name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">
                      {testimonials[currentTestimonial].name}
                    </h4>
                    <p className="text-gray-dark">
                      {testimonials[currentTestimonial].role}
                    </p>
                  </div>
                </div>
              </div>

             
            </div>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-10 space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="bg-gray-light hover:bg-gray text-secondary p-3 rounded-full transition-colors"
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </motion.button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentTestimonial === index ? "bg-primary w-10" : "bg-gray"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="bg-gray-light hover:bg-gray text-secondary p-3 rounded-full transition-colors"
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
