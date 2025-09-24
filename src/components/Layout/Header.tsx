// src/components/Layout/Header.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '../../store';
import { toggleCart } from '../../store/slices/cartSlice';
import { useAuth } from '../../hooks/useAuth';
import { ShoppingCart, User, Menu, Moon, Sun, X } from 'lucide-react';

const HeaderContainer = styled.header`
  background: ${props => props.theme.surface};
  border-bottom: 1px solid ${props => props.theme.border};
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Nav = styled.nav`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  text-decoration: none;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const IconButton = styled(motion.button)`
  background: none;
  border: none;
  color: ${props => props.theme.text};
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.theme.background};
    transform: scale(1.1);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: ${props => props.theme.primary};
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${props => props.theme.surface};
  z-index: 1000;
  padding: 2rem;
  display: none;
  flex-direction: column;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const MobileMenuHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const MobileNavItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const MobileNavItem = styled(Link)`
  padding: 1rem;
  background: ${props => props.theme.background};
  border-radius: 12px;
  text-decoration: none;
  color: ${props => props.theme.text};
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(10px);
  }
`;

interface HeaderProps {
  toggleTheme: () => void;
  currentTheme: 'light' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ toggleTheme, currentTheme }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, signOut } = useAuth();
  const { items: cartItems } = useSelector((state: RootState) => state.cart);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <HeaderContainer>
        <Nav>
          <Logo to="/">Hovixy</Logo>

          <NavItems>
            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
            >
              {currentTheme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </IconButton>

            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => dispatch(toggleCart())}
            >
              <ShoppingCart size={20} />
              {cartItemsCount > 0 && <CartBadge>{cartItemsCount}</CartBadge>}
            </IconButton>

            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={signOut}
            >
              <User size={20} />
            </IconButton>

            <IconButton
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileMenu(true)}
              style={{ display: 'none' }}
              className="mobile-menu-button"
            >
              <Menu size={20} />
            </IconButton>
          </NavItems>
        </Nav>
      </HeaderContainer>

      <AnimatePresence>
        {showMobileMenu && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30 }}
          >
            <MobileMenuHeader>
              <Logo to="/" onClick={() => setShowMobileMenu(false)}>Hovixy</Logo>
              <IconButton onClick={() => setShowMobileMenu(false)}>
                <X size={24} />
              </IconButton>
            </MobileMenuHeader>

            <MobileNavItems>
              <MobileNavItem to="/" onClick={() => setShowMobileMenu(false)}>
                Home
              </MobileNavItem>
              <MobileNavItem to="/products" onClick={() => setShowMobileMenu(false)}>
                All Products
              </MobileNavItem>
              {isAuthenticated ? (
                <>
                  <MobileNavItem to="/profile" onClick={() => setShowMobileMenu(false)}>
                    Profile
                  </MobileNavItem>
                  <MobileNavItem to="/orders" onClick={() => setShowMobileMenu(false)}>
                    Orders
                  </MobileNavItem>
                </>
              ) : (
                <MobileNavItem to="/login" onClick={() => setShowMobileMenu(false)}>
                  Sign In
                </MobileNavItem>
              )}
            </MobileNavItems>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};