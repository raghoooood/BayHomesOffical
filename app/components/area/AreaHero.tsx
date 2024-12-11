'use client';
import { filterAminitiesOptions } from '@/utils/areaCardData';
import React, { ChangeEvent } from 'react';
import { FiSearch } from 'react-icons/fi';
import Breadcrumb from '../Breadcrumb';

interface FilterAminityProps {
  aminity: string;
  setAminity: (type: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const AreaHero: React.FC<FilterAminityProps> = ({ aminity, setAminity, searchQuery, setSearchQuery }) => {

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAminity(e.target.value);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const breadcrumbItems = [
    { label: 'communities' },
  ];

  return (
    <div className="py-8 sm:py-5 sm:p-4 mb-8 ">
      {/* Breadcrumb */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Hero Section */}
      <div className="relative w-full h-[30vh] max-h-[40vh] flex flex-col items-center justify-center rounded-lg p-6 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 drop-shadow-sm dark:text-white">
          Discover Dubai's Finest Communities
        </h2>
        <p className="text-sm md:text-base lg:text-lg max-w-3xl px-4 md:px-6 py-2 drop-shadow-sm dark:text-white">
          Discover Dubai&rsquo;s neighborhoods with Bay Homes Real Estate. Our area guides provide insights into lifestyle, amenities, and property options, helping you find your ideal home.
        </p>
      </div>

      {/* Search and Dropdown */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mt-4">
        {/* Search Input */}
        <div className="relative w-full sm:flex-grow">
          <input
            type="text"
            placeholder="Search..."
            className="pl-12 pr-4 py-3 border border-gray-300 rounded-md shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-CardDark"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <FiSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>

        {/* Dropdown */}
        <select
          className="w-full sm:w-auto border border-gray-300 rounded-md py-3 px-4 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white dark:bg-CardDark"
          onChange={handleFilterChange}
          value={aminity}
        >
          {filterAminitiesOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AreaHero;
