import { useState } from 'react';
import { FaList, FaTh } from 'react-icons/fa';

interface FilterAndViewToggleProps {
  onViewChange: (view: 'list' | 'grid') => void;
  onSortChange: (sortOption: string) => void;
  currentView: 'list' | 'grid';
}

const FilterAndViewToggle: React.FC<FilterAndViewToggleProps> = ({ onSortChange, onViewChange, currentView }) => {
  const [sortOption, setSortOption] = useState<string>('date-desc'); // Default sorting

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
    onSortChange(event.target.value); // Notify parent component
  };

  return (
    <div className="p-4 bg-white dark:bg-bgDark rounded-lg ">
      <div className="flex  flex-row justify-between items-center">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <button
            className={`p-2 rounded-lg transition-colors duration-300 ${currentView === 'list' ? 'text-orange-500 border border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            onClick={() => onViewChange('list')}
            aria-label="List view"
          >
            <FaList className="text-xl" />
          </button>
          <button
            className={`p-2 rounded-lg transition-colors duration-300 dark:text-white ${currentView === 'grid' ? 'text-orange-500 border border-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
            onClick={() => onViewChange('grid')}
            aria-label="Grid view"
          >
            <FaTh className="text-xl" />
          </button>
        </div>
        <select
          className="p-2 border rounded-lg bg-gray-50 text-gray-700 shadow-sm  dark:bg-bgDark dark:text-white"
          aria-label="Sort by"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          {/* <option value="date-asc">Date: Oldest First</option>
          <option value="date-desc">Date: Newest First</option> */}
        </select>
      </div>
    </div>
  );
};

export default FilterAndViewToggle;
