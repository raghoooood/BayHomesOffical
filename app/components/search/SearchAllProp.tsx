"use client"

import React, { useEffect, useState, useRef } from 'react';
import filterOptions from '@/utils/filterOptions';
import { MdClose } from 'react-icons/md';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAreas } from '@/lib/actions/area.action';
import Button from '../buttons/Button';
import { useCurrency } from '../hooks/useCurrency';
import { convertCurrency } from '@/lib/utils';

interface Area {
  _id: string;
  areaName: string;
}

interface SearchContainerProps {
  areaName?: string;
  defaultPurpose?: string;
}

const SearchAllProp = ({ areaName, defaultPurpose }: SearchContainerProps) => {
  const [filters, setFilters] = useState({
    areas: [] as string[],
    propertyType: '',
    bedsMin: 0,
    bedsMax: 0,
    priceMin: 0,
    priceMax: 0,
    purpose: '',
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [showAllAreas, setShowAllAreas] = useState(false); // State to show/hide the modal/dropdown

  const [searchText, setSearchText] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();

  const priceRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);

  const { selectedCurrency } = useCurrency();


  // Initialize filters based on query parameters
  useEffect(() => {
    const purpose = searchParams.get('purpose') || '';
    const areas = searchParams.get('area')?.split(',') || [];
    const propertyType = searchParams.get('propertyType') || '';
    const bedsMin = parseInt(searchParams.get('bedsMin') || '0', 10);
    const bedsMax = parseInt(searchParams.get('bedsMax') || '0', 10);
    const priceMin = parseInt(searchParams.get('priceMin') || '0', 10);
    const priceMax = parseInt(searchParams.get('priceMax') || '0', 10);


    setFilters({
      areas,
      propertyType,
      bedsMin,
      bedsMax,
      priceMin,
      priceMax,
      purpose,
    });
  }, [searchParams]);

  const fetchAllAreas = async (query: string) => {
    try {
      const areas = await getAreas(query);
      const matchingAreas = areas.areas.filter(area =>
        area.areaName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredAreas(matchingAreas);
    } catch (error) {
      console.error('Error fetching area names:', error);
    }
  };

  useEffect(() => {
    if (areaName) {
      if (!filters.areas.includes(areaName)) {
        setFilters(prevFilters => ({
          ...prevFilters,
          areas: [...prevFilters.areas, areaName],
        }));
      }
    } else if (searchText) {
      fetchAllAreas(searchText);
    } else {
      setFilteredAreas([]);
    }
  }, [areaName, searchText]);

  useEffect(() => {
    if (searchText) {
      fetchAllAreas(searchText);
    } else {
      setFilteredAreas([]);
    }
  }, [searchText]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Toggle the dropdown for price/beds filters
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setShowFilterOverlay(false);  // Hide overlay when dropdown is opened
  };

  // Toggle filter overlay visibility
  const toggleFilterOverlay = () => {
    setShowFilterOverlay(prev => !prev);
    setActiveDropdown(null);  // Close all dropdowns when overlay is opened
  };

  
   
  
      const exchangeRates = {
        AED: 3.67,
        EUR: 0.85,
        GBP: 0.75,
        USD: 1.00,
      };
      
  const [rawPriceMin, setRawPriceMin] = useState(filters.priceMin);
  const [rawPriceMax, setRawPriceMax] = useState(filters.priceMax);
  
  useEffect(() => {
    // Convert the raw prices to the selected currency when it changes
    const convertedMin = convertCurrency(rawPriceMin, selectedCurrency, 'GBP' ,exchangeRates );
    const convertedMax = convertCurrency(rawPriceMax, selectedCurrency, 'GBP' , exchangeRates);

    console.log(rawPriceMin , convertedMin , selectedCurrency);
    console.log(rawPriceMax , convertedMax , selectedCurrency);
    
    setFilters(prevFilters => ({
      ...prevFilters,
      priceMin: Number(convertedMin),
      priceMax: Number(convertedMax),
    }));
  }, [rawPriceMin, rawPriceMax, selectedCurrency]);
  const handleSearch = () => {
    const queryParams = new URLSearchParams();

    if (filters.areas.length) queryParams.set('area', filters.areas.join(','));
    if (filters.propertyType) queryParams.set('propertyType', filters.propertyType);
    if (filters.bedsMin) queryParams.set('bedsMin', filters.bedsMin.toString());
    if (filters.bedsMax) queryParams.set('bedsMax', filters.bedsMax.toString());
    if (filters.priceMin) queryParams.set('priceMin', filters.priceMin.toString());
    if (filters.priceMax) queryParams.set('priceMax', filters.priceMax.toString());
    if (filters.purpose) queryParams.set('purpose' , filters.purpose);

    router.push(`/all-property?${queryParams.toString()}`);

    setShowFilterOverlay(false);
  };

  const handleAreaSelect = (areaName: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      areas: [...new Set([...prevFilters.areas, areaName])],
    }));
    setSearchText('');
    setFilteredAreas([]);
  };

  const handleAreaRemove = (areaName: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      areas: prevFilters.areas.filter(area => area !== areaName),
    }));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        if (activeDropdown === 'priceRange') {
          setActiveDropdown(null);
        }
      }
      if (bedsRef.current && !bedsRef.current.contains(event.target as Node)) {
        if (activeDropdown === 'bedsRange') {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeDropdown]);

  return (
    <div className="relative p-4 space-y-5 sm:space-y-0  h-20 ">
{/* Main Filters for Large Devices */}
<div className="hidden lg:flex flex-wrap justify-center items-center space-x-4 w-full px-4 py-2 ">
  {/* Filters Container */}
  <div className="flex flex-wrap items-center bg-white dark:bg-bg rounded-lg shadow-lg p-2 space-x-4 flex-grow max-w-6xl">
    {/* Area Filter */}
    <div className="relative flex items-center space-x-2 flex-grow z-20 ">
    {filters.areas.length > 0 && (
                    <div className="flex items-center bg-gray-200 p-1 rounded text-xs text-black">
                      {filters.areas[0]}
                      {filters.areas.length > 1 && (
                        <span
                          className="ml-1 text-gray-500 px-5 w-full cursor-pointer"
                          onClick={() => setShowAllAreas(true)}
                        >
                          {`+${filters.areas.length - 1} more`}
                        </span>
                      )}
                      <button
                        type="button"
                        className="ml-1 text-red-500"
                        onClick={() => handleAreaRemove(filters.areas[0])}
                      >
                        ×
                      </button>
                    </div>
                  )}
      <input
        type="text"
        name="area"
        placeholder="Area, project or community"
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 w-full dark:bg-white dark:text-gray-800"
        value={searchText}
      />
      {filteredAreas.length > 0 && (
        <ul className="absolute z-30 bg-white w-full mt-1 max-h-40 overflow-y-auto">
          {filteredAreas.map((area) => (
            <li
              key={area._id}
              className="p-3 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAreaSelect(area.areaName)}
            >
              {area.areaName}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Type Filter */}
    <select
      name="propertyType"
      className="p-2 border border-gray-300 rounded-lg shadow-sm dark:bg-white dark:text-gray-800"
      onChange={handleFilterChange}
      value={filters.propertyType}
    >
      {filterOptions.propertyType.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>

    {/* price filter */}

    <div className="relative" ref={priceRef}>
                <button
                  onClick={() => handleDropdownToggle('priceRange')}
                  className="p-2 text-black"
                >
                  Price
                </button>
                {activeDropdown === 'priceRange' && (
                  <div className="absolute left-0 mt-2 w-[17rem] bg-white border border-gray-300 rounded-lg shadow-lg p-5 dark:bg-gray-800 z-20">
                    <div className="flex justify-between space-x-3">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="priceMin"
                          className="text-sm font-light dark:text-gray-300 text-black"
                        >
                          Min Price
                        </label>
                        <input
                          type="number"
                          name="priceMin"
                          id="priceMin"
                          value={filters.priceMin}
                          onChange={handleFilterChange}
                          placeholder="Min"
                          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 text-black"
                        />
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="priceMax"
                          className="text-sm font-light text-gray-700 dark:text-gray-300 text-black"
                        >
                          Max Price
                        </label>
                        <input
                          type="number"
                          name="priceMax"
                          id="priceMax"
                          value={filters.priceMax}
                          onChange={handleFilterChange}
                          placeholder="Max"
                          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 text-black"
                        />
                      </div>
                    </div>
                    
                  </div>
                )}
              </div>
              <div className="relative" ref={bedsRef}>
                <button
                  onClick={() => handleDropdownToggle('bedsRange')}
                  className="p-2 dark:text-black text-black"
                >
                  Beds
                </button>
                {activeDropdown === 'bedsRange' && (
                  <div className="absolute left-0 mt-2 w-[17rem] bg-white border border-gray-300 rounded-lg shadow-lg p-5 dark:bg-gray-800 z-20 ">
                    <div className="flex justify-between space-x-3">
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="bedsMin"
                          className="text-sm font-light text-gray-700 dark:text-gray-300"
                        >
                          Min Beds
                        </label>
                        <input
                          type="number"
                          name="bedsMin"
                          id="bedsMin"
                          value={filters.bedsMin}
                          onChange={handleFilterChange}
                          placeholder="Min"
                          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 text-black"
                        />
                      </div>
                      <div className="flex flex-col w-1/2">
                        <label
                          htmlFor="bedsMax"
                          className="text-sm font-light text-gray-700 dark:text-gray-300"
                        >
                          Max Beds
                        </label>
                        <input
                          type="number"
                          name="bedsMax"
                          id="bedsMax"
                          value={filters.bedsMax}
                          onChange={handleFilterChange}
                          placeholder="Max"
                          className="p-2 border border-gray-300 rounded dark:bg-gray-700 dark:text-gray-300 text-black"
                        />
                      </div>
                    </div>
                    
                  </div>
                )}
              </div>
  </div>
  {/* Action Buttons */}
  <div className="flex space-x-2  items-center w-[20vw] z-50">
    <Button label="Search" onClick={handleSearch} />
    <Button label="Clear Filters" 
      onClick={() =>
        setFilters({
          areas: [],
          propertyType: '',
          bedsMin: 0,
          bedsMax: 0,
          priceMin: 0,
          priceMax: 0,
          purpose: '',
        })
        
      }
      noutline
      black_text
    />
  </div>
</div>

{/* Responsive Design for Small and Medium Devices */}
<div className="lg:hidden flex flex-col space-y-4 mb-10 py-2 ">
  <input
    type="text"
    name="area"
    placeholder="Area or Community"
    onChange={(e) => setSearchText(e.target.value)}
    className="p-3 w-full bg-white rounded-lg border border-gray-300 shadow-lg"
    value={searchText}
  />
  {filteredAreas.length > 0 && (
    <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1 max-h-40 overflow-y-auto">
      {filteredAreas.map((area) => (
        <li
          key={area._id}
          className="p-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => handleAreaSelect(area.areaName)}
        >
          {area.areaName}
        </li>
      ))}
    </ul>
  )}
  <div className="flex flex-col space-y-2">
    {filters.areas.length > 0 && (
      <div className="bg-gray-200 p-2 rounded-lg">
        {filters.areas[0]}
        {filters.areas.length > 1 && (
          <span className="ml-1 text-gray-500">
            {` +${filters.areas.length - 1} more`}
          </span>
        )}
        {filters.areas.length > 0 && (
          <button
            type="button"
            className="ml-2 text-red-500"
            onClick={() => handleAreaRemove(filters.areas[0])}
          >
            ×
          </button>
        )}
      </div>
    )}
    <div className="flex flex-row space-x-2 ">
      <Button label="Search" onClick={handleSearch} />
      <Button label="Filter" onClick={toggleFilterOverlay} />
    </div>
  </div>
</div>

      {/* Filter Overlay for Small Devices */}
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
          className="p-2 border border-gray-300 rounded w-full"
          onChange={handleFilterChange}
          value={filters.propertyType}
        >
          {filterOptions.propertyType.map((option) => (
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
            value={rawPriceMin} // Use rawPriceMin for input value
            onChange={e => setRawPriceMin(parseFloat(e.target.value) )}
            className="p-2 border border-gray-300 rounded w-full"
            placeholder="Enter minimum price"
          />
          <label htmlFor="priceMax">Max Price</label>
          <input
            type="number"
            id="priceMax"
            name="priceMax"
            value={rawPriceMax} // Use rawPriceMax for input value
            onChange={e => setRawPriceMax(parseFloat(e.target.value) )}
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
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded w-full"
            value={filters.bedsMin}
            placeholder="Enter minimum beds"
          />
          <label htmlFor="bedsMax">Max Beds</label>
          <input
            type="number"
            id="bedsMax"
            name="bedsMax"
            onChange={handleFilterChange}
            className="p-2 border border-gray-300 rounded w-full"
            value={filters.bedsMax}
            placeholder="Enter maximum beds"
          />
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button
            label="Clear Filters"
            onClick={() =>
              setFilters({
                purpose: '',
                areas: [],
                propertyType: '',
                bedsMin: 0,
                bedsMax: 0,
                priceMin: 0,
                priceMax: 0,
              })
            }
            small
          />
          <Button label="Apply Filters" onClick={handleSearch} small />
        </div>
      </div>
    </div>
  </div>
)}

      
  {/* Modal/Dropdown for displaying all selected areas */}
 {showAllAreas && filters.areas.length > 0 && (
  <div
    className="absolute left-0 right-0 mt-2 z-50"
    onClick={() => setShowAllAreas(false)}  // Close modal on click outside
  >
     <div
      className="bg-white shadow-lg p-2 w-full max-w-md mx-auto"
      // onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the content
    >
      {/* Selected Areas Grid */}
      <div className="grid grid-cols-2 gap-2">
        {filters.areas.map((area) => (
          <div
            key={area}
            className="flex justify-between items-center p-2 bg-gray-200 rounded text-sm h-10"
          >
            <span>{area}</span>
            <button
              type="button"
              className="text-red-500"
              onClick={() => handleAreaRemove(area)}
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default SearchAllProp;
