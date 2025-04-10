/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { FaHeart, FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import { RiFlashlightFill } from 'react-icons/ri';

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityChange = (value) => {
    const newValue = Math.max(1, Math.min(product.stock, quantity + value));
    setQuantity(newValue);
  };

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(product.rating);
    const hasHalfStar = product.rating % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400 w-4 h-4" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400 w-4 h-4" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-gray-300 w-4 h-4" />);
      }
    }

    return stars;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Product Image */}
      <div className="relative pb-[70%] bg-gray-50 overflow-hidden group">
        <motion.img
          src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover"
          initial={{ scale: 1 }}
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Wishlist Button */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            setIsWishlisted(!isWishlisted);
          }}
          className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FaHeart className="h-5 w-5 text-red-500" />
          ) : (
            <FiHeart className="h-5 w-5 text-gray-600" />
          )}
        </motion.button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {/* Stock Badge */}
          {product.stock < 10 && (
            <motion.span 
              className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full shadow-sm"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Only {product.stock} left
            </motion.span>
          )}

          {/* Discount Badge */}
          {product.discount && (
            <motion.span
              className="bg-green-600 text-white text-xs px-2 py-1 rounded-full shadow-sm flex items-center"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <RiFlashlightFill className="mr-1" />
              {product.discount}% OFF
            </motion.span>
          )}
        </div>

        {/* Quick Add to Cart (Appears on hover) */}
        <AnimatePresence>
          {isHovered && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart({ ...product, quantity: 1 });
              }}
              disabled={product.stock <= 0}
              className={`absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center justify-center py-2 px-4 rounded-full ${
                product.stock > 0
                  ? 'bg-green-600 hover:bg-green-700 text-white shadow-lg'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed'
              } transition-colors z-10`}
            >
              <FiShoppingCart className="h-4 w-4 mr-2" />
              <span className="text-sm font-medium">Quick Add</span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <span className="text-xs font-medium text-green-600 uppercase tracking-wider">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="font-semibold text-gray-800 line-clamp-2 mt-1 mb-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex mr-1">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center mb-4">
          <span className="text-xl font-bold text-gray-900">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center gap-2">
          {/* Quantity Selector */}
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <motion.button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              whileTap={{ scale: 0.9 }}
              className="px-2 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </motion.button>
            <span className="px-3 py-1 text-center text-sm font-medium">
              {quantity}
            </span>
            <motion.button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= product.stock}
              whileTap={{ scale: 0.9 }}
              className="px-2 py-1 bg-gray-50 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </motion.button>
          </div>

          {/* Add to Cart Button */}
          <motion.button
            onClick={() => onAddToCart({ ...product, quantity })}
            disabled={product.stock <= 0}
            whileHover={{ scale: product.stock > 0 ? 1.02 : 1 }}
            whileTap={{ scale: product.stock > 0 ? 0.98 : 1 }}
            className={`flex-1 flex items-center justify-center py-2 px-4 rounded-lg ${
              product.stock > 0
                ? 'bg-green-600 hover:bg-green-700 text-white'
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
            } transition-colors`}
          >
            <FiShoppingCart className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">
              {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
            </span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;