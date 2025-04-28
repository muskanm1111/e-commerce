"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFilter, FaTimes, FaChevronDown } from "react-icons/fa";

const ProductFilter = ({
  categories,
  brands,
  priceRange,
  selectedFilters,
  onFilterChange,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    brands: true,
    price: true,
    rating: true,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (category) => {
    const newCategories = selectedFilters.categories.includes(category)
      ? selectedFilters.categories.filter((c) => c !== category)
      : [...selectedFilters.categories, category];

    onFilterChange({
      ...selectedFilters,
      categories: newCategories,
    });
  };

  const handleBrandChange = (brand) => {
    const newBrands = selectedFilters.brands.includes(brand)
      ? selectedFilters.brands.filter((b) => b !== brand)
      : [...selectedFilters.brands, brand];

    onFilterChange({
      ...selectedFilters,
      brands: newBrands,
    });
  };

  const handlePriceChange = (e) => {
    onFilterChange({
      ...selectedFilters,
      price: parseFloat(e.target.value),
    });
  };

  const handleRatingChange = (rating) => {
    onFilterChange({
      ...selectedFilters,
      rating: rating === selectedFilters.rating ? 0 : rating,
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      categories: [],
      brands: [],
      price: priceRange.max,
      rating: 0,
    });
  };

  const FilterSection = ({ title, isOpen, onToggle, children }) => (
    <div className="border-b border-gray py-4">
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={onToggle}
      >
        <h3 className="font-bold">{title}</h3>
        <FaChevronDown
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="pt-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const selectedCount =
    selectedFilters.categories.length +
    selectedFilters.brands.length +
    (selectedFilters.rating > 0 ? 1 : 0) +
    (selectedFilters.price < priceRange.max ? 1 : 0);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setIsMobileOpen(true)}
          className="flex items-center justify-center w-full py-2 px-4 bg-gray-light rounded-lg"
        >
          <FaFilter className="mr-2" />
          <span>Filters</span>
          {selectedCount > 0 && (
            <span className="ml-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {selectedCount}
            </span>
          )}
        </button>
      </div>

      {/* Filter Panel - Desktop & Mobile */}
      <AnimatePresence>
        {(isMobileOpen || !isMobileOpen) && (
          <motion.div
            className={`bg-white z-30 ${
              isMobileOpen
                ? "fixed inset-0 overflow-auto p-4"
                : "hidden lg:block sticky top-24 h-screen overflow-auto pb-20 pr-4"
            }`}
            initial={isMobileOpen ? { x: "-100%" } : { opacity: 1 }}
            animate={isMobileOpen ? { x: 0 } : { opacity: 1 }}
            exit={isMobileOpen ? { x: "-100%" } : {}}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {isMobileOpen && (
              <div className="flex justify-between items-center mb-4 border-b border-gray pb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsMobileOpen(false)} className="p-2">
                  <FaTimes />
                </button>
              </div>
            )}

            {selectedCount > 0 && (
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm text-gray-dark">
                  {selectedCount} {selectedCount === 1 ? "filter" : "filters"}{" "}
                  applied
                </div>
                <button
                  onClick={clearAllFilters}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Clear All
                </button>
              </div>
            )}

            <FilterSection
              title="Categories"
              isOpen={expandedSections.categories}
              onToggle={() => toggleSection("categories")}
            >
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category.id}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.categories.includes(category.id)}
                      onChange={() => handleCategoryChange(category.id)}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                        selectedFilters.categories.includes(category.id)
                          ? "bg-primary border-primary text-white"
                          : "border-gray group-hover:border-primary"
                      }`}
                    >
                      {selectedFilters.categories.includes(category.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm group-hover:text-primary">
                      {category.name}
                    </span>
                    <span className="ml-auto text-xs text-gray-dark">
                      {category.count}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Brands"
              isOpen={expandedSections.brands}
              onToggle={() => toggleSection("brands")}
            >
              <div className="space-y-2">
                {brands.map((brand) => (
                  <label
                    key={brand.id}
                    className="flex items-center cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters.brands.includes(brand.id)}
                      onChange={() => handleBrandChange(brand.id)}
                      className="hidden"
                    />
                    <span
                      className={`w-5 h-5 mr-3 flex items-center justify-center border rounded transition-colors ${
                        selectedFilters.brands.includes(brand.id)
                          ? "bg-primary border-primary text-white"
                          : "border-gray group-hover:border-primary"
                      }`}
                    >
                      {selectedFilters.brands.includes(brand.id) && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                    <span className="text-sm group-hover:text-primary">
                      {brand.name}
                    </span>
                    <span className="ml-auto text-xs text-gray-dark">
                      {brand.count}
                    </span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection
              title="Price"
              isOpen={expandedSections.price}
              onToggle={() => toggleSection("price")}
            >
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">${priceRange.min}</span>
                  <span className="text-sm font-medium">
                    ${selectedFilters.price}
                  </span>
                  <span className="text-sm font-medium">${priceRange.max}</span>
                </div>
                <input
                  type="range"
                  min={priceRange.min}
                  max={priceRange.max}
                  step={5}
                  value={selectedFilters.price}
                  onChange={handlePriceChange}
                  className="w-full h-2 bg-gray rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </FilterSection>

            <FilterSection
              title="Rating"
              isOpen={expandedSections.rating}
              onToggle={() => toggleSection("rating")}
            >
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div
                    key={rating}
                    onClick={() => handleRatingChange(rating)}
                    className="flex items-center cursor-pointer group"
                  >
                    <div
                      className={`
                      flex items-center flex-1 p-2 rounded-md transition-colors 
                      ${
                        selectedFilters.rating === rating
                          ? "bg-gray-light"
                          : "hover:bg-gray-light/50"
                      }
                    `}
                    >
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill={i < rating ? "currentColor" : "none"}
                            stroke="currentColor"
                            strokeWidth={i < rating ? 0 : 1.5}
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <span className="ml-2 text-sm">{rating} & Up</span>
                    </div>
                  </div>
                ))}
              </div>
            </FilterSection>

            {isMobileOpen && (
              <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray shadow-lg">
                <div className="flex space-x-4">
                  <button
                    onClick={clearAllFilters}
                    className="flex-1 btn btn-outline"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={() => setIsMobileOpen(false)}
                    className="flex-1 btn btn-primary"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductFilter;
