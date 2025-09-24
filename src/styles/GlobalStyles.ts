// src/styles/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    background: ${props => props.theme.background};
    color: ${props => props.theme.text};
    transition: all 0.3s ease;
    overflow-x: hidden;
  }

  .glass-effect {
    background: ${props => props.theme.glass};
    backdrop-filter: blur(10px);
    border: 1px solid ${props => props.theme.border};
  }

  .neon-glow {
    box-shadow: ${props => props.theme.neon};
  }

  .gradient-text {
    background: ${props => props.theme.gradient};
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;