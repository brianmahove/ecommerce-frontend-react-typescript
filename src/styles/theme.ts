// src/styles/theme.ts
export const lightTheme = {
  primary: '#6366F1', // Vibrant Indigo
  secondary: '#EC4899', // Pink Accent
  accent: '#14B8A6', // Teal / Aqua
  background: '#FDFDFE', // Clean Off-White
  surface: '#FFFFFF', // Card / Elevated
  text: '#1E293B', // Deep Slate
  textSecondary: '#64748B', // Muted Slate
  border: '#E2E8F0', // Soft Gray
  shadow: '0 8px 20px rgba(99, 102, 241, 0.15)',
  gradient: 'linear-gradient(135deg, #6366F1 0%, #EC4899 50%, #14B8A6 100%)',
  glass: 'rgba(255, 255, 255, 0.35)', // Softer frosted glass
  neon: '0 0 12px rgba(99, 102, 241, 0.6)',
};

export const darkTheme = {
  primary: '#A5B4FC', // Softer Indigo
  secondary: '#F472B6', // Warm Pink Glow
  accent: '#2DD4BF', // Bright Aqua
  background: '#0F172A', // Deep Navy
  surface: '#1E293B', // Card Surface
  text: '#F1F5F9', // Soft White
  textSecondary: '#94A3B8', // Muted Gray
  border: '#334155', // Subtle Divider
  shadow: '0 8px 20px rgba(0, 0, 0, 0.6)',
  gradient: 'linear-gradient(135deg, #A5B4FC 0%, #F472B6 50%, #2DD4BF 100%)',
  glass: 'rgba(30, 41, 59, 0.4)', // Dark frosted glass
  neon: '0 0 16px rgba(165, 180, 252, 0.8)',
};

export type Theme = typeof lightTheme;
