// src/graphql/mockData.ts
import { Product, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Quantum Laptop X1',
    description: 'Next-gen computing with quantum processing capabilities',
    price: 2999.99,
    originalPrice: 3499.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    category: 'Electronics',
    rating: 4.8,
    stock: 15,
    tags: ['quantum', 'laptop', 'premium'],
    features: ['Quantum CPU', 'Holographic Display', 'Neural Interface']
  },
  {
    id: '2',
    name: 'Neural Headset Pro',
    description: 'Immersive VR experience with neural feedback',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400',
    category: 'Electronics',
    rating: 4.6,
    stock: 30,
    tags: ['vr', 'gaming', 'neural'],
    features: ['8K Resolution', 'Haptic Feedback', 'Brain-Computer Interface']
  },
  {
    id: '3',
    name: 'Solar Jacket',
    description: 'Smart jacket with integrated solar panels',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'Fashion',
    rating: 4.4,
    stock: 50,
    tags: ['smart', 'sustainable', 'techwear'],
    features: ['Solar Charging', 'Climate Control', 'LED Display']
  }
];

export const mockUser: User = {
  id: '1',
  email: 'user@hovixy.com',
  name: 'Alex Future',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  isAdmin: false
};