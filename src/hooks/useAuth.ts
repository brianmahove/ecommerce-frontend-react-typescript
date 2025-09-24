// src/hooks/useAuth.ts
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { login, logout } from '../store/slices/userSlice';
import { User } from '../types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate ? useNavigate() : null; // Safe navigation
  const { user, isAuthenticated } = useSelector((state: RootState) => state.user);

  const signIn = async (email: string, password: string) => {
    try {
      const userName = email.split('@')[0] || 'User';
      
      const mockUser: User = {
        id: '1',
        email,
        name: userName,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        isAdmin: false,
      };

      dispatch(login(mockUser));
      localStorage.setItem('hovixy-user', JSON.stringify(mockUser));
      return { success: true, user: mockUser };
    } catch (error) {
      return { success: false, error: 'Authentication failed' };
    }
  };

  const signOut = async () => {
    try {
      dispatch(logout());
      localStorage.removeItem('hovixy-user');
      if (navigate) {
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const checkAuth = () => {
    const savedUser = localStorage.getItem('hovixy-user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser) as User;
        dispatch(login(userData));
      } catch (error) {
        console.error('Error parsing saved user:', error);
      }
    }
  };

  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
    checkAuth,
  };
};