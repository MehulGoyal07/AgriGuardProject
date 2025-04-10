/* eslint-disable react/prop-types */
import { useState } from 'react';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaStarHalfAlt } from 'react-icons/fa';

const ProductCard = ({ product, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100">
      {/* Product Image */}
      <div className="relative pb-[70%] bg-gray-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="absolute h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-2 right-2 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          {isWishlisted ? (
            <FaHeart className="h-5 w-5 text-red-500" />
          ) : (
            <FaRegHeart className="h-5 w-5 text-gray-600" />
          )}
        </button>
        {/* Stock Badge */}
        {product.stock < 10 && (
          <span className="absolute bottom-2 left-2 bg-amber-500 text-white text-xs px-2 py-1 rounded">
            Only {product.stock} left
          </span>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-1">
            {product.name}
          </h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded ml-2">
            {product.category}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-1 mb-2">
          <div className="flex">
            {renderStars()}
          </div>
          <span className="text-xs text-gray-500 ml-1">
            ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-lg font-bold text-green-700">
            ₹{product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ₹{product.originalPrice.toFixed(2)}
            </span>
          )}
          {product.discount && (
            <span className="text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded ml-2">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center mt-3 mb-4">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={quantity <= 1}
            className="px-2 py-1 border border-gray-300 rounded-l-md disabled:opacity-50"
          >
            -
          </button>
          <span className="px-4 py-1 border-t border-b border-gray-300 text-center">
            {quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={quantity >= product.stock}
            className="px-2 py-1 border border-gray-300 rounded-r-md disabled:opacity-50"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart({ ...product, quantity })}
          disabled={product.stock <= 0}
          className={`w-full flex items-center justify-center py-2 px-4 rounded-md ${
            product.stock > 0
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-gray-300 text-gray-600 cursor-not-allowed'
          } transition-colors`}
        >
          <FaShoppingCart className="h-5 w-5 mr-2" />
          {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;