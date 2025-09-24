// src/pages/Checkout.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../store';
import { clearCart } from '../store/slices/cartSlice';
import { CreditCard, Lock, CheckCircle, Truck, Shield } from 'lucide-react';

const Container = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 80vh;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormSection = styled.div`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
`;

const SummarySection = styled.div`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 2rem;
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: ${props => props.theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  background: ${props => props.theme.background};
  color: ${props => props.theme.text};
  font-size: 1rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.primary}20;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${props => props.theme.border};

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
`;

const ItemPrice = styled.div`
  color: ${props => props.theme.primary};
  font-weight: 600;
`;

const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-top: 1px solid ${props => props.theme.border};
  font-weight: 600;
  font-size: 1.1rem;

  &.grand-total {
    border-top: 2px solid ${props => props.theme.primary};
    font-size: 1.25rem;
    color: ${props => props.theme.primary};
  }
`;

const PayButton = styled(motion.button)`
  width: 100%;
  background: ${props => props.theme.gradient};
  color: white;
  border: none;
  padding: 1.25rem;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.neon};
  }
`;

const SecurityBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  color: ${props => props.theme.textSecondary};
  font-size: 0.875rem;
`;

const SuccessModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 20px;
  padding: 3rem;
  text-align: center;
  z-index: 1000;
  max-width: 400px;
  width: 90%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 999;
`;

export const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const subtotal = cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccess(true);
      dispatch(clearCart());
    }, 2000);
  };

  const handleContinueShopping = () => {
    setShowSuccess(false);
    navigate('/');
  };

  if (cartItems.length === 0 && !showSuccess) {
    return (
      <Container>
        <Title>Your cart is empty</Title>
        <motion.button
          onClick={() => navigate('/')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: 'var(--gradient)',
            color: 'white',
            border: 'none',
            padding: '1rem 2rem',
            borderRadius: '12px',
            cursor: 'pointer',
            display: 'block',
            margin: '0 auto',
          }}
        >
          Continue Shopping
        </motion.button>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Checkout</Title>
      
      <CheckoutGrid>
        <FormSection>
          <SectionTitle>
            <CreditCard size={24} />
            Payment Information
          </SectionTitle>
          
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <Row>
              <FormGroup>
                <Label>First Name</Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Last Name</Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <Row>
              <FormGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>ZIP Code</Label>
                <Input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Row>

            <FormGroup>
              <Label>Card Number</Label>
              <Input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={handleInputChange}
                required
              />
            </FormGroup>

            <Row>
              <FormGroup>
                <Label>Expiry Date</Label>
                <Input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>CVV</Label>
                <Input
                  type="text"
                  name="cvv"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </Row>
          </form>
        </FormSection>

        <SummarySection>
          <SectionTitle>
            <Truck size={24} />
            Order Summary
          </SectionTitle>

          {cartItems.map((item) => (
            <CartItem key={item.product.id}>
              <ItemImage src={item.product.image} alt={item.product.name} />
              <ItemDetails>
                <ItemName>{item.product.name}</ItemName>
                <div>Qty: {item.quantity}</div>
              </ItemDetails>
              <ItemPrice>${(item.product.price * item.quantity).toFixed(2)}</ItemPrice>
            </CartItem>
          ))}

          <TotalRow>
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </TotalRow>
          <TotalRow>
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
          </TotalRow>
          <TotalRow>
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </TotalRow>
          <TotalRow className="grand-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </TotalRow>

          <PayButton
            onClick={handleSubmit}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Lock size={20} />
            Pay Now
          </PayButton>

          <SecurityBadge>
            <Shield size={16} />
            Secure SSL Encryption
          </SecurityBadge>
        </SummarySection>
      </CheckoutGrid>

      <AnimatePresence>
        {showSuccess && (
          <>
            <Overlay
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <SuccessModal
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1rem' }} />
              <h2>Payment Successful!</h2>
              <p>Your order has been confirmed and will be shipped soon.</p>
              <motion.button
                onClick={handleContinueShopping}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  background: 'var(--gradient)',
                  color: 'white',
                  border: 'none',
                  padding: '1rem 2rem',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  marginTop: '2rem',
                  width: '100%',
                }}
              >
                Continue Shopping
              </motion.button>
            </SuccessModal>
          </>
        )}
      </AnimatePresence>
    </Container>
  );
};