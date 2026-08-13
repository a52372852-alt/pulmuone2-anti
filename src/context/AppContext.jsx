import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_SCHOOLS } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Current active page tab ('home', 'weekly', 'community', 'nutrition', 'kitchen', 'search')
  const [currentPage, setCurrentPage] = useState('home');

  // Active Selected School
  const [selectedSchool, setSelectedSchool] = useState(() => {
    const saved = localStorage.getItem('geupsik_school');
    return saved ? JSON.parse(saved) : SAMPLE_SCHOOLS[0];
  });

  // User My Allergies (array of allergy IDs e.g. [1, 2, 6])
  const [myAllergies, setMyAllergies] = useState(() => {
    const saved = localStorage.getItem('geupsik_allergies');
    return saved ? JSON.parse(saved) : [2, 6, 10]; // 기본 알레르기 (우유, 밀, 돼지고기 예시)
  });

  // Dark Mode Theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('geupsik_theme') || 'light';
  });

  // Global Product Search Term
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // School Search Modal Open State
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('geupsik_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('geupsik_school', JSON.stringify(selectedSchool));
  }, [selectedSchool]);

  useEffect(() => {
    localStorage.setItem('geupsik_allergies', JSON.stringify(myAllergies));
  }, [myAllergies]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleAllergy = (id) => {
    setMyAllergies(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedSchool,
        setSelectedSchool,
        myAllergies,
        setMyAllergies,
        toggleAllergy,
        theme,
        toggleTheme,
        isSearchOpen,
        setIsSearchOpen,
        globalSearchTerm,
        setGlobalSearchTerm
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

