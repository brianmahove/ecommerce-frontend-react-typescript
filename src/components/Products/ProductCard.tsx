// src/components/Products/ProductCard.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { Product } from '../../types';
import { addToCart } from '../../store/slices/cartSlice';
import { Star, ShoppingCart } from 'lucide-react';

const Card = styled(motion.div)`
  background: ${props => props.theme.surface};
  border-radius: 20px;
  padding: 1.5rem;
  border: 1px solid ${props => props.theme.border};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    box-shadow: ${props => props.theme.shadow}, ${props => props.theme.neon};
    border-color: ${props => props.theme.primary};
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const ProductName = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: ${props => props.theme.text};
`;

const ProductDescription = styled.p`
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
  margin-bottom: 1rem;
  line-height: 1.4;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: ${props => props.theme.textSecondary};
  text-decoration: line-through;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 1rem;
`;

const AddButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: ${props => props.theme.neon};
  }
`;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <ProductImage src={product.image} alt={product.name} />
      
      <ProductName>{product.name}</ProductName>
      <ProductDescription>{product.description}</ProductDescription>
      
      <Rating>
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
            color="#fbbf24"
          />
        ))}
        <span>({product.rating})</span>
      </Rating>
      
      <PriceContainer>
        <CurrentPrice>${product.price}</CurrentPrice>
        {product.originalPrice && (
          <OriginalPrice>${product.originalPrice}</OriginalPrice>
        )}
      </PriceContainer>
      
      <AddButton
        onClick={handleAddToCart}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <ShoppingCart size={18} />
        Add to Cart
      </AddButton>
    </Card>
  );
};