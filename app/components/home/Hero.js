"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { FaArrowRight, FaPlay } from "react-icons/fa";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      title: "Transform Your\nFitness Journey",
      subtitle: "Premium Supplements for Elite Performance",
      image: "/hero1.png",
      accent: "from-red-100 to-red-400",
      features: ["Premium Quality", "Science Backed", "Results Driven"],
    },
    {
      title: "Unlock Your\nPotential",
      subtitle: "Advanced Formula For Maximum Gains",
      image: "/hero2.jpg",
      accent: "from-blue-300 to-blue-400",
      features: ["Pure Ingredients", "Lab Tested", "Expert Approved"],
    },
    {
      title: "Elevate Your\nWorkout Game",
      subtitle: "Revolutionary Supplements for Peak Performance",
      image: "/hero3.jpeg",
      accent: "from-purple-300 to-purple-400",
      features: ["Fast Absorption", "Natural Form", "Zero Fillers"],
    },
  ];

  // Auto slide functionality
  useEffect(() => {
    if (isPaused) return;

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slideTimer);
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <section
      className="relative h-[80vh] md:h-screen overflow-hidden bg-black"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-80 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="relative h-full">
        <AnimatePresence initial={false} custom={1}>
          <motion.div
            key={currentSlide}
            custom={1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.1 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextSlide();
              } else if (swipe > swipeConfidenceThreshold) {
                prevSlide();
              }
            }}
            className="absolute inset-0 w-full h-full "
          >
            {/* Image Section */}
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={slides[currentSlide].image}
                alt="Hero Image"
                fill
                priority
                className="object-cover w-full opacity-80 transition-opacity duration-500"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].accent} opacity-30`}
              ></div>
            </div>

            {/* Content Grid */}
            <div className="relative max-w-7xl mx-auto px-4 z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-12">
              {/* Left Content */}
              <div className="space-y-8">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-[40px] md:text-7xl font-bold text-white leading-tight whitespace-pre-line featured-heading"
                >
                  {slides[currentSlide].title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg md:text-xl text-white"
                >
                  {slides[currentSlide].subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap gap-4"
                >
                  <button className="btn btn-primary  flex items-center gap-3 group">
                    Shop Now
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button className="btn btn-outline flex items-center gap-2">
                    <FaPlay className="text-sm" />
                    Watch Video
                  </button>
                </motion.div>
              </div>

              {/* Right Content - Product Preview */}
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hidden lg:block relative h-full"
              >
                {/* Add your product preview content here */}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`transition-all duration-300 ${
                currentSlide === index
                  ? "w-12 bg-white"
                  : "w-3 bg-white/50 hover:bg-white/75"
              } h-3 rounded-full`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between items-center px-2  md:px-8 z-20">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
          >
            <FaArrowRight className="w-4 md:w-6 h-4 md:h-6 rotate-180" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="p-2 md:p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white"
          >
            <FaArrowRight className="w-4 md:w-6 h-4 md:h-6" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;