import React, { useState } from 'react';
import filterOptions from '@/utils/filterOptions';
import Button from '../buttons/Button';
import { useRouter } from 'next/navigation';
import { MdClose } from 'react-icons/md';

interface Area {
  _id: string;
  areaName: string;
}



interface SearchResponsiveProps {
    filters: {
      purpose: string;
      propertyType: string;
      priceMin: number;
      priceMax: number;
      bedsMin: number;
      bedsMax: number;
    };
    handleFilterChange: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
    searchText: string;
    setSearchText: (text: string) => void;
    filteredAreas: Area[];
    handleAreaSelect: (areaName: string) => void;
    handleSearch: () => Promise<void>; // Added this line
    defaultPurpose?: string;
  }
  

const SearchResponsive: React.FC<SearchResponsiveProps> = ({
  filters,
  handleFilterChange,
  searchText,
  setSearchText,
  filteredAreas,
  handleAreaSelect,
  defaultPurpose = '',
}) => {
  const [showFilterOverlay, setShowFilterOverlay] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [localFilters, setLocalFilters] = useState({
    purpose: defaultPurpose,
    areas: [] as string[],
    type: '',
    bedsMin: 0,
    bedsMax: 0,
    priceMin: 0,
    priceMax: 0,
  });

  const router = useRouter();

  const handleSearch = () => {
    try {
      const queryParams = new URLSearchParams();

      queryParams.append('source', 'search');
      if (localFilters.purpose) queryParams.append('purpose', localFilters.purpose);
      if (localFilters.areas.length > 0) queryParams.append('area', localFilters.areas.join(', '));
      if (localFilters.type) queryParams.append('type', localFilters.type);
      if (localFilters.priceMin) queryParams.append('priceMin', localFilters.priceMin.toString());
      if (localFilters.priceMax) queryParams.append('priceMax', localFilters.priceMax.toString());
      if (localFilters.bedsMin) queryParams.append('bedsMin', localFilters.bedsMin.toString());
      if (localFilters.bedsMax) queryParams.append('bedsMax', localFilters.bedsMax.toString());

      router.push(`/all-property?${queryParams.toString()}`);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };



  const toggleFilterOverlay = () => {
    setShowFilterOverlay(!showFilterOverlay);
    setActiveDropdown(null);
  };

  const handleAreaRemove = (areaName: string) => {
    setLocalFilters(prevFilters => ({
      ...prevFilters,
      areas: prevFilters.areas.filter(area => area !== areaName),
    }));
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
          {filterOptions.purpose.map((option) => (
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
        onChange={(e) => setSearchText(e.target.value)}
        className="p-2 w-full bg-white rounded-lg dark:text-black"
        value={searchText}
      />
      {filteredAreas.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full mt-1 max-h-40 overflow-y-auto">
          {filteredAreas.map((area) => (
            <li
              key={area._id}
              className="p-2 hover:bg-gray-200 cursor-pointer dark:text-black "
              onClick={() => handleAreaSelect(area.areaName)}
            >
              {area.areaName}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col space-y-2">
        {localFilters.areas.length > 0 && (
          <div className="bg-gray-200 p-2 rounded-lg flex items-center">
            {localFilters.areas[0]}
            {localFilters.areas.length > 1 && (
              <span className="ml-1 text-gray-500">
                {` +${localFilters.areas.length - 1} more`}
              </span>
            )}
            <button
              type="button"
              className="ml-2 text-red-500"
              onClick={() => handleAreaRemove(localFilters.areas[0])}
              aria-label={`Remove ${localFilters.areas[0]}`}
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div className="flex flex-row space-x-2">
        <Button label="Search" onClick={handleSearch} />
        <Button label="Filter" onClick={toggleFilterOverlay}   />
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
                name="type"
                onChange={handleFilterChange}
                className="p-2 border border-gray-300 rounded w-full"
                value={localFilters.type}
              >
                {filterOptions.propertyType.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className="flex flex-col space-y-2">
                <label htmlFor="priceMin">Min Price</label>
                <select
                  id="priceMin"
                  name="priceMin"
                  onChange={handleFilterChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  value={localFilters.priceMin}
                >
                  {filterOptions.priceRange.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="priceMax">Max Price</label>
                <select
                  id="priceMax"
                  name="priceMax"
                  onChange={handleFilterChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  value={localFilters.priceMax}
                >
                  {filterOptions.priceRange.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="bedsMin">Min Beds</label>
                <select
                  id="bedsMin"
                  name="bedsMin"
                  onChange={handleFilterChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  value={localFilters.bedsMin}
                >
                  {filterOptions.bedsRange.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <label htmlFor="bedsMax">Max Beds</label>
                <select
                  id="bedsMax"
                  name="bedsMax"
                  onChange={handleFilterChange}
                  className="p-2 border border-gray-300 rounded w-full"
                  value={localFilters.bedsMax}
                >
                  {filterOptions.bedsRange.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col space-y-2">
                <Button
                  label="Clear Filters"
                  onClick={() =>
                    setLocalFilters({
                      purpose: '',
                      areas: [],
                      type: '',
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
    </div>
  );
};

export default SearchResponsive;
