import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import ProductGrid from '../components/Products/ProductGrid';
import ProductFilters from '../components/Products/ProductFilters';
import { toast } from 'react-hot-toast';
import Footer from '../components/Footer';
import Navbar from '../components/Shared/Navbar';
import { useAuth } from '../context/AuthContext';

const MarketplacePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useAuth();

  const fetchProducts = async (filters) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (filters.category && filters.category !== 'All') {
        params.append('category', filters.category);
      }
      if (filters.priceRange) {
        params.append('priceRange', filters.priceRange);
      }
      if (filters.sortBy) {
        params.append('sortBy', filters.sortBy);
      }

      const apiUrl = `http://localhost:5000/api/products?${params.toString()}`;
      console.log('Fetching products from:', apiUrl);
      
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data);
      
      if (!response.data) {
        throw new Error('No data received from the server');
      }
      
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error('Error fetching products:', error);
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError('Failed to load products. Please try again later.');
      toast.error('Failed to load products');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const filters = {
      category: searchParams.get('category') || 'All',
      priceRange: searchParams.get('priceRange') || '0,1000',
      sortBy: searchParams.get('sortBy') || 'newest',
    };
    fetchProducts(filters);
  }, [searchParams]);

  const handleFilterChange = (filters) => {
    setSearchParams(filters);
  };

  if (error) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
        <Navbar />
        <div className="container mx-auto px-4 py-24 text-center flex-grow">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            AgriGuard Marketplace
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Discover premium organic solutions for your crops. Quality products sourced directly from trusted farmers worldwide.
          </p>
        </section>

        {/* Filters */}
        <div className="mb-12">
          <ProductFilters onFilterChange={handleFilterChange} />
        </div>

        {/* Products Grid */}
        <ProductGrid
          products={products}
          loading={loading}
          error={error}
        />
      </main>

      {/* Value Proposition Section */}
      <section className="bg-green-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose AgriGuard?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Quality Guaranteed",
                desc: "All products verified for organic certification and effectiveness",
                icon: "✅"
              },
              {
                title: "Farmer Direct",
                desc: "Support local farmers by buying directly from source",
                icon: "👨‍🌾"
              },
              {
                title: "Sustainable Solutions",
                desc: "Eco-friendly products for healthier crops and environment",
                icon: "🌱"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="bg-green-700/30 p-6 rounded-xl backdrop-blur-sm"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-100">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketplacePage;