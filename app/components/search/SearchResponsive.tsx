'use client'
import React, { useEffect, useState } from 'react';
import filterOptions from '@/utils/filterOptions';
import Button from '../buttons/Button';
import { useRouter } from 'next/navigation';
import { MdClose } from 'react-icons/md';
import { convertCurrency } from '@/lib/utils';
import { useCurrency } from '../hooks/useCurrency';

export interface SearchResponsiveProps {
  filters: {
    purpose: string;
    areas: string[];
    propertyType: string;
    bedsMin: number;
    bedsMax: number;
    priceMin: number;
    priceMax: number;
    currency: string;
  };
  rawPriceMin : number;
rawPriceMax: number;
setRawPrices: {
  setRawPriceMin: (price: number) => void;
  setRawPriceMax: (price: number) => void;
};
  handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
  searchText: string;
  setSearchText: (text: string) => void;
  filteredAreas: Array<{ _id: string; areaName: string }>;
  handleAreaSelect: (areaName: string) => void;
  handleSearch: () => void; // Ensure this is defined in the props
  defaultPurpose?: string;
  handlePriceChange: (min: number, max: number) => void; // New prop for price change handler
  selectedCurrency: string;
  exchangeRates: Record<string, number>;
}

const SearchResponsive: React.FC<SearchResponsiveProps> = ({
  filters,
  handleFilterChange,
  searchText,
  setSearchText,
  filteredAreas,
  handleAreaSelect,
  handleSearch, // This is the prop from parent
  defaultPurpose = '',
  rawPriceMax,
  rawPriceMin,
  setRawPrices,
  handlePriceChange,
  selectedCurrency,
  exchangeRates,
}) => {
  const [showFilterOverlay, setShowFilterOverlay] = React.useState(false);

  const toggleFilterOverlay = () => {
    setShowFilterOverlay(prev => !prev);
  };

  const [localfilters, setLocalFilters] = useState({
    priceMin: 0,
    priceMax: 0,
  });



  useEffect(() => {
    const convertedMin = convertCurrency(rawPriceMin, selectedCurrency, 'AED', exchangeRates);
    const convertedMax = convertCurrency(rawPriceMax, selectedCurrency, 'AED', exchangeRates);

    setLocalFilters(prevFilters => ({
      ...prevFilters,
      priceMin: Number(convertedMin),
      priceMax: Number(convertedMax),
    }));
  }, [rawPriceMin, rawPriceMax, selectedCurrency, exchangeRates]);

  // Handle input changes
  const handleMinPriceChange = (e : any) => {
    const value = e.target.value;
    setRawPrices.setRawPriceMin(value);
  };

  const handleMaxPriceChange = (e : any) => {
    const value = e.target.value;
    setRawPrices.setRawPriceMax(value);
  };
  const handleAreaRemove = (areaName: string) => {
    const newAreas = filters.areas.filter(area => area !== areaName);
    handleFilterChange({ target: { name: 'areas', value: newAreas } } as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  const handleClearFilters = () => {
    // Reset parent filter state instead of using local state
    handleFilterChange({
      target: { name: 'reset', value: '' }, // Customize the reset behavior if needed
    } as React.ChangeEvent<HTMLSelectElement>);
  };



  return (
    <div className="md:hidden flex flex-col space-y-3 mb-5">
      <div className="flex justify-between items-center p-2 bg-white rounded-lg">
        <select
          name="purpose"
          onChange={handleFilterChange}
          className="p-1 w-full dark:bg-white dark:text-gray-500"
          value={filters.purpose}
        >
          {filterOptions.purpose.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        name="area"
        placeholder="Area or Community"
        onChange={e => setSearchText(e.target.value)}
        className="p-2 w-full bg-white rounded-lg dark:text-black"
        value={searchText}
      />
      {filteredAreas.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1 max-h-40 overflow-y-auto">
          {filteredAreas.map(area => (
            <li
              key={area._id}
              className="p-2 hover:bg-gray-200 cursor-pointer dark:text-black"
              onClick={() => handleAreaSelect(area.areaName)}
            >
              {area.areaName}
            </li>
          ))}
        </ul>
      )}
      {filters.areas.length > 0 && (
        <div className="bg-gray-200 p-2 rounded-lg flex items-center">
          {filters.areas.map((area, index) => (
            <div key={area} className="flex items-center">
              <span>{area}</span>
              <button
                type="button"
                className="ml-2 text-red-500"
                onClick={() => handleAreaRemove(area)}
                aria-label={`Remove ${area}`}
              >
                ×
              </button>
            </div>
          ))}
          {filters.areas.length > 1 && (
            <span className="ml-1 text-gray-500">
              {` +${filters.areas.length - 1} more`}
            </span>
          )}
        </div>
      )}
      <div className="flex flex-row space-x-2">
        <Button label="Search" onClick={handleSearch} /> {/* Trigger search from props */}
        <Button label="Filter" onClick={toggleFilterOverlay} />
      </div>

      {showFilterOverlay && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-80 flex flex-col items-center p-4 z-50">
          <div className="bg-white text-black p-6 rounded-lg space-y-4 w-full max-w-md">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Filters</h2>
              <button onClick={toggleFilterOverlay} className="text-black">
                <MdClose size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <select
                name="propertyType"
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded w-full"
                value={filters.propertyType}
              >
                {filterOptions.propertyType.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-col space-y-2">
                <label htmlFor="priceMin">Min Price</label>
                <input
                  type="number"
                  id="priceMin"
                  name="priceMin"
                  value={rawPriceMin}
                  onChange={handleMinPriceChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter minimum price"
                />
                <label htmlFor="priceMax">Max Price</label>
                <input
                  type="number"
                  id="priceMax"
                  name="priceMax"
                  value={rawPriceMax}
                   onChange={handleMaxPriceChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter maximum price"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="bedsMin">Min Beds</label>
                <input
                  type="number"
                  id="bedsMin"
                  name="bedsMin"
                  value={filters.bedsMin}
                  onChange={handleFilterChange} 
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter minimum beds"
                />
                <label htmlFor="bedsMax">Max Beds</label>
                <input
                  type="number"
                  id="bedsMax"
                  name="bedsMax"
                  value={filters.bedsMax}
                  onChange={handleFilterChange} 
                  className="p-2 border border-gray-300 rounded w-full"
                  placeholder="Enter maximum beds"
                />
              </div>
            </div>
            <div className="flex flex-col space-y-2">
            <Button label="Clear Filters" onClick={handleClearFilters} />
            <Button label="Apply" onClick={() => { handleSearch(); toggleFilterOverlay(); }} />
        </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResponsive;
