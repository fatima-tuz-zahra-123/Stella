import React, { useState } from 'react';
import { ThemeContext } from './ThemeContext';

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // Default to dark for space theme

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const colors = {
    dark: {
      background: '#000000',
      surface: '#1a1a1a',
      text: '#FFFFFF',
      textSecondary: '#CCCCCC',
      primary: '#9333EA', // Purple
      primaryDark: '#7C3AED',
      border: '#333333',
      input: '#1a1a1a',
      card: '#1a1a1a',
    },
    light: {
      background: '#F5F5F5',
      surface: '#FFFFFF',
      text: '#000000',
      textSecondary: '#666666',
      primary: '#9333EA',
      primaryDark: '#7C3AED',
      border: '#E0E0E0',
      input: '#FFFFFF',
      card: '#FFFFFF',
    },
  };

  const currentColors = colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors: currentColors, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
};

