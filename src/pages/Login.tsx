// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { login } from '../store/slices/userSlice';
import { User } from '../types';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus, Sparkles } from 'lucide-react';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.theme.background};
  position: relative;
  overflow: hidden;
`;

const BackgroundEffects = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
`;

const FloatingOrb = styled(motion.div)`
  position: absolute;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: ${props => props.theme.gradient};
  filter: blur(60px);
  opacity: 0.1;
`;

const LoginCard = styled(motion.div)`
  background: ${props => props.theme.surface};
  border: 1px solid ${props => props.theme.border};
  border-radius: 24px;
  padding: 3rem;
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
  backdrop-filter: blur(10px);
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
  background: ${props => props.theme.gradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.p`
  color: ${props => props.theme.textSecondary};
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
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

  &::placeholder {
    color: ${props => props.theme.textSecondary};
  }
`;

const Icon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${props => props.theme.textSecondary};
`;

const ToggleVisibility = styled.button`
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: ${props => props.theme.textSecondary};
  cursor: pointer;
  padding: 0.25rem;
`;

const SubmitButton = styled(motion.button)`
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
  margin-top: 1rem;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.neon};
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  color: ${props => props.theme.textSecondary};

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: ${props => props.theme.border};
  }

  span {
    padding: 0 1rem;
  }
`;

const SwitchAuth = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: ${props => props.theme.textSecondary};
`;

const AuthLink = styled(Link)`
  color: ${props => props.theme.primary};
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const DemoNote = styled.div`
  background: ${props => props.theme.glass};
  border: 1px solid ${props => props.theme.border};
  border-radius: 12px;
  padding: 1rem;
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: ${props => props.theme.textSecondary};
`;

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock user data for demo
    const mockUser: User = {
      id: '1',
      email: formData.email,
      name: formData.name || 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isAdmin: false,
    };

    dispatch(login(mockUser));
    navigate('/');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDemoLogin = () => {
    const mockUser: User = {
      id: '1',
      email: 'demo@hovixy.com',
      name: 'Demo User',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      isAdmin: false,
    };

    dispatch(login(mockUser));
    navigate('/');
  };

  return (
    <Container>
      <BackgroundEffects>
        <FloatingOrb
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ top: '10%', left: '10%' }}
        />
        <FloatingOrb
          animate={{
            x: [0, -150, 0],
            y: [0, 150, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ bottom: '10%', right: '10%' }}
        />
      </BackgroundEffects>

      <LoginCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>
          <Sparkles size={32} style={{ display: 'block', margin: '0 auto 1rem' }} />
          {isLogin ? 'Welcome Back' : 'Join Hovixy'}
        </Title>
        <Subtitle>
          {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          {!isLogin && (
            <InputGroup>
              <Icon>
                <UserPlus size={20} />
              </Icon>
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                required={!isLogin}
              />
            </InputGroup>
          )}

          <InputGroup>
            <Icon>
              <Mail size={20} />
            </Icon>
            <Input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </InputGroup>

          <InputGroup>
            <Icon>
              <Lock size={20} />
            </Icon>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <ToggleVisibility
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </ToggleVisibility>
          </InputGroup>

          <SubmitButton
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <LogIn size={20} />
            {isLogin ? 'Sign In' : 'Create Account'}
          </SubmitButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SubmitButton
          onClick={handleDemoLogin}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{ background: 'var(--surface)', color: 'var(--text)' }}
        >
          Try Demo Version
        </SubmitButton>

        <SwitchAuth>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <AuthLink to="#" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign up' : 'Sign in'}
          </AuthLink>
        </SwitchAuth>

        <DemoNote>
          This is a demo app. No real authentication required.
        </DemoNote>
      </LoginCard>
    </Container>
  );
};