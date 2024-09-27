'use client'
import React, { useEffect, useState, useRef } from 'react';
import filterOptions from '@/utils/filterOptions';
import { useRouter } from 'next/navigation';
import { getAreas } from '@/lib/actions/area.action';
import Button from '../buttons/Button';
import SearchResponsive from './SearchResponsive';
import { convertCurrency } from '@/lib/utils';
import { useCurrency } from '../hooks/useCurrency';

interface Area {
  _id: string;
  areaName: string;
}

interface SearchContainerProps {
  areaName?: string;
  defaultPurpose?: string;
}

const SearchContainer = ({ areaName, defaultPurpose }: SearchContainerProps) => {
  const [filters, setFilters] = useState({
    purpose: defaultPurpose || '',
    areas: [] as string[],
    propertyType: '',
    bedsMin: 0,
    bedsMax: 0,
    priceMin: 0,
    priceMax: 0,
    currency: ''
  });

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [filteredAreas, setFilteredAreas] = useState<Area[]>([]);
  const [searchText, setSearchText] = useState('');
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [showAllAreas, setShowAllAreas] = useState(false);
  const priceRef = useRef<HTMLDivElement>(null);
  const bedsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { selectedCurrency } = useCurrency();

  const exchangeRates = {
    AED: 3.67,
    EUR: 0.85,
    GBP: 0.75,
    USD: 1.00,
  };

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch areas based on search text
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

  // Update filters based on area name or search text
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

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;

    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const [rawPriceMin, setRawPriceMin] = useState(filters.priceMin);
  const [rawPriceMax, setRawPriceMax] = useState(filters.priceMax);

  // Convert raw prices to selected currency
  useEffect(() => {
    const convertedMin = convertCurrency(rawPriceMin, selectedCurrency, 'AED', exchangeRates);
    const convertedMax = convertCurrency(rawPriceMax, selectedCurrency, 'AED', exchangeRates);

    setFilters(prevFilters => ({
      ...prevFilters,
      priceMin: Number(convertedMin),
      priceMax: Number(convertedMax),
    }));
  }, [rawPriceMin, rawPriceMax, selectedCurrency]);

  // Handle dropdown toggle
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
    setShowFilterOverlay(false);
  };

  // Handle click outside to close dropdowns
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [activeDropdown]);

  // Handle search
  const handleSearch = () => {
    const queryParams = new URLSearchParams();
    queryParams.append('source', 'search');
    if (filters.purpose) queryParams.append('purpose', filters.purpose);
    if (filteredAreas.length > 0) queryParams.append('area', filteredAreas.map(area => area.areaName).join(','));
    router.push(`/all-property?${queryParams.toString()}`);
  };

  // Handle area selection
  const handleAreaSelect = (areaName: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      areas: [...new Set([...prevFilters.areas, areaName])],
    }));
    setSearchText('');
    setFilteredAreas([]);
  };

  // Handle area removal
  const handleAreaRemove = (areaName: string) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      areas: prevFilters.areas.filter(area => area !== areaName),
    }));
  };

  return (
<div className="relative">
{isSmallScreen ? (
        <SearchResponsive
          filters={filters}
          handleFilterChange={handleFilterChange}
          searchText={searchText}
          setSearchText={setSearchText}
          filteredAreas={filteredAreas}
          handleAreaSelect={handleAreaSelect}
          handleSearch={handleSearch}
          defaultPurpose={defaultPurpose}
        />
      ) : (
        <div className="p-2 max-w-4xl mx-auto">
          <div className="hidden md:flex flex-row space-x-4">
            <div className="flex flex-col p-2 shadow-md md:flex-row items-center md:space-x-3 bg-white rounded-md z-10">
              <select
                name="purpose"
                onChange={handleFilterChange}
                className="p-2 w-full md:w-auto font-light bg-white text-black"
                value={filters.purpose}
              >
                {filterOptions.purpose.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="relative w-full md:w-auto">
                <div className="flex items-center gap-2">
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
                    onChange={e => setSearchText(e.target.value)}
                    className="p-2 border-l-4 w-full md:w-auto bg-white dark:text-black"
                    value={searchText}
                  />
                </div>
                {filteredAreas.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1 max-h-40 overflow-y-auto">
                    {filteredAreas.map(area => (
                      <li
                        key={area._id}
                        className="p-2 hover:bg-gray-200 cursor-pointer text-black dark:text-black"
                        onClick={() => handleAreaSelect(area.areaName)}
                      >
                        {area.areaName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <select
                name="propertyType"
                onChange={handleFilterChange}
                className="p-2 border-l-4 w-full md:w-auto font-light bg-white text-black"
                value={filters.propertyType}
              >
                {filterOptions.propertyType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="relative" ref={priceRef}>
                <button
                  onClick={() => handleDropdownToggle('priceRange')}
                  className="p-2 text-black"
                >
                 price
                </button>
                {activeDropdown === 'priceRange' && (
                  <div className="absolute left-0 mt-2 w-[17rem] bg-white border border-gray-300 rounded-lg shadow-lg p-5 dark:bg-gray-800">
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
                          value={rawPriceMin} // Use rawPriceMin for input value
                          onChange={e => setRawPriceMin(parseFloat(e.target.value) || 0)}
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
                          value={rawPriceMax} // Use rawPriceMax for input value
                          onChange={e => setRawPriceMax(parseFloat(e.target.value) || 0)}
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
                  <div className="absolute left-0 mt-2 w-[17rem] bg-white border border-gray-300 rounded-lg shadow-lg p-5 dark:bg-gray-800 ">
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
              <Button  label='Search' onClick={handleSearch}/>
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

export default SearchContainer;
