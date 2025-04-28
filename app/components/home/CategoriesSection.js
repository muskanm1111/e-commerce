"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaDumbbell,
  FaBolt,
  FaWeightHanging,
  FaRunning,
  FaBrain,
  FaHeart,
} from "react-icons/fa";

const CategoriesSection = () => {
   const categories = [
     {
       id: 1,
       name: "Protein",
       description: "Build muscle & recover faster",
       icon: <FaDumbbell className="text-4xl mb-4 text-primary" />,
       image: "/c1.jpg",
       link: "/products?category=protein",
     },
     {
       id: 2,
       name: "Pre-Workout",
       description: "Boost energy & performance",
       icon: <FaBolt className="text-4xl mb-4 text-primary" />,
       image: "/c2.webp",
       link: "/products?category=pre-workout",
     },
     {
       id: 3,
       name: "Mass Gainer",
       description: "Pack on size & strength",
       icon: <FaWeightHanging className="text-4xl mb-4 text-primary" />,
       image: "/c3.jpg",
       link: "/products?category=mass-gainer",
     },
     {
       id: 4,
       name: "Performance",
       description: "Enhance athletic ability",
       icon: <FaRunning className="text-4xl mb-4 text-primary" />,
       image:
         "https://images.unsplash.com/photo-1599058917212-d750089bc07e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
       link: "/products?category=performance",
     },
     {
       id: 5,
       name: "Nootropics",
       description: "Improve focus & clarity",
       icon: <FaBrain className="text-4xl mb-4 text-primary" />,
       image:
         "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
       link: "/products?category=nootropics",
     },
     {
       id: 6,
       name: "Wellness",
       description: "Support overall health",
       icon: <FaHeart className="text-4xl mb-4 text-primary" />,
       image:
         "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
       link: "/products?category=wellness",
     },
   ];
 

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    show: { 
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
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Elevate Your Performance
          </h2>

          <p className="text-gray-300 text-lg">
            Discover premium supplements tailored to your fitness journey
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={item}
              whileHover={{ y: -10 }}
            >
              <Link href={category.link} className="block group">
                <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-800">
                  <div className="relative overflow-hidden h-72">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{ objectFit: "cover" }}
                      className="transition-all duration-700 group-hover:scale-110  group-hover:opacity-70"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent">
                      <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="mb-4 transform transition-transform"
                      >
                        {category.icon}
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-2 tracking-wider">
                        {category.name}
                      </h3>
                      <p className="text-gray-300 text-sm text-center max-w-xs">
                        {category.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-800">
                    <motion.div
                      className="flex items-center justify-center space-x-2 text-primary group-hover:text-[var(--primary)] transition-colors duration-300"
                      whileHover={{ x: 5 }}
                    >
                      <span className="font-semibold">Explore Collection</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoriesSection;