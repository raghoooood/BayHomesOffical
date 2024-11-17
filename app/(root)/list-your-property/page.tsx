// pages/list-your-property.js

import Image from 'next/image';
import ListPropContent from '@/app/components/listingProp/ListPropContent';
import ListPropBanner from '@/assets/images/aboutus.jpg';
import Link from 'next/link';
import Breadcrumb from '@/app/components/Breadcrumb';
import HeroContainer2 from '@/app/components/container/HeroContainer2';

const Page = () => {
  const breadcrumbItems = [
    { label: 'List Your Property', 
    }, 
  ];

  return (
    <section className="flex flex-col w-full">
      {/* Banner Section */}
      <div className="relative h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[68vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <Image
  src={ListPropBanner}
  alt="list-your-prop-banner"
  layout="fill"
  objectFit="cover"
  placeholder="blur" // Add this for a blurred placeholder
  className="absolute inset-0"
/>

        <div className="relative flex flex-col pt-14 items-start justify-center h-full px-6 sm:px-10 md:px-16 lg:px-20">
        <Breadcrumb styles='z-10' items={breadcrumbItems}/>
        <div className='w-50'>
          <HeroContainer2 title={'List Your Property in Dubai with Confidence.'} description={"Sell or Buy with Bay Homes Real Estate, and let's connect you to the right buyers or tenants"}/>
          </div>
          <a
          href="#listProp-form"
          className="p-4 mt-5 bg-orange-500 text-white rounded-md shadow-sm hover:bg-orange-600 focus:outline-none"
            >
         List Your Property Now
        </a>
        </div>
      </div>

      {/* Content Section */}
      <section  className="py-10">
        <ListPropContent />
      </section>

      
      
    </section>
  );
};

export default Page;
