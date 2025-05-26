import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ShippingForm from '../components/Checkout/ShippingForm';
import OrderSummary from '../components/Checkout/OrderSummary';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { FaLock, FaCreditCard, FaMoneyBillWave, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../components/Shared/Navbar';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const CheckoutPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState('shipping'); // 'shipping' or 'review'
  const [shippingData, setShippingData] = useState(null);
  const { items, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleShippingSubmit = async (data) => {
    setShippingData(data);
    setStep('review');
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error('Please login to complete checkout');
      return;
    }

    if (!items || items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);
    try {
      const orderData = {
        items: items.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress: shippingData,
        paymentMethod: 'cash_on_delivery',
        totalAmount: items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0)
      };

      const response = await axios.post(
        `${API_URL}/orders`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      await clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${response.data.orderId}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!items || items.length === 0) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center p-8 bg-white rounded-lg shadow-md"
          >
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Your cart is empty</h2>
            <button
              onClick={() => navigate('/marketplace')}
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="flex items-center">
                <div className={`flex items-center ${step === 'shipping' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    1
                  </div>
                  <span className="ml-2 font-medium">Shipping</span>
                </div>
                <div className="w-24 h-0.5 bg-gray-300 mx-4"></div>
                <div className={`flex items-center ${step === 'review' ? 'text-green-600' : 'text-gray-400'}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step === 'review' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}>
                    2
                  </div>
                  <span className="ml-2 font-medium">Review & Pay</span>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  {step === 'shipping' ? (
                    <>
                      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Shipping Information</h2>
                      <ShippingForm onSubmit={handleShippingSubmit} />
                    </>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-semibold text-gray-800">Review & Payment</h2>
                        <button
                          onClick={() => setStep('shipping')}
                          className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                        >
                          <FaArrowLeft className="mr-2" />
                          Edit Address
                        </button>
                      </div>
                      
                      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                        <h3 className="font-medium mb-4 text-gray-800">Shipping Address</h3>
                        <div className="space-y-2">
                          <p className="font-medium text-gray-800">{shippingData.fullName}</p>
                          <p className="text-gray-600">{shippingData.address1}</p>
                          {shippingData.address2 && <p className="text-gray-600">{shippingData.address2}</p>}
                          <p className="text-gray-600">{shippingData.city}, {shippingData.state} - {shippingData.pincode}</p>
                          <p className="text-gray-600">Phone: {shippingData.phone}</p>
                        </div>
                      </div>

                      <div className="border-t pt-6">
                        <h3 className="font-medium mb-4 text-gray-800">Payment Method</h3>
                        <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                          <div className="flex items-center space-x-3">
                            <FaMoneyBillWave className="text-green-600 text-xl" />
                            <span className="font-medium text-gray-800">Cash on Delivery</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">
                            Pay with cash upon delivery
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={handlePlaceOrder}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 flex items-center justify-center space-x-2 text-lg font-medium transition-all duration-300 transform hover:scale-[1.02]"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                            <span>Processing...</span>
                          </>
                        ) : (
                          <>
                            <FaLock />
                            <span>Place Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <OrderSummary />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage; 