import axios from 'axios';
import { API_URL } from '../config';

// Product Service for AgriGuard Marketplace
const API_BASE_URL = API_URL || 'http://localhost:5000/api';

// Fetch products with filtering and pagination
export const fetchProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    
    if (filters.category) {
      queryParams.append('category', filters.category);
    }
    
    if (filters.priceRange) {
      queryParams.append('priceRange', filters.priceRange.join(','));
    }
    
    if (filters.sortBy) {
      queryParams.append('sortBy', filters.sortBy);
    }

    const response = await fetch(`${API_BASE_URL}/products?${queryParams.toString()}`);
    
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
export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
};

// Product search functionality
export const searchProducts = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Search failed:', error);
    throw error;
  }
};