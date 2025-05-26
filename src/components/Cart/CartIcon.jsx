import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../../context/CartContext';

const CartIcon = () => {
  const cart = useCart();
  const items = cart?.items || [];
  const itemCount = Array.isArray(items) 
    ? items.reduce((total, item) => total + (item?.quantity || 0), 0)
    : 0;

  return (
    <Link to="/cart" className="relative">
      <FaShoppingCart className="text-xl" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
};

export default CartIcon; 