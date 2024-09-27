import React from 'react';
import AreaCardContainer from '@/app/components/area/AreaCardContainer';
import { getAllAreas } from '@/lib/actions/area.action';

const Page = async () => {
  const areasResult = await getAllAreas();
  
  const plainAreas = areasResult.areas.map((property: { toObject: () => any; }) =>
    property.toObject ? property.toObject() : property
  );

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <main className="w-full max-w-6xl mx-auto p-6 sm:p-8 lg:p-12 ">
        <AreaCardContainer areas={plainAreas} />
      </main>
    </div>
  );
};

export default Page;
