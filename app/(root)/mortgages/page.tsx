import Image from 'next/image';
import MortgageBg from '@/assets/images/mortgage.jpg';
import Link from 'next/link';
import MortgageContent from '@/app/components/mortgages/MortgageContent';
import Breadcrumb from '@/app/components/Breadcrumb';
import HeroContainer2 from '@/app/components/container/HeroContainer2';

const breadcrumbItems = [
  {
    label: 'Mortgages',
  },
];
const Page = () => {
  return (
    <section className="flex flex-col w-full">
      {/* Banner Section */}
      <div className="relative h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[66vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <Image
          src={MortgageBg}
          alt="Mortgage banner"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60">
         
        </div>
        <div className="relative flex flex-col pt-10 items-start justify-center h-full px-6 sm:px-10 md:px-16 lg:px-20">
        <Breadcrumb items={breadcrumbItems}/>
        <div className='w-50'>
        <HeroContainer2 title={'Find The Best Mortgage & Home Loans in Dubai'} description={' Discover the unique charm and vibrant life of your property.'}/>
        </div>
          <Link
            href="#calculator"
            className="p-4 mt-5 bg-orange-500 text-white rounded-md shadow-sm hover:bg-gray-600 focus:outline-none">
            Mortgage Calculator
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <section className="py-10">
        <MortgageContent />
      </section>
    </section>
  );
};

export default Page;
