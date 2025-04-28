"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaThLarge, FaList } from "react-icons/fa";

const ProductSort = ({
  sortOption,
  onSortChange,
  viewMode,
  onViewModeChange,
  productCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const sortOptions = [
    { value: "featured", label: "Featured" },
    { value: "newest", label: "Newest Arrivals" },
    { value: "price-low-high", label: "Price: Low to High" },
    { value: "price-high-low", label: "Price: High to Low" },
    { value: "rating", label: "Top Rated" },
    { value: "bestselling", label: "Best Selling" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSortChange = (option) => {
    onSortChange(option);
    setIsOpen(false);
  };

  const getCurrentSortLabel = () => {
    const option = sortOptions.find((option) => option.value === sortOption);
    return option ? option.label : "Sort By";
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray">
      {/* Product Count */}
      <div className="mb-4 sm:mb-0">
        <p className="text-gray-dark">
          Showing{" "}
          <span className="font-medium text-secondary">{productCount}</span>{" "}
          products
        </p>
      </div>

      <div className="flex space-x-4 items-center">
        {/* Sort Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            className="flex items-center space-x-2 bg-gray-light rounded-lg px-4 py-2 text-sm hover:bg-gray transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span>{getCurrentSortLabel()}</span>
            <FaChevronDown
              className={`transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg z-20"
              >
                <div className="py-2">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-light transition-colors ${
                        sortOption === option.value
                          ? "bg-gray-light text-primary font-medium"
                          : ""
                      }`}
                      onClick={() => handleSortChange(option.value)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* View Mode Toggle */}
        <div className="flex space-x-2 border-l border-gray pl-4">
          <button
            className={`p-2 rounded-md transition-colors ${
              viewMode === "grid"
                ? "bg-gray-light text-primary"
                : "text-gray-dark hover:bg-gray-light"
            }`}
            onClick={() => onViewModeChange("grid")}
            aria-label="Grid view"
          >
            <FaThLarge size={16} />
          </button>
          <button
            className={`p-2 rounded-md transition-colors ${
              viewMode === "list"
                ? "bg-gray-light text-primary"
                : "text-gray-dark hover:bg-gray-light"
            }`}
            onClick={() => onViewModeChange("list")}
            aria-label="List view"
          >
            <FaList size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductSort;
