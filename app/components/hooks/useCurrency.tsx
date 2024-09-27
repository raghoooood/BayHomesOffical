// app/components/hooks/useCurrency.tsx

'use client'

import { useState, useContext, createContext, ReactNode } from 'react';

type CurrencyContextType = {
  selectedCurrency: string;
  setSelectedCurrency: (currency: string) => void;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [selectedCurrency, setSelectedCurrency] = useState('AED'); // Default currency

  const value = {
    selectedCurrency,
    setSelectedCurrency,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
