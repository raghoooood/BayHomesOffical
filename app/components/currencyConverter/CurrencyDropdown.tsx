'use client'

import { useState, createContext, ReactNode } from 'react';
import { useCurrency } from '../hooks/useCurrency';


export default function CurrencyDropdown() {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);

  const currencies = ['AED', 'EUR', 'GBP', 'USD'];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectCurrency = (currency: string) => {
    setSelectedCurrency(currency);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"  
          className="inline-flex justify-center w-full px-4 py-2  text-md font-medium "
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedCurrency}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-bgDark ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            {currencies.map((currency) => (
              <button
                key={currency}
                className="text-gray-700 dark:text-white block px-4 py-2 text-sm w-full text-left hover:bg-gray-100 "
                role="menuitem"
                tabIndex={-1}
                id={`menu-item-${currency}`}
                onClick={() => selectCurrency(currency)}
              >
                {currency}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
