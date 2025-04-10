import AOS from 'aos';
import 'aos/dist/aos.css';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Footer from '../components/Footer';
import FilterBar from '../components/Marketplace/FilterBar';
import ProductCard from '../components/Marketplace/ProductCard';
import Loader from '../components/Shared/Loader';
import Navbar from '../components/Shared/Navbar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { fetchProducts } from '../services/productService';

const MarketplacePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: 'all',
    priceRange: [0, 1000],
    sortBy: 'price-asc'
  });
  
  const { addToCart } = useCart();
  const { user } = useAuth();

  // Initialize AOS animations
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-in-out',
      offset: 100
    });
  }, []);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts(filters);
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [filters]);

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1
    });
  };

  if (error) return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar user={user} />
      <div className="container mx-auto px-4 py-24 text-center flex-grow">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="mt-10 min-h-screen flex flex-col bg-gradient-to-b from-green-50 to-white">
      <Navbar user={user} />
      
      <main className="flex-grow container mx-auto px-4 pt-28 pb-12">
        {/* Hero Section */}
        <motion.section 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4" data-aos="fade-up">
            AgriGuard Marketplace
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Discover premium organic solutions for your crops. Quality products sourced directly from trusted farmers worldwide.
          </p>
        </motion.section>

        {/* Filter Bar */}
        <motion.div 
          data-aos="fade-up" 
          data-aos-delay="200"
          className="mb-12"
        >
          <FilterBar filters={filters} setFilters={setFilters} />
        </motion.div>

        {/* Featured Categories */}
        <motion.section 
          className="mb-16"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
            Shop by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['All', 'Pesticides', 'Fertilizers', 'Seeds', 'Equipment'].map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilters({...filters, category: category.toLowerCase()})}
                className={`px-5 py-2 rounded-full text-sm md:text-base ${filters.category === category.toLowerCase() ? 
                  'bg-green-600 text-white shadow-md' : 
                  'bg-white text-green-600 border border-green-200 hover:border-green-400'} transition-all`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center my-16">
            <Loader size="lg" />
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <motion.div 
                className="text-center py-16"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                <button 
                  onClick={() => setFilters({...filters, category: 'all'})}
                  className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Reset Filters
                </button>
              </motion.div>
            ) : (
              <AnimatePresence>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ y: -5 }}
                    >
                      <ProductCard 
                        product={product} 
                        onAddToCart={handleAddToCart}
                      />
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </>
        )}
      </main>

      {/* Value Proposition Section */}
      <motion.section 
        className="bg-green-800 text-white py-16"
        data-aos="fade-up"
      >
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
              <motion.div 
                key={index}
                className="bg-green-700/30 p-6 rounded-xl backdrop-blur-sm"
                whileHover={{ scale: 1.03 }}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-green-100">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default MarketplacePage;