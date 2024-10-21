'use client';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ThemeContextType {
  isDarkTheme: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Check if we're in the browser and sync theme from sessionStorage after mounting
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = sessionStorage.getItem('isDarkTheme');
    if (savedTheme) {
      setIsDarkTheme(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      sessionStorage.setItem('isDarkTheme', JSON.stringify(isDarkTheme));
    }
  }, [isDarkTheme, isMounted]);

  const toggleTheme = () => {
    setIsDarkTheme((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
