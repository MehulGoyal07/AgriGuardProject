import { useCart } from '../../context/CartContext';
import { FaShoppingBag, FaTruck, FaLock } from 'react-icons/fa';

const OrderSummary = () => {
  const { items = [] } = useCart();

  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-2 mb-6">
        <FaShoppingBag className="text-green-600 text-xl" />
        <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
      </div>
      
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <div key={item.product._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h3 className="font-medium text-gray-800">{item.product.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-sm text-gray-600">₹{item.product.price.toFixed(2)} each</p>
              </div>
            </div>
            <p className="font-medium text-gray-800">₹{(item.product.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      <div className="border-t pt-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <div className="flex items-center space-x-2">
            <FaTruck className="text-green-600" />
            <span>Shipping</span>
          </div>
          <span className="text-green-600">Free</span>
        </div>
        <div className="flex justify-between font-semibold text-lg pt-3 border-t">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <div className="flex items-center space-x-2 text-green-700">
          <FaLock />
          <span className="text-sm font-medium">Secure Checkout</span>
        </div>
        <p className="text-sm text-green-600 mt-2">
          Your payment information is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default OrderSummary; 