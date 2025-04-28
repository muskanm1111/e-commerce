"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useInView, useAnimation, AnimatePresence } from "framer-motion";
import {
  FaShieldAlt,
  FaFlask,
  FaLeaf,
  FaTrophy,
  FaUsers,
  FaShippingFast,
} from "react-icons/fa";

const Benefits = () => {
  const benefits = [
    {
      id: 1,
      icon: <FaShieldAlt className="text-4xl text-primary" />,
      title: "Quality Guaranteed",
      description:
        "Every product undergoes rigorous testing to ensure the highest quality standards.",
      count: 100,
      unit: "%",
    },
    {
      id: 2,
      icon: <FaFlask className="text-4xl text-primary" />,
      title: "Science-Backed Formulas",
      description:
        "Our supplements are developed by nutritional scientists for maximum effectiveness.",
      count: 25,
      unit: "+",
      suffix: "Studies",
    },
    {
      id: 3,
      icon: <FaLeaf className="text-4xl text-primary" />,
      title: "Clean Ingredients",
      description:
        "No fillers, artificial colors, or harmful additives. Just pure performance.",
      count: 0,
      unit: "",
      suffix: "Fillers",
    },
    {
      id: 4,
      icon: <FaTrophy className="text-4xl text-primary" />,
      title: "Trusted by Athletes",
      description:
        "Used and endorsed by professional athletes and fitness experts worldwide.",
      count: 200,
      unit: "+",
      suffix: "Athletes",
    },
    {
      id: 5,
      icon: <FaUsers className="text-4xl text-primary" />,
      title: "Customer Satisfaction",
      description:
        "Join thousands of satisfied customers who have transformed their fitness journey.",
      count: 50,
      unit: "K+",
      suffix: "Customers",
    },
    {
      id: 6,
      icon: <FaShippingFast className="text-4xl text-primary" />,
      title: "Fast Delivery",
      description:
        "Quick shipping to your doorstep so you can start your journey without delay.",
      count: 2,
      unit: "-",
      suffix: "Day Shipping",
    },
    
  ];

  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    },
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-grid-pattern z-0"
      />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-6 "
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Why Choose Our Supplements?
          </h2>
         
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Experience the difference with our premium quality products backed
            by science
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative group"
          >
            {/* <div className="absolute -inset-1 bg-gradient-to-r from-primary to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div> */}

            {/* rate */}
            {/* <motion.div
              className="absolute bottom-0 left-0 right-0 p-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-3 bg-[#d3142f] p-8 rounded-3xl w-full  gap-6">
                {[
                  { value: "10+", label: "Years Experience" },
                  { value: "40+", label: "Products" },
                  { value: "4.9", label: "Average Rating" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    whileHover={{ scale: 1.05 }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 * index }}
                      viewport={{ once: true }}
                      className="text-4xl font-bold text-primary mb-2"
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm font-medium text-white">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div> */}
          </motion.div>

          <motion.div
            ref={ref}
            variants={container}
            initial="hidden"
            animate={controls}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {benefits.map((benefit) => (
              <motion.div
                key={benefit.id}
                variants={item}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                }}
                className="bg-white rounded-xl p-8 shadow-lg transition-all duration-300 border border-gray-100/20 backdrop-blur-sm"
              >
                <div className="flex flex-col h-full">
                  <motion.div
                    className="mb-6"
                   
                   
                  >
                    {benefit.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold mb-3 text-gray-800">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {benefit.description}
                  </p>

                  {benefit.count > 0 && (
                    <motion.div
                      className="flex items-baseline"
                      initial={{ opacity: 0, scale: 0.5 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <span className="text-3xl font-bold text-primary mr-1">
                        {benefit.count}
                      </span>
                      <span className="text-xl font-bold text-primary">
                        {benefit.unit}
                      </span>
                      {benefit.suffix && (
                        <span className="ml-1 text-gray-500">
                          {benefit.suffix}
                        </span>
                      )}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className=" "
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="grid  grid-cols-2 sm:grid-cols-4 bg-[#d3142f] opacity-90 p-10 rounded-2xl w-full  ">
              {[
                { value: "10+", label: "Years Experience" },
                { value: "40+", label: "Products" },
                { value: "4.9", label: "Average Rating" },
                { value: "5.9", label: "Average Rating" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 * index }}
                    viewport={{ once: true }}
                    className="text-4xl font-bold text-white  mb-2"
                  >
                    {stat.value}
                  </motion.div>
                  <div className="text-sm font-medium text-slate-200">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;