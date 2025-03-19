import React, { createContext, useContext, useState } from 'react';

const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
  const [compareProducts, setCompareProducts] = useState([]);

  const addToCompare = (product) => {
    if (compareProducts.length < 4 && !compareProducts.some(p => p.id === product.id)) {
      setCompareProducts([...compareProducts, product]);
    }
  };

  const removeFromCompare = (productId) => {
    setCompareProducts(compareProducts.filter(p => p.id !== productId));
  };

  return (
    <CompareContext.Provider value={{ compareProducts, addToCompare, removeFromCompare }}>
      {children}
    </CompareContext.Provider>
  );
};

export const useCompareProducts = () => {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompareProducts must be used within a CompareProvider');
  }
  return context;
};