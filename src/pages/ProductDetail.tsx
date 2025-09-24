// src/pages/ProductDetail.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { RootState } from '../store';
import { addToCart } from '../store/slices/cartSlice';
import { Product } from '../types';
import { Star, ShoppingCart, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const BackButton = styled(motion.button)`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateX(-5px);
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const ProductImage = styled(motion.img)`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  border: 1px solid ${props => props.theme.border};
`;

const ImageActions = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)`
  background: ${props => props.theme.glass};
  backdrop-filter: blur(10px);
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const RatingStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const CurrentPrice = styled.span`
  font-size: 2.5rem;
  font-weight: 700;
  color: ${props => props.theme.primary};
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: ${props => props.theme.textSecondary};
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: ${props => props.theme.gradient};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
`;

const Description = styled.p`
  color: ${props => props.theme.textSecondary};
  line-height: 1.6;
  font-size: 1.1rem;
`;

const FeaturesList = styled.ul`
  display: grid;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: ${props => props.theme.textSecondary};

  &::before {
    content: '▸';
    color: ${props => props.theme.primary};
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin: 1rem 0;
`;

const QuantityButton = styled.button`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
`;

const AddToCartButton = styled(motion.button)`
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.neon};
  }
`;

const BuyNowButton = styled(motion.button)`
  background: transparent;
  color: ${props => props.theme.primary};
  border: 2px solid ${props => props.theme.primary};
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.primary};
    color: white;
    transform: translateY(-2px);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 2rem 0;
`;

const FeatureCard = styled.div`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  padding: 1.5rem;
  border-radius: 12px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.items);
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const foundProduct = products.find(p => p.id === id);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return (
      <Container>
        <div>Product not found</div>
      </Container>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Container>
      <BackButton
        onClick={() => navigate(-1)}
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft size={20} />
        Back to Products
      </BackButton>

      <ProductContainer>
        <ImageSection>
          <ProductImage
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <ImageActions>
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsFavorite(!isFavorite)}
            >
              <Heart 
                size={20} 
                fill={isFavorite ? '#ef4444' : 'none'} 
                color={isFavorite ? '#ef4444' : 'currentColor'} 
              />
            </ActionButton>
            <ActionButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Share2 size={20} />
            </ActionButton>
          </ImageActions>
        </ImageSection>

        <InfoSection>
          <ProductTitle>{product.name}</ProductTitle>
          
          <ProductRating>
            <RatingStars>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  fill={i < Math.floor(product.rating) ? '#fbbf24' : 'none'}
                  color="#fbbf24"
                />
              ))}
            </RatingStars>
            <span>({product.rating} • {product.stock} in stock)</span>
          </ProductRating>

          <PriceContainer>
            <CurrentPrice>${product.price}</CurrentPrice>
            {product.originalPrice && (
              <>
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
                <DiscountBadge>-{discount}%</DiscountBadge>
              </>
            )}
          </PriceContainer>

          <Description>{product.description}</Description>

          <FeaturesList>
            {product.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>

          <QuantitySelector>
            <span>Quantity:</span>
            <QuantityButton 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </QuantityButton>
            <QuantityDisplay>{quantity}</QuantityDisplay>
            <QuantityButton 
              onClick={() => setQuantity(quantity + 1)}
              disabled={quantity >= product.stock}
            >
              +
            </QuantityButton>
          </QuantitySelector>

          <ActionButtons>
            <AddToCartButton
              onClick={handleAddToCart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </AddToCartButton>
            <BuyNowButton
              onClick={handleBuyNow}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Buy Now
            </BuyNowButton>
          </ActionButtons>

          <FeaturesGrid>
            <FeatureCard>
              <Truck size={32} color="#06b6d4" />
              <h4>Free Shipping</h4>
              <p>Delivery in 2-3 days</p>
            </FeatureCard>
            <FeatureCard>
              <Shield size={32} color="#10b981" />
              <h4>2-Year Warranty</h4>
              <p>Full protection</p>
            </FeatureCard>
            <FeatureCard>
              <RotateCcw size={32} color="#f59e0b" />
              <h4>30-Day Returns</h4>
              <p>No questions asked</p>
            </FeatureCard>
          </FeaturesGrid>
        </InfoSection>
      </ProductContainer>
    </Container>
  );
};