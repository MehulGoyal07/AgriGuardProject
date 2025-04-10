/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiChevronDown, FiChevronUp, FiFilter, FiX } from 'react-icons/fi';
import { RiFilterOffLine } from 'react-icons/ri';

const FilterBar = ({ filters, setFilters }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState(filters.categories || []);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Agriculture-focused filter options
  const categories = [
    'Disease Detection',
    'Pest Control',
    'Soil Health',
    'Crop Varieties',
    'Irrigation',
    'Weather Advisory'
  ];

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true
    });
  }, []);

  // Apply filters with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        ...filters,
        categories: selectedCategories
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [selectedCategories]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setFilters({
      ...filters,
      categories: []
    });
    setActiveDropdown(null);
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const hasActiveFilters = () => {
    return selectedCategories.length > 0;
  };

  return (
    <div className="bg-white shadow-sm sticky top-0 z-20 border-b border-gray-100">
      {/* Desktop Filter Bar */}
      <div className="hidden lg:block">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Filters - Only keeping categories for farmers */}
            <div className="flex items-center space-x-4">
              {/* Category Filter - Main filter for farmers */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleDropdown('categories')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${activeDropdown === 'categories' ? 'bg-green-100 text-green-800' : 'bg-gray-50 hover:bg-gray-100'}`}
                >
                  <span className="font-medium">Solution Types</span>
                  {activeDropdown === 'categories' ? <FiChevronUp /> : <FiChevronDown />}
                </motion.button>

                <AnimatePresence>
                  {activeDropdown === 'categories' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute z-20 mt-2 w-64 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                    >
                      <div className="space-y-2">
                        {categories.map(category => (
                          <motion.label
                            key={category}
                            whileHover={{ scale: 1.02 }}
                            className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${selectedCategories.includes(category) ? 'bg-green-50 border border-green-200 text-green-800' : 'hover:bg-gray-50'}`}
                          >
                            <input
                              type="checkbox"
                              checked={selectedCategories.includes(category)}
                              onChange={() => toggleCategory(category)}
                              className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                            />
                            <span className="ml-3 text-sm">{category}</span>
                          </motion.label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Reset Button */}
              {hasActiveFilters() && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetFilters}
                  className="flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800 px-3 py-2 rounded-lg bg-gray-50"
                >
                  <RiFilterOffLine className="h-5 w-5" />
                  <span>Clear Filters</span>
                </motion.button>
              )}
            </div>

            {/* Right side - Removed sorting options as they're not relevant for farmers */}
            <div className="flex items-center space-x-4">
              {/* Could add relevant farmer filters here in the future */}
            </div>
          </div>

          {/* Active Filters */}
          {selectedCategories.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.2 }}
              className="mt-3 flex flex-wrap gap-2"
            >
              {selectedCategories.map(category => (
                <motion.span
                  key={category}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {category}
                  <button
                    onClick={() => toggleCategory(category)}
                    className="ml-1.5 inline-flex text-green-500 hover:text-green-700"
                  >
                    <FiX className="h-3 w-3" />
                  </button>
                </motion.span>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Filter Bar - Simplified for farmers */}
      <div className="lg:hidden sticky top-0 z-10 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsMobileFiltersOpen(true)}
            className="flex items-center space-x-2 text-sm font-medium text-gray-700 bg-gray-50 px-4 py-2 rounded-lg"
          >
            <FiFilter className="h-4 w-4" />
            <span>Filters</span>
            {hasActiveFilters() && (
              <span className="bg-green-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {selectedCategories.length}
              </span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Filters Panel - Simplified */}
      <AnimatePresence>
        {isMobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />

            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-white shadow-xl z-40 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Solution Filters</h2>
                  <button
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FiX className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Category Filter */}
                <div className="border-b border-gray-200 py-6">
                  <h3 className="font-medium text-gray-900 mb-4">Solution Types</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <motion.label
                        key={category}
                        whileTap={{ scale: 0.98 }}
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${selectedCategories.includes(category) ? 'bg-green-50 border border-green-200 text-green-800' : 'hover:bg-gray-50'}`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-3 text-sm">{category}</span>
                      </motion.label>
                    ))}
                  </div>
                </div>

                <div className="mt-6 flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={resetFilters}
                    className="flex-1 bg-gray-100 text-gray-800 py-3 px-4 rounded-lg text-sm font-medium"
                  >
                    Reset All
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg text-sm font-medium"
                  >
                    Apply Filters
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterBar;