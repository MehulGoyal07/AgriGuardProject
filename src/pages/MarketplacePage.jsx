import { useEffect, useState } from 'react';
import FilterBar from '../components/Marketplace/FilterBar'; // We'll create this next
import ProductCard from '../components/Marketplace/ProductCard';
import Loader from '../components/Shared/Loader';
import Navbar from '../components/Shared/Navbar';
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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">AgriGuard Marketplace</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover organic solutions for your crops. Quality products from trusted farmers.
          </p>
        </section>

        {/* Filter Bar */}
        <FilterBar filters={filters} setFilters={setFilters} />

        {/* Products Grid */}
        {loading ? (
          <div className="flex justify-center my-12">
            <Loader />
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No products found matching your criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
                {products.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Featured Categories Banner */}
      <section className="bg-green-50 py-8 mt-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-green-800 mb-6 text-center">
            Shop by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Pesticides', 'Fertilizers', 'Seeds', 'Equipment'].map((category) => (
              <button
                key={category}
                onClick={() => setFilters({...filters, category: category.toLowerCase()})}
                className={`px-6 py-2 rounded-full ${filters.category === category.toLowerCase() ? 'bg-green-600 text-white' : 'bg-white text-green-600 border border-green-600'} transition-colors`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketplacePage;