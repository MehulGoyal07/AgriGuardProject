const mongoose = require('mongoose');
const Product = require('../models/Product');
const connectDB = require('../config/db');
require('dotenv').config();

const sampleProducts = [
  {
    name: "Organic Neem Pesticide",
    price: 12.99,
    originalPrice: 15.99,
    discount: 19,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500",
    category: "pesticides",
    rating: 4.5,
    reviewCount: 128,
    stock: 50,
    description: "100% natural neem-based pesticide for organic farming. Safe for plants and environment.",
    farmer: {
      name: "Green Fields Co-op"
    }
  },
  {
    name: "Vermicompost Fertilizer",
    price: 8.49,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500",
    category: "fertilizers",
    rating: 4.7,
    reviewCount: 215,
    stock: 35,
    description: "Nutrient-rich organic fertilizer from worm composting. Perfect for all types of plants.",
    farmer: {
      name: "Eco Farm Solutions"
    }
  },
  {
    name: "Hybrid Tomato Seeds",
    price: 5.99,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500",
    category: "seeds",
    rating: 4.3,
    reviewCount: 89,
    stock: 100,
    description: "High-yield hybrid tomato seeds. Disease-resistant and perfect for home gardens.",
    farmer: {
      name: "Seed Masters"
    }
  },
  {
    name: "Garden Sprayer",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500",
    category: "equipment",
    rating: 4.2,
    reviewCount: 156,
    stock: 20,
    description: "Professional garden sprayer with adjustable nozzle. Perfect for applying pesticides and fertilizers.",
    farmer: {
      name: "Farm Tools Co."
    }
  }
];

const seedProducts = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env file');
    }

    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    
    // Insert new products
    await Product.insertMany(sampleProducts);
    
    console.log('Products seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts(); 