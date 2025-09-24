
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Github, Mail } from 'lucide-react';

const FooterContainer = styled.footer`
  background: ${props => props.theme.surface};
  border-top: 1px solid ${props => props.theme.border};
  margin-top: 4rem;
  padding: 3rem 2rem 2rem;
`; 

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FooterTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const FooterLink = styled(Link)`
  color: ${props => props.theme.textSecondary};
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    color: ${props => props.theme.primary};
    transform: translateX(5px);
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: ${props => props.theme.textSecondary};
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 8px;
  background: ${props => props.theme.background};

  &:hover {
    color: ${props => props.theme.primary};
    transform: translateY(-2px);
  }
`;

const FooterBottom = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid ${props => props.theme.border};
  text-align: center;
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterTitle>Hovixy</FooterTitle>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            The future of eCommerce is here. Experience next-generation shopping with cutting-edge technology and futuristic design.
          </p>
          <SocialLinks>
            <SocialLink href="https://www.facebook.com/brianmahove"><Facebook size={20} /></SocialLink>
            <SocialLink href="https://www.tiktok.com/@arte_de_bryn"><Twitter size={20} /></SocialLink>
            <SocialLink href="https://www.instagram.com/brianmahove/"><Instagram size={20} /></SocialLink>
            <SocialLink href="https://github.com/brianmahove"><Github size={20} /></SocialLink>
            <SocialLink href="mahovebrian@gmail.com"><Mail size={20} /></SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Quick Links</FooterTitle>
          <FooterLink to="/">Home</FooterLink>
          <FooterLink to="/products">Products</FooterLink>
          <FooterLink to="/categories">Categories</FooterLink>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/contact">Contact</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Customer Service</FooterTitle>
          <FooterLink to="/help">Help Center</FooterLink>
          <FooterLink to="/shipping">Shipping Info</FooterLink>
          <FooterLink to="/returns">Returns</FooterLink>
          <FooterLink to="/warranty">Warranty</FooterLink>
          <FooterLink to="/support">Support</FooterLink>
        </FooterSection>

        <FooterSection>
          <FooterTitle>Contact Info</FooterTitle>
          <p style={{ color: 'var(--text-secondary)' }}>Email: mahovebrian@gmail.com</p>
          <p style={{ color: 'var(--text-secondary)' }}>Phone: +263 778 686 550</p>
          <p style={{ color: 'var(--text-secondary)' }}>Address: 123 Harare Street, Vizion City</p>
        </FooterSection>
      </FooterContent>

      <FooterBottom>
        <p>&copy; 2025 Hovixy. All rights reserved. Built with cutting-edge technology by Vizion.</p>
      </FooterBottom>
    </FooterContainer>
  );
};