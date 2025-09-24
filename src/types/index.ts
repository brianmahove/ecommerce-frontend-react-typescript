// src/types/index.ts
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  stock: number;
  tags: string[];
  features: string[];
  emoji?: string; // Added for the visual representation
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isAdmin?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterState {
  category: string;
  priceRange: [number, number];
  minRating: number;
  sortBy: 'name' | 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
}