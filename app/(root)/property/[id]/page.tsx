/* eslint-disable @next/next/no-async-client-component */

import { getPropertyById } from '@/lib/actions/property.action';
import MortgageCalculator from '@/app/components/mortgages/MortgageCalculator';
import Map from '@/app/components/Map';
import Breadcrumb from '@/app/components/Breadcrumb';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa'; // Import the check icon
import agentImage from '@/assets/images/samah.png'
import PremitCard from '@/app/components/property/PremitCard';
import { capitalizeFirstLetter, getConvertedPrice } from '@/lib/utils';
import PropertyImgs from '@/app/components/property/PropertyImgs';
import PropertyDesc from '../PropDesc'; // Import the PropertyDescription component
import AgentCard from '@/app/components/booking-view/AgentCard';
import PriceConverter from '@/app/components/currencyConverter/priceConverter';

const Page = async ({ params }: any) => {``
  const result = await getPropertyById({ propertyId: params.id });


  const breadcrumbItems = [
    { label: 'Find a Property', path: `/all-property` },
    {
      label: `${capitalizeFirstLetter(result.propertyType)}s for ${capitalizeFirstLetter(result.purpose)}`,
      path: `/all-property?propertyType=${result.propertyType}&purpose=${result.purpose}`,
    },
    { label: `${result.area.areaName}`, path: `/all-property?area=${result.area.areaName}` },
    { label: `${result.projectName}`, path: `/all-property?projectName=${result.projectName}` },
    {
      label: `${result.location.street}, ${result.area.areaName}, ${result.projectName}`,
      path: `/all-property?state=${result.location.state}&area=${result.area.areaName}&projectName=${result.projectName}`,
    },
  ];


  return (
    <div className="max-w-6xl mx-auto py-24 px-5 relative">
      <Breadcrumb  items={breadcrumbItems}  />
      <PropertyImgs propImages={result.images.propImages} />

      <div className="flex flex-col lg:flex-row ">
        <div className="flex-1 flex flex-col max-w-3xl mx-auto  p-4  gap-1 bg-white dark:bg-CardDark">
          <div className="flex flex-col my-4 gap-4">
            <PriceConverter
              price={result.price}
              style="text-2xl font-bold text-orange-500"/>
            <h4 className="text-2xl font-semibold">{result.title}</h4>
            <Link href="#mortgage-section" className="text-orange-500 hover:underline">
              Calculate your mortgage repayments
            </Link>
          </div>

          <p className="text-lg font-bold text-gray-700 dark:text-white">
            Dubai, {result.area.areaName}, {result.location.street}
          </p>
          <div className="border-t border-gray-300 dark:border-gray-700" />

          <p className="text-sm font-bold text-blueCardSubTitle dark:text-white">Key Information</p>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-5">
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Property Type</p>
              <p className="text-gray-700 dark:text-white">{result.propertyType}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Purpose</p>
              <p className="text-gray-700 dark:text-white">{result.purpose}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Bedroom(s)</p>
              <p className="text-gray-700 dark:text-white">{result.numOfrooms}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Bathroom(s)</p>
              <p className="text-gray-700 dark:text-white">{result.numOfbathrooms}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Area/Size</p>
              <p className="text-gray-700 dark:text-white">{result.size}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">Furnishing Type</p>
              <p className="text-gray-700 dark:text-white">{result.furnishingType}</p>
            </div>
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700" />

          <div className="space-y-4">
          <p className="text-sm font-bold text-blueCardSubTitle dark:text-white">Property Description</p>
         {/* Property Description Component */}
         <PropertyDesc description={result.description} />
          </div>

          <div className="border-t border-gray-300 dark:border-gray-700" />

          <div className="space-y-4 py-5 mx-auto">
            <h4 className="text-lg font-bold text-blueCardSubTitle dark:text-white">Property Features</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {result.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center">
                  <FaCheckCircle className="text-gray-500 mr-2" />
                  <p className="text-gray-700 dark:text-white">{feature}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="mortgage-section" className=" rounded-lg mx-auto w-full border border-gray-400 mt-5 mb-5">
            <MortgageCalculator result={{ price: result.price }} />
          </div>
        </div>

        <div className="hidden lg:block w-72 ml-4 sticky top-4 z-10">
        <AgentCard agentImage={agentImage} agentName={'SAMAH FAEK'} agentPosition={'Broker & Manager'} _id={params.id} />
        </div>
      </div>

      <div className="my-7">
        <h4 className="text-2xl font-semibold">Location</h4>
        <Map url={result.location.URL}/>
      </div>

      <div className="border-t border-gray-300 dark:border-gray-700" />

      <PremitCard imageSrc={result.barcode} permitNumber={result.permitNo} />

      <div className="lg:hidden w-full">
      <AgentCard agentImage={agentImage} agentName={'SAMAH FAEK'} agentPosition={'Broker & Manager'} _id={params.id} />
      </div>
    </div>
  );
};

export default Page;
