// src/components/Cart/CartSidebar.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import { toggleCart, removeFromCart, updateQuantity } from '../../store/slices/cartSlice';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 1000;
`;

const Sidebar = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  max-width: 400px;
  background: ${props => props.theme.surface};
  border-left: 1px solid ${props => props.theme.border};
  z-index: 1001;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    max-width: 100%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid ${props => props.theme.border};
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.background};
  }
`;

const Content = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

const EmptyCart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: ${props => props.theme.textSecondary};
  text-align: center;
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background: ${props => props.theme.background};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
`;

const ItemImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemName = styled.div`
  font-weight: 600;
  font-size: 0.9rem;
`;

const ItemPrice = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 600;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  color: ${props => props.theme.text};
  width: 28px;
  height: 28px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${props => props.theme.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;

const Footer = styled.div`
  padding: 1.5rem;
  border-top: 1px solid ${props => props.theme.border};
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
`;

const CheckoutButton = styled(motion.button)`
  width: 100%;
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1rem;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.neon};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

export const CartSidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: cartItems, isOpen } = useSelector((state: RootState) => state.cart);
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);

  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleRemoveItem = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login');
      handleClose();
      return;
    }
    navigate('/checkout');
    handleClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <Overlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <Sidebar
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: 'spring', damping: 30 }}
          >
            <Header>
              <Title>
                <ShoppingBag size={24} />
                Your Cart ({cartItems.length})
              </Title>
              <CloseButton onClick={handleClose}>
                <X size={20} />
              </CloseButton>
            </Header>

            <Content>
              {cartItems.length === 0 ? (
                <EmptyCart>
                  <ShoppingBag size={64} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                  <h3>Your cart is empty</h3>
                  <p>Add some products to get started</p>
                </EmptyCart>
              ) : (
                <CartItems>
                  {cartItems.map((item) => (
                    <CartItem key={item.product.id}>
                      <ItemImage src={item.product.image} alt={item.product.name} />
                      <ItemDetails>
                        <ItemName>{item.product.name}</ItemName>
                        <ItemPrice>${item.product.price}</ItemPrice>
                        <QuantityControls>
                          <QuantityButton
                            onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </QuantityButton>
                          <span>{item.quantity}</span>
                          <QuantityButton
                            onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          >
                            <Plus size={14} />
                          </QuantityButton>
                        </QuantityControls>
                      </ItemDetails>
                      <RemoveButton onClick={() => handleRemoveItem(item.product.id)}>
                        <X size={16} />
                      </RemoveButton>
                    </CartItem>
                  ))}
                </CartItems>
              )}
            </Content>

            {cartItems.length > 0 && (
              <Footer>
                <Total>
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </Total>
                <CheckoutButton
                  onClick={handleCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Proceed to Checkout
                </CheckoutButton>
              </Footer>
            )}
          </Sidebar>
        </>
      )}
    </AnimatePresence>
  );
};