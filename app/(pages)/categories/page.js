"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaFilter, FaTimes } from "react-icons/fa";

export default function CategoriesPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  // Mock categories - would typically come from a database or API
  const categories = [
    {
      id: 1,
      name: "Protein",
      description:
        "High-quality protein supplements for muscle growth and recovery.",
      image:
        "https://images.unsplash.com/photo-1626371364655-2ad19a25e76a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvdGVpbiUyMHBvd2RlcnxlbnwwfHwwfHx8MA%3D%3D",
      productCount: 12,
      featured: true,
    },
    {
      id: 2,
      name: "Pre-Workout",
      description: "Boost your energy, focus, and performance before training.",
      image:
        "https://images.unsplash.com/photo-1617922879455-792add2ef4c0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHJlJTIwd29ya291dHxlbnwwfHwwfHx8MA%3D%3D",
      productCount: 8,
      featured: true,
    },
    {
      id: 3,
      name: "Vitamins & Minerals",
      description:
        "Essential nutrients to support overall health and wellbeing.",
      image:
        "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHZpdGFtaW5zfGVufDB8fDB8fHww",
      productCount: 15,
      featured: false,
    },
    {
      id: 4,
      name: "Weight Management",
      description:
        "Products designed to support your weight loss or gain goals.",
      image:
        "https://images.unsplash.com/photo-1573049263535-972f0596a58f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHdlaWdodCUyMGxvc3N8ZW58MHx8MHx8fDA%3D",
      productCount: 10,
      featured: true,
    },
    {
      id: 5,
      name: "Amino Acids",
      description:
        "Essential building blocks for protein synthesis and muscle repair.",
      image:
        "https://images.unsplash.com/photo-1579722821273-0f6c1b01b2af?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW1pbm8lMjBhY2lkc3xlbnwwfHwwfHx8MA%3D%3D",
      productCount: 7,
      featured: false,
    },
    {
      id: 6,
      name: "Energy & Endurance",
      description:
        "Products that help improve stamina and athletic performance.",
      image:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGVuZXJneSUyMGRyaW5rfGVufDB8fDB8fHww",
      productCount: 9,
      featured: true,
    },
    {
      id: 7,
      name: "Recovery",
      description: "Support muscle recovery and reduce post-workout soreness.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bXVzY2xlJTIwcmVjb3Zlcnl8ZW58MHx8MHx8fDA%3D",
      productCount: 6,
      featured: false,
    },
    {
      id: 8,
      name: "Sports Nutrition",
      description: "Specialized nutrition for athletes and active individuals.",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzJTIwbnV0cml0aW9ufGVufDB8fDB8fHww",
      productCount: 11,
      featured: true,
    },
  ];

  const filteredCategories =
    activeFilter === "all"
      ? categories
      : activeFilter === "featured"
      ? categories.filter((cat) => cat.featured)
      : categories.filter((cat) => !cat.featured);

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Product Categories
            </h1>
            <p className="text-gray-600">
              Browse our categories to find the perfect supplements for your
              fitness journey
            </p>
          </div>

          <div className="mt-4 md:mt-0">
            <button
              className="flex items-center md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              onClick={() => setFiltersOpen(!filtersOpen)}
            >
              <FaFilter className="mr-2" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {filtersOpen && (
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold">Filters</h2>
              <button
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setFiltersOpen(false)}
              >
                <FaTimes />
              </button>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter("all")}
              >
                All Categories
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "featured"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter("featured")}
              >
                Featured
              </button>
              <button
                className={`px-4 py-2 rounded-full ${
                  activeFilter === "other"
                    ? "bg-primary text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => setActiveFilter("other")}
              >
                Other
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link
                href={`/products?category=${category.id}`}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                    {category.featured && (
                      <div className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded">
                        Featured
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2">{category.name}</h2>
                    <p className="text-gray-600 mb-4">{category.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {category.productCount} products
                      </span>
                      <span className="text-primary font-medium">
                        View Products
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">
              No categories found matching your filter criteria.
            </p>
            <button
              onClick={() => setActiveFilter("all")}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
            >
              Show All Categories
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
