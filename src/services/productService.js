// Product Service for AgriGuard Marketplace
const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

// Mock data for development (remove in production)
const mockProducts = [{
        id: 1,
        name: "Organic Neem Pesticide",
        price: 12.99,
        originalPrice: 15.99,
        discount: 19,
        image: "/products/neem-pesticide.jpg",
        category: "pesticides",
        rating: 4.5,
        reviewCount: 128,
        stock: 50,
        description: "100% natural neem-based pesticide for organic farming",
        farmer: {
            id: 101,
            name: "Green Fields Co-op"
        }
    },
    {
        id: 2,
        name: "Vermicompost Fertilizer",
        price: 8.49,
        image: "/products/vermicompost.jpg",
        category: "fertilizers",
        rating: 4.7,
        reviewCount: 215,
        stock: 35,
        description: "Nutrient-rich organic fertilizer from worm composting"
    }
    // Add more mock products as needed
];

// Fetch products with filtering and pagination
export const fetchProducts = async(filters = {}) => {
    // In development, return mock data immediately
    if (
        import.meta.env.MODE === 'development') {
        return simulateApiCall(mockProducts, filters);
    }

    try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await fetch(`${API_BASE_URL}/products?${queryString}`);

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Failed to fetch products:', error);
        throw error;
    }
};

// Get single product details
export const getProductById = async(id) => {
    if (
        import.meta.env.MODE === 'development') {
        return mockProducts.find(p => p.id === id) || null;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${id}`);
        return await response.json();
    } catch (error) {
        console.error(`Failed to fetch product ${id}:`, error);
        throw error;
    }
};

// Simulate API call with filtering (for mock data)
const simulateApiCall = (products, filters) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let results = [...products];

            // Apply category filter
            if (filters.category && filters.category !== 'all') {
                results = results.filter(p =>
                    p.category === filters.category
                );
            }

            // Apply price range filter
            if (filters.priceRange) {
                results = results.filter(p =>
                    p.price >= filters.priceRange[0] &&
                    p.price <= filters.priceRange[1]
                );
            }

            // Apply sorting
            if (filters.sortBy) {
                switch (filters.sortBy) {
                    case 'price-asc':
                        results.sort((a, b) => a.price - b.price);
                        break;
                    case 'price-desc':
                        results.sort((a, b) => b.price - a.price);
                        break;
                    case 'rating':
                        results.sort((a, b) => b.rating - a.rating);
                        break;
                    case 'newest':
                        results.sort((a, b) => b.id - a.id); // Using ID as creation proxy
                        break;
                }
            }

            resolve(results);
        }, 300); // Simulate network delay
    });
};

// Product search functionality
export const searchProducts = async(query) => {
    if (
        import.meta.env.MODE === 'development') {
        return mockProducts.filter(p =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase())
        );
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
        return await response.json();
    } catch (error) {
        console.error('Search failed:', error);
        throw error;
    }
};