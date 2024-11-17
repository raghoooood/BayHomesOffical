'use client'
import React, { useState } from 'react';

interface AccordionData {
  id: string;
  title: string;
  content: string;
}

interface AccordionProps {
  data: AccordionData[];
  areaName: string;
}

const FaqContainer: React.FC<AccordionProps> = ({ data, areaName }) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="p-6 md:p-12 max-w-screen-lg">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">
        Useful Information about {areaName}
      </h1>

      <div className="bg-white shadow-md rounded-md dark:bg-CardDark">
        {data.map((section) => (
          <div key={section.id} className="border-b">
            <button
              onClick={() => toggleAccordion(section.id)}
              className="w-full text-left p-4 focus:outline-none flex justify-between items-center"
            >
              <span className="text-xl font-semibold">
                {section.title} {['life', 'things-to-do'].includes(section.id) ? areaName : ''}
              </span>
              <span className={`transform transition-transform ${openId === section.id ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-max-height duration-300 ease-in-out ${openId === section.id ? 'max-h-96' : 'max-h-0'}`}
            >
              <div className="p-4 text-gray-700 dark:text-white text-sm">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FaqContainer;
