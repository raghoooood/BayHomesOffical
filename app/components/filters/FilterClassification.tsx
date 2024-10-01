"use client";

import React from "react";

interface FilterClassificationProps {
  propertyClassification: string;
  setPropertyClassification: (type: string) => void;
  propertyCounts: { [key: string]: number };
}

const FilterClassification: React.FC<FilterClassificationProps> = ({ propertyClassification, setPropertyClassification, propertyCounts }) => {
  const handlePropertyClassificationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPropertyClassification(e.target.value);
  };

  const buttonClass = (classification: string) => `
    flex px-3 py-2 sm:px-4 sm:py-3 rounded-md cursor-pointer transition-all duration-300 ease-in-out 
    ${propertyClassification === classification ? 'bg-gradient-to-r from-orange-400 to-orange-600 text-white shadow-lg' : 'border border-gray-300 text-gray-700 hover:bg-orange-100 hover:border-orange-200'}
    text-sm sm:text-base
    focus:outline-none focus:ring-4 focus:ring-orange-400
  `;

  const classifications = ['residential', 'commercial', 'off plan'];

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between  mb-6 md:space-y-0 md:space-x-6">
      <div className="flex flex-wrap gap-3 md:gap-4 mb-4 md:mb-0">
        {/* Property classification buttons */}
        {classifications.map((classification) => (
          propertyCounts[classification] > 0 && (
            <label key={classification} className={`${buttonClass(classification)} mb-2 sm:mb-0 dark:text-white`}>
              <input
                type="radio"
                name="propertyClassification"
                value={classification}
                onChange={handlePropertyClassificationChange}
                checked={propertyClassification === classification}
                className="sr-only"
              />
              <span className="capitalize">{classification}</span>
            </label>
          )
        ))}
      </div>
    </div>
  );
};

export default FilterClassification;
