"use client";

import React, { useEffect } from "react";

interface FilterPurposeProps {
  propertyPurpose: string;
  setPropertyPurpose: (type: string) => void;
  propertyCounts: { [key: string]: number };
}

const FilterPurpose: React.FC<FilterPurposeProps> = ({ propertyPurpose, setPropertyPurpose, propertyCounts }) => {
  
  // Set default value to "buy" on mount if not already set
  useEffect(() => {
    if (!propertyPurpose) {
      setPropertyPurpose("sale");
    }
  }, [propertyPurpose, setPropertyPurpose]);

  const handlePropertyClassificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyPurpose(e.target.value);
  };

  const buttonClass = (purpose: string) => `
    flex items-center justify-center px-3 py-2 sm:px-4 sm:py-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out 
    ${propertyPurpose === purpose ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' : 'border border-gray-300 text-gray-700 hover:bg-orange-100 hover:border-orange-200'}
    text-sm sm:text-base
    focus:outline-none focus:ring-4 focus:ring-orange-400
  `;

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 mb-6 md:space-y-0 md:space-x-6">
      <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-0">
        {['sale', 'rent'].map((purpose) => (
           propertyCounts[purpose] > 0 && ( 
            <label key={purpose} className={`${buttonClass(purpose)} mb-2 sm:mb-0`}>
            <input
              type="radio"
              name="propertyType"
              value={purpose}
              onChange={handlePropertyClassificationChange}
              checked={propertyPurpose === purpose}
              className="sr-only"
            />
            <span className="capitalize">{purpose}</span>
          </label>
           )
         
        ))}
      </div>
    </div>
  );
}

export default FilterPurpose;
