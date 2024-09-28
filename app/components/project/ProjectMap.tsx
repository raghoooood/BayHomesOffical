'use client';
import React from 'react';
import Map from '@/app/components/Map';
import PropertyDesc from '@/app/(root)/property/PropDesc';

interface Props {
  mapURL: string;
  projectName: string;
  aboutMap: string;
}

const ProjectMap = ({ mapURL, projectName, aboutMap }: Props) => {
  return (
    <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 lg:px-12 py-12 lg:py-16 border border-gray-200 rounded-xl shadow-lg bg-white max-w-screen-xl mx-auto space-y-8 lg:space-y-0 lg:space-x-12">
      {/* Left Side: Description */}
      <div className="w-full lg:w-1/2  ">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 lg:mb-6 ">
          {projectName}
        </h1>
        <p className="text-lg lg:text-xl text-gray-600 leading-relaxed mb-4">
          Prime Location, Endless Possibilities
        </p>
        <PropertyDesc description={aboutMap} />
      </div>

      {/* Right Side: Map */}
      <div className="w-full lg:w-1/2 h-72 lg:h-full relative">
        <Map url={mapURL} />
      </div>
    </div>
  );
};

export default ProjectMap;
