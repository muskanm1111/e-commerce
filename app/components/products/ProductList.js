"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductFilter from "./ProductFilter";
import ProductSort from "./ProductSort";
import ProductCard from "./ProductCard";
import ProductCardList from "./ProductCardList";

const ProductList = ({ initialProducts }) => {
  const [products, setProducts] = useState(initialProducts || []);
  const [filteredProducts, setFilteredProducts] = useState(
    initialProducts || []
  );
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [sortOption, setSortOption] = useState("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    brands: [],
    price: 300,
    rating: 0,
  });

  // Sample categories and brands for the filter
  const categories = [
    { id: "protein", name: "Protein", count: 24 },
    { id: "pre-workout", name: "Pre-Workout", count: 18 },
    { id: "mass-gainer", name: "Mass Gainer", count: 12 },
    { id: "bcaa", name: "BCAA", count: 15 },
    { id: "creatine", name: "Creatine", count: 10 },
    { id: "vitamins", name: "Vitamins", count: 20 },
    { id: "weight-loss", name: "Weight Loss", count: 14 },
  ];

  const brands = [
    { id: "optimum-nutrition", name: "Optimum Nutrition", count: 28 },
    { id: "muscletech", name: "MuscleTech", count: 22 },
    { id: "myprotein", name: "MyProtein", count: 18 },
    { id: "bsn", name: "BSN", count: 15 },
    { id: "cellucor", name: "Cellucor", count: 17 },
    { id: "dymatize", name: "Dymatize", count: 14 },
  ];

  const priceRange = {
    min: 10,
    max: 300,
  };

  // Apply filters and sorting
  useEffect(() => {
    setLoading(true);

    // Filter products based on selected filters
    let results = [...products];

    // Filter by categories
    if (selectedFilters.categories.length > 0) {
      results = results.filter((product) =>
        selectedFilters.categories.includes(product.categoryId)
      );
    }

    // Filter by brands
    if (selectedFilters.brands.length > 0) {
      results = results.filter((product) =>
        selectedFilters.brands.includes(product.brandId)
      );
    }

    // Filter by price
    results = results.filter((product) => {
      const priceToCompare = product.salePrice || product.price;
      return priceToCompare <= selectedFilters.price;
    });

    // Filter by rating
    if (selectedFilters.rating > 0) {
      results = results.filter(
        (product) => product.rating >= selectedFilters.rating
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low-high":
        results.sort(
          (a, b) => (a.salePrice || a.price) - (b.salePrice || b.price)
        );
        break;
      case "price-high-low":
        results.sort(
          (a, b) => (b.salePrice || b.price) - (a.salePrice || a.price)
        );
        break;
      case "rating":
        results.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "bestselling":
        results.sort((a, b) => b.soldCount - a.soldCount);
        break;
      default:
        // 'featured' - no need to sort, products are already sorted by featured status
        break;
    }

    // Simulate API delay
    setTimeout(() => {
      setFilteredProducts(results);
      setLoading(false);
    }, 300);
  }, [products, selectedFilters, sortOption]);

  const handleFilterChange = (newFilters) => {
    setSelectedFilters(newFilters);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar/Filter */}
        <div className="lg:col-span-1">
          <ProductFilter
            categories={categories}
            brands={brands}
            priceRange={priceRange}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
            isMobileOpen={isMobileFilterOpen}
            setIsMobileOpen={setIsMobileFilterOpen}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductSort
            sortOption={sortOption}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            productCount={filteredProducts.length}
          />

          {loading ? (
            // Loading state
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            // Empty state
            <div className="flex flex-col items-center justify-center py-20">
              <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
              <p className="text-gray-dark mb-6">
                Try adjusting your filters to find what you&apos;re looking for.
              </p>
              <button
                onClick={() =>
                  setSelectedFilters({
                    categories: [],
                    brands: [],
                    price: priceRange.max,
                    rating: 0,
                  })
                }
                className="btn btn-primary"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            // Product grid/list
            <AnimatePresence mode="wait">
              <motion.div
                key={viewMode}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {viewMode === "grid" ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6 mt-6">
                    {filteredProducts.map((product) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ProductCardList product={product} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Pagination or Load More (placeholder) */}
          {filteredProducts.length > 0 && (
            <div className="mt-10 flex justify-center">
              <button className="btn btn-outline">Load More Products</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
