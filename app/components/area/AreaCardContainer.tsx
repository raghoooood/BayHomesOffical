'use client';

import React, { useMemo, useState } from 'react';
import AreaCard from './AreaCard';
import { AreaCardData } from '@/utils/areaCardData';
import AreaHero from './AreaHero';

interface AreaProps {
  areas: AreaCardData[];
}

const AreaCardContainer: React.FC<AreaProps> = ({ areas }) => {
  const [aminity, setAminity] = useState('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredAreas = useMemo(() => {
    return areas.filter((area) => {
      const matchesAminity = aminity === 'all' || area.features?.includes(aminity);
      const matchesSearchQuery = area.areaName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesAminity && matchesSearchQuery;
    });
  }, [areas, aminity, searchQuery]);

  return (
    <div className="p-4 lg:p-6">
      {/* AreaHero Component */}
      <div className="mb-6 lg:mb-8">
        <AreaHero
          aminity={aminity}
          setAminity={setAminity}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>

      {/* Grid for AreaCard Components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {filteredAreas.length > 0 ? (
          filteredAreas.map((card, index) => (
            <div key={index} className="w-full">
              <AreaCard
                _id={card._id}
                image={card.image}
                areaName={card.areaName}
              />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No areas found</p>
        )}
      </div>
    </div>
  );
};

export default AreaCardContainer;
