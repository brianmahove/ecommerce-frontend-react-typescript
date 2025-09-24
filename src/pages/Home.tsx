// src/pages/Home.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../store/slices/cartSlice';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  text-align: center;
  margin-bottom: 3rem;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem 0;
`;

const ProductCard = styled.div`
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 20px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    border-color: #6366f1;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 15px rgba(99, 102, 241, 0.7);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  border-radius: 12px;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 3rem;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f1f5f9;
`;

const ProductDescription = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 1rem;
`;

const AddButton = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  font-size: 0.9rem;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.7);
  }

  &:active {
    transform: scale(0.95);
  }
`;

// Mock products data
const mockProducts = [
  {
    id: '1',
    name: 'Quantum Laptop X1',
    description: 'Next-gen computing with quantum processing capabilities. Experience lightning-fast performance with neural interface support.',
    price: 2999.99,
    originalPrice: 3499.99,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    category: 'Electronics',
    rating: 4.8,
    stock: 15,
    tags: ['quantum', 'laptop', 'premium'],
    features: ['Quantum CPU', 'Holographic Display', 'Neural Interface'],
    emoji: '💻'
  },
  {
    id: '2',
    name: 'Neural Headset Pro',
    description: 'Immersive VR experience with neural feedback. Feel the future of gaming and virtual reality.',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=400',
    category: 'Electronics',
    rating: 4.6,
    stock: 30,
    tags: ['vr', 'gaming', 'neural'],
    features: ['8K Resolution', 'Haptic Feedback', 'Brain-Computer Interface'],
    emoji: '🎧'
  },
  {
    id: '3',
    name: 'Solar Jacket',
    description: 'Smart jacket with integrated solar panels. Stay connected and powered wherever you go.',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    category: 'Fashion',
    rating: 4.4,
    stock: 50,
    tags: ['smart', 'sustainable', 'techwear'],
    features: ['Solar Charging', 'Climate Control', 'LED Display'],
    emoji: '🧥'
  },
  {
    id: '4',
    name: 'Holographic Watch',
    description: 'Timepiece with holographic display and health monitoring. Your personal health companion.',
    price: 599.99,
    originalPrice: 699.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    category: 'Electronics',
    rating: 4.7,
    stock: 25,
    tags: ['smartwatch', 'health', 'premium'],
    features: ['Holographic Display', 'Health Monitoring', 'Solar Powered'],
    emoji: '⌚'
  },
  {
    id: '5',
    name: 'Gravity Boots',
    description: 'Anti-gravity footwear for enhanced mobility. Experience walking on air.',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    category: 'Fashion',
    rating: 4.9,
    stock: 10,
    tags: ['futuristic', 'mobility', 'tech'],
    features: ['Anti-Gravity Tech', 'Adaptive Cushioning', 'Self-Cleaning'],
    emoji: '👟'
  },
  {
    id: '6',
    name: 'Neural Implant Kit',
    description: 'DIY neural interface for cognitive enhancement. Upgrade your mind, upgrade your life.',
    price: 1999.99,
    originalPrice: 2499.99,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    category: 'Electronics',
    rating: 4.5,
    stock: 5,
    tags: ['neural', 'enhancement', 'advanced'],
    features: ['Cognitive Boost', 'Memory Enhancement', 'Neural Connectivity'],
    emoji: '🧠'
  }
];

export const Home: React.FC = () => {
  const dispatch = useDispatch();

  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
    // Optional: Add a small animation feedback
    console.log(`Added ${product.name} to cart!`);
  };

  return (
    <Container>
      <Title>Hovixy Marketplace</Title>
      <Subtitle>Discover the future of shopping</Subtitle>
      
      <ProductGrid>
        {mockProducts.map(product => (
          <ProductCard key={product.id}>
            <ProductImage>
              {product.emoji}
            </ProductImage>
            <ProductName>{product.name}</ProductName>
            <ProductDescription>{product.description}</ProductDescription>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Price>${product.price}</Price>
              {product.originalPrice && (
                <span style={{ 
                  color: '#94a3b8', 
                  textDecoration: 'line-through',
                  fontSize: '1rem'
                }}>
                  ${product.originalPrice}
                </span>
              )}
              {product.originalPrice && (
                <span style={{
                  background: '#10b981',
                  color: 'white',
                  padding: '0.25rem 0.5rem',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  Save ${(product.originalPrice - product.price).toFixed(0)}
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '1rem' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: i < Math.floor(product.rating) ? '#fbbf24' : '#374151' }}>
                  ★
                </span>
              ))}
              <span style={{ color: '#94a3b8', fontSize: '0.875rem', marginLeft: '0.5rem' }}>
                ({product.rating})
              </span>
            </div>

            <AddButton onClick={() => handleAddToCart(product)}>
              Add to Cart
            </AddButton>
          </ProductCard>
        ))}
      </ProductGrid>
    </Container>
  );
};