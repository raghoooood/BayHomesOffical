import React from 'react';
import Image from 'next/image';
import AreaOffplan from '@/app/components/area/AreaOffplan';
import FaqContainer from '@/app/components/FaqContainer';
import { getAreaByName } from '@/lib/actions/area.action';
import { getProperties } from '@/lib/actions/property.action';
import Container from '@/app/components/container/Container';
import AreasFilter from '@/app/components/filters/AreasFilter';
import { capitalizeFirstLetter } from '@/lib/utils';
import Breadcrumb from '@/app/components/Breadcrumb';
import Map from '@/app/components/Map';
import ContactSection from '@/app/components/contact/ContactSection';
import AreaHomeContainer from '@/app/components/area/AreaHomeContainer';
import { getAllAreas } from '@/lib/actions/area.action';

const AreaDetails: React.FC<{ params: { areaName: string } }> = async ({ params }) => {
  const areaName = params.areaName;

  const areasResult = await getAllAreas();
  const plainAreas = areasResult.areas.map((property: { toObject: () => any; }) =>
    property.toObject ? property.toObject() : property
  );

   // Fetch the area data and properties in parallel
   const [result, propertiesResult] = await Promise.all([
    getAreaByName({ areaName }),
    getProperties(),
  ]);

  if (!result) {
    return <div>Area not found</div>;
  }

  // Filter properties by the current area ID
  const filteredProperties = propertiesResult.properties.filter((property) =>
    property.area._id.equals(result._id)
  );

  const plainProperties = filteredProperties.map((property) =>
    property.toObject ? property.toObject() : property
  );


  // Define FAQ data with dynamic areaName
  const accordionData = [
    { id: 'community', title: 'Community Overview', content: `Details about the community overview in ${areaName}.` },
    { id: 'property', title: 'Property Insights', content: `Information about property insights in ${areaName}.` },
    { id: 'life', title: 'What’s Life Like in', content: `Description of life in ${areaName}.` },
    { id: 'things-to-do', title: 'Things to Do in', content: `List of activities and places to visit in ${areaName}.` },
    { id: 'considerations', title: 'Things to Consider', content: `Important things to consider in ${areaName}.` },
    { id: 'faqs', title: 'FAQs About', content: `Frequently asked questions about ${areaName}.` },
  ];

  const breadcrumbItems = [
    { label: 'communities', 
      path: `/areas`,
      style: 'text-white'
    },
    {
      label: `${capitalizeFirstLetter(result.areaName)}`,
     
    },
    
  ];

  return (
    <Container>
      <section className="flex flex-col w-full">
        {/* Banner Section */}
        <div
          className="relative h-[80vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen bg-no-repeat bg-cover bg-center"
          style={{ backgroundImage: `url(${result.image})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60">
          </div>

          {/* Centered Content */}
          <div className="relative flex flex-col items-start justify-center h-full  text-white z-10 px-20">
            <div className="ml-5 space-y-4">
            <Breadcrumb styles={`z-10 text-white`} items={breadcrumbItems} />
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg ">
              {result.areaName}
            </h1>
            <p className="mt-5 text-xl md:text-2xl font-normal">
              Discover the unique charm and vibrant life of {result.areaName}.
            </p>
            </div>
            <AreasFilter />
          </div>
        </div>

        {/* Details Section */}
        <div id="properties" className="max-w-screen-xl grid grid-cols-1 md:grid-cols-2 gap-24 p-6 md:p-12 mt-12 space-y-12 md:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold mb-4">About {result.areaName}</h2>
            <p className="text-gray-700 leading-relaxed">{result.description}</p>
          </div>

          <div>
            <Image
            src={result.image}
            alt="Mission Image"
            layout="responsive"
            width={500}
            height={300}
            className="rounded-md"
            />

          </div>
        </div>
        
        <div className="items-start justify-start p-3 md:p-8">
          {plainProperties.length > 0 ? (
            <AreaOffplan initialProperties={plainProperties} title={result.areaName}/>
          ) : (
            <p className="text-center text-gray-600">No properties found for this area.</p>
          )}
        </div>

        <div className="max-w-screen-xl justify-start items-start py-10">
        <Map url={result.location} />
        </div>


        <div className="max-w-screen-lg justify-start items-start ">
          <FaqContainer data={accordionData} areaName={result.areaName} />
        </div>

        <ContactSection/>
        <AreaHomeContainer areas={plainAreas} />

       
      </section>
    </Container>
  );
};

export default AreaDetails;
