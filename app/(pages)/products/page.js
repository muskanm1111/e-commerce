"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductList from "../../components/products/ProductList";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API fetch with a short delay
    setTimeout(() => {
      setProducts(sampleProducts);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div>
      {/* Products Banner */}
      <div className="bg-gray-light py-16 mb-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop Products
            </h1>
            <p className="text-gray-dark max-w-2xl mx-auto">
              Explore our premium selection of fitness supplements designed to
              help you achieve your goals. Quality ingredients, proven results.
            </p>
          </motion.div>
        </div>
      </div>

      {loading ? (
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-primary"></div>
        </div>
      ) : (
        <ProductList initialProducts={products} />
      )}
    </div>
  );
}

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: "Ultimate Whey Protein - Chocolate",
    description:
      "Premium whey protein with 25g of protein per serving. Supports muscle growth and recovery with delicious chocolate flavor.",
    price: 59.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Protein",
    categoryId: "protein",
    brandId: "optimum-nutrition",
    rating: 4.9,
    reviewCount: 128,
    isBestSeller: true,
    isNew: false,
    isSale: false,
    inStock: true,
    freeShipping: true,
    tags: ["Whey", "Muscle Growth", "Recovery"],
    createdAt: "2023-01-15T00:00:00Z",
    soldCount: 342,
  },
  {
    id: 2,
    name: "Power Pre-Workout Formula - Fruit Punch",
    description:
      "Intense energy and focus for your toughest workouts. With caffeine, beta-alanine, and citrulline for maximum performance.",
    price: 49.99,
    salePrice: 44.99,
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Pre-Workout",
    categoryId: "pre-workout",
    brandId: "cellucor",
    rating: 4.8,
    reviewCount: 95,
    isBestSeller: false,
    isNew: true,
    isSale: false,
    inStock: true,
    freeShipping: true,
    tags: ["Energy", "Focus", "Pumps"],
    createdAt: "2023-04-10T00:00:00Z",
    soldCount: 215,
  },
  {
    id: 3,
    name: "Max Mass Gainer - Vanilla",
    description:
      "High-calorie mass gainer with 1250 calories per serving. Perfect for hardgainers looking to pack on size and strength.",
    price: 69.99,
    salePrice: 62.99,
    image:
      "https://images.unsplash.com/photo-1579722641273-5a8b50576cd8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Weight Gainer",
    categoryId: "mass-gainer",
    brandId: "bsn",
    rating: 4.7,
    reviewCount: 86,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    inStock: true,
    freeShipping: false,
    tags: ["Mass", "Calories", "Weight Gain"],
    createdAt: "2023-02-05T00:00:00Z",
    soldCount: 178,
  },
  {
    id: 4,
    name: "BCAA Recovery Formula - Berry Blast",
    description:
      "Branch chain amino acids for enhanced recovery and reduced muscle soreness. 2:1:1 ratio for optimal results.",
    price: 36.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1579722740822-8977f234bdc6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "BCAA",
    categoryId: "bcaa",
    brandId: "myprotein",
    rating: 4.6,
    reviewCount: 74,
    isBestSeller: false,
    isNew: false,
    isSale: false,
    inStock: true,
    freeShipping: true,
    tags: ["Recovery", "Amino Acids", "Endurance"],
    createdAt: "2023-03-12T00:00:00Z",
    soldCount: 142,
  },
  {
    id: 5,
    name: "Keto-Friendly Protein - Vanilla",
    description:
      "Low-carb, high-fat protein powder designed for those following a ketogenic diet. MCT oils and only 2g carbs per serving.",
    price: 54.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1607012139256-71225ad6c1b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Protein",
    categoryId: "protein",
    brandId: "muscletech",
    rating: 4.5,
    reviewCount: 63,
    isBestSeller: false,
    isNew: false,
    isSale: false,
    inStock: true,
    freeShipping: false,
    tags: ["Keto", "Low-Carb", "MCT Oil"],
    createdAt: "2023-01-25T00:00:00Z",
    soldCount: 126,
  },
  {
    id: 6,
    name: "Creatine Monohydrate - Unflavored",
    description:
      "Pure micronized creatine monohydrate for increased strength, power, and muscle volume. 5g per serving.",
    price: 29.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1542893781-13310d0bc25d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Creatine",
    categoryId: "creatine",
    brandId: "optimum-nutrition",
    rating: 4.9,
    reviewCount: 152,
    isBestSeller: true,
    isNew: false,
    isSale: false,
    inStock: true,
    freeShipping: true,
    tags: ["Strength", "Power", "Recovery"],
    createdAt: "2022-12-01T00:00:00Z",
    soldCount: 356,
  },
  {
    id: 7,
    name: "Multivitamin Performance Pack",
    description:
      "Complete daily multivitamin with added performance boosters. Supports overall health, immunity, and athletic performance.",
    price: 39.99,
    salePrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Vitamins",
    categoryId: "vitamins",
    brandId: "dymatize",
    rating: 4.7,
    reviewCount: 89,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    inStock: true,
    freeShipping: true,
    tags: ["Health", "Immunity", "Wellness"],
    createdAt: "2023-02-18T00:00:00Z",
    soldCount: 198,
  },
  {
    id: 8,
    name: "Plant-Based Protein - Chocolate",
    description:
      "Vegan protein blend with pea, rice, and hemp proteins. 24g protein per serving with complete amino acid profile.",
    price: 49.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1610725664285-7c57e6eeac3f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Protein",
    categoryId: "protein",
    brandId: "myprotein",
    rating: 4.6,
    reviewCount: 72,
    isBestSeller: false,
    isNew: true,
    isSale: false,
    inStock: true,
    freeShipping: true,
    tags: ["Vegan", "Plant-Based", "Dairy-Free"],
    createdAt: "2023-04-05T00:00:00Z",
    soldCount: 134,
  },
  {
    id: 9,
    name: "Fat Burner Elite",
    description:
      "Advanced thermogenic formula to support fat loss, increase metabolism, and enhance energy levels during cutting phases.",
    price: 44.99,
    salePrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1514995428455-447d4443fa7f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Weight Loss",
    categoryId: "weight-loss",
    brandId: "cellucor",
    rating: 4.4,
    reviewCount: 65,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    inStock: true,
    freeShipping: false,
    tags: ["Fat Loss", "Thermogenic", "Energy"],
    createdAt: "2023-03-01T00:00:00Z",
    soldCount: 165,
  },
  {
    id: 10,
    name: "Glutamine Recovery Support",
    description:
      "L-Glutamine supplement for enhanced recovery, gut health, and immune system support. 5g per serving.",
    price: 34.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1505751171710-1f6d0ace5a85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Recovery",
    categoryId: "bcaa", // Grouped with BCAA for filter purposes
    brandId: "bsn",
    rating: 4.8,
    reviewCount: 58,
    isBestSeller: false,
    isNew: false,
    isSale: false,
    inStock: true,
    freeShipping: true,
    tags: ["Recovery", "Immune Support", "Gut Health"],
    createdAt: "2023-02-14T00:00:00Z",
    soldCount: 128,
  },
  {
    id: 11,
    name: "Concentrated Pre-Workout - Blue Razz",
    description:
      "Ultra-potent pre-workout formula for extreme energy, focus, and pumps. Not for beginners!",
    price: 47.99,
    salePrice: null,
    image:
      "https://images.unsplash.com/photo-1574680178050-55c6a6a96e0a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Pre-Workout",
    categoryId: "pre-workout",
    brandId: "muscletech",
    rating: 4.7,
    reviewCount: 97,
    isBestSeller: false,
    isNew: false,
    isSale: false,
    inStock: false, // Out of stock example
    freeShipping: true,
    tags: ["Energy", "Focus", "Pumps", "Strength"],
    createdAt: "2023-03-25T00:00:00Z",
    soldCount: 187,
  },
  {
    id: 12,
    name: "Nootropic Brain Booster",
    description:
      "Cognitive enhancement supplement to improve focus, memory, and mental clarity during workouts and daily tasks.",
    price: 54.99,
    salePrice: 46.99,
    image:
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
    category: "Focus",
    categoryId: "vitamins", // Grouped with vitamins for filter purposes
    brandId: "dymatize",
    rating: 4.5,
    reviewCount: 48,
    isBestSeller: false,
    isNew: true,
    isSale: true,
    inStock: true,
    freeShipping: false,
    tags: ["Focus", "Mental Clarity", "Cognitive"],
    createdAt: "2023-04-15T00:00:00Z",
    soldCount: 96,
  },
];
