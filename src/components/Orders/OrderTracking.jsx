import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { API_URL } from '../../config';
import { FaSpinner, FaBox, FaTruck, FaCheckCircle, FaTimesCircle, FaClock, FaRupeeSign } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import Navbar from '../Shared/Navbar';

const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('current');
  const { user } = useAuth();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/myorders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to fetch orders');
      setLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      await axios.put(
        `${API_URL}/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      toast.success('Order cancelled successfully');
      fetchOrders();
    } catch (error) {
      console.error('Error cancelling order:', error);
      toast.error('Failed to cancel order');
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <FaClock className="text-yellow-500" />;
      case 'processing':
        return <FaBox className="text-blue-500" />;
      case 'shipped':
        return <FaTruck className="text-purple-500" />;
      case 'delivered':
        return <FaCheckCircle className="text-green-500" />;
      case 'cancelled':
        return <FaTimesCircle className="text-red-500" />;
      default:
        return <FaBox className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'processing':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const currentOrders = orders.filter(
    (order) => !['delivered', 'cancelled'].includes(order.status.toLowerCase())
  );
  const previousOrders = orders.filter((order) =>
    ['delivered', 'cancelled'].includes(order.status.toLowerCase())
  );

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <FaSpinner className="animate-spin text-4xl text-green-500" />
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 mt-20">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800">My Orders</h1>
              <div className="flex space-x-4 mt-4 md:mt-0">
                <button
                  onClick={() => setActiveTab('current')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'current'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Current Orders ({currentOrders.length})
                </button>
                <button
                  onClick={() => setActiveTab('previous')}
                  className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeTab === 'previous'
                      ? 'bg-green-500 text-white shadow-lg shadow-green-200'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Previous Orders ({previousOrders.length})
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {(activeTab === 'current' ? currentOrders : previousOrders).map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Order #{order._id.slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-3 mt-4 md:mt-0">
                      {getStatusIcon(order.status)}
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-medium border ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item._id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img
                          src={item.product.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg shadow-sm"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Quantity: {item.quantity} × <FaRupeeSign className="inline-block h-3 w-3" />{item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-800">
                            <FaRupeeSign className="inline-block h-3 w-3" />{(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                      <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-2xl font-bold text-gray-800 mt-1">
                          <FaRupeeSign className="inline-block h-4 w-4" />{order.totalAmount.toFixed(2)}
                        </p>
                      </div>
                      {order.status.toLowerCase() === 'pending' && (
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          className="mt-4 md:mt-0 px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm hover:shadow-md"
                        >
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {(activeTab === 'current' ? currentOrders : previousOrders).length === 0 && (
                <div className="text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                  <FaBox className="mx-auto text-5xl text-gray-300 mb-4" />
                  <h3 className="text-xl font-medium text-gray-600">
                    No {activeTab} orders found
                  </h3>
                  <p className="text-gray-500 mt-2">
                    {activeTab === 'current'
                      ? 'You have no active orders at the moment.'
                      : 'You have no previous orders.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderTracking; 