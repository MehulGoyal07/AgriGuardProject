/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { FaChevronDown, FaTimes } from 'react-icons/fa';
import { FiFilter } from 'react-icons/fi';

const FilterBar = ({ filters, setFilters }) => {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState(filters.priceRange);
  const [selectedCategories, setSelectedCategories] = useState(filters.categories || []);

  // Available filter options
  const categories = [
    'Pesticides',
    'Fertilizers',
    'Seeds',
    'Equipment',
    'Growth Promoters',
    'Organic'
  ];

  const sortOptions = [
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'best-selling', label: 'Best Selling' }
  ];

  // Apply filters with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters({
        ...filters,
        priceRange,
        categories: selectedCategories
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [priceRange, selectedCategories]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setFilters({
      ...filters,
      priceRange: [0, 1000],
      categories: [],
      sortBy: 'price-asc'
    });
  };

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Desktop Filter Bar */}
      <div className="hidden md:block container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4">
            {/* Category Filter */}
            <div className="relative group">
              <button className="flex items-center space-x-1 px-3 py-2 bg-gray-50 rounded-lg hover:bg-gray-100">
                <span>Categories</span>
                <FaChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute z-10 mt-1 w-56 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                {categories.map(category => (
                  <label key={category} className="flex items-center px-4 py-2 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                    />
                    <span className="ml-3 text-gray-700">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="flex items-center space-x-4">
              <div className="w-48">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price: ₹{priceRange[0]} - ₹{priceRange[1]}
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-4">
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {filters.sortBy !== 'price-asc' || priceRange[1] < 1000 || selectedCategories.length > 0 ? (
              <button
                onClick={resetFilters}
                className="flex items-center text-gray-500 hover:text-gray-700"
              >
                <FaTimes className="h-5 w-5 mr-1" />
                Reset
              </button>
            ) : null}
          </div>
        </div>

        {/* Active Filters */}
        {(selectedCategories.length > 0 || priceRange[1] < 1000) && (
          <div className="mt-3 flex flex-wrap gap-2">
            {selectedCategories.map(category => (
              <span
                key={category}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {category}
                <button
                  onClick={() => toggleCategory(category)}
                  className="ml-1.5 inline-flex text-green-500 hover:text-green-700"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </span>
            ))}
            {priceRange[1] < 1000 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Under ₹{priceRange[1]}
                <button
                  onClick={() => setPriceRange([0, 1000])}
                  className="ml-1.5 inline-flex text-blue-500 hover:text-blue-700"
                >
                  <FaTimes className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Mobile Filter Button */}
      <div className="md:hidden flex justify-between items-center px-4 py-3 border-t border-gray-200">
        <button
          onClick={() => setIsMobileFiltersOpen(true)}
          className="flex items-center text-sm font-medium text-gray-700"
        >
          <FiFilter className="h-5 w-5 mr-2" />
          Filters
        </button>

        <select
          value={filters.sortBy}
          onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
          className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          {sortOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Filters Panel */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-gray-500 bg-opacity-75" onClick={() => setIsMobileFiltersOpen(false)}></div>
          <div className="absolute inset-y-0 left-0 max-w-xs w-full bg-white shadow-xl">
            <div className="h-full overflow-y-auto">
              <div className="px-4 py-6">
                <div className="flex items-center justify-between border-b pb-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <FaTimes className="h-6 w-6" />
                  </button>
                </div>

                {/* Mobile Category Filter */}
                <div className="border-b border-gray-200 py-4">
                  <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category)}
                          onChange={() => toggleCategory(category)}
                          className="h-4 w-4 text-green-600 rounded border-gray-300 focus:ring-green-500"
                        />
                        <span className="ml-3 text-gray-700">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Mobile Price Filter */}
                <div className="border-b border-gray-200 py-4">
                  <h3 className="font-medium text-gray-900 mb-2">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span>₹0</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="mt-4">
                  <button
                    onClick={resetFilters}
                    className="w-full bg-gray-100 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-200"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;