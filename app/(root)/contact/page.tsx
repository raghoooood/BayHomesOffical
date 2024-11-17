'use client';
import React from 'react';
import dynamic from 'next/dynamic';
import 'react-toastify/dist/ReactToastify.css';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { LargeTypingText } from '@/app/styles/CustomTexts';

// Lazy load components
const Map = dynamic(() => import('@/app/components/Map'), { ssr: false });
const ContactForm = dynamic(() => import('@/app/components/forms/ContactForm'), { ssr: false });
const Breadcrumb = dynamic(() => import('@/app/components/Breadcrumb'));
const Container = dynamic(() => import('@/app/components/container/Container'));
const Heading = dynamic(() => import('@/app/components/Heading'));
const ServicesContainer = dynamic(() => import('@/app/components/services/ServicesContainer'));

const Page: React.FC = () => {

  const breadcrumbItems = [{ label: 'Contact Us' }];

  return (
    <Container>
      <div className="p-6 mt-10">
        <Breadcrumb styles="z-10" items={breadcrumbItems} />
        <div className="flex flex-col justify-center items-center">
        <LargeTypingText title="Contact Us Now" textStyles="text-center" />
        </div>
        <div className="relative justify-center items-center mx-auto">
          <p className="font-medium px-12 text-base text-center mt-3 mb-10 text-gray-500 dark:text-gray-300">
            Bay Homes is committed to delivering exceptional service throughout Dubai.
            This is your direct connection to our experienced team, whether you have questions or need information.
          </p>
        </div>
      </div>

      <div className="relative flex flex-col justify-center w-full h-full p-4 md:p-6 lg:p-8 rounded-lg bg-white bg-opacity-70 shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 mb-6 md:mb-0 space-y-10 ">
            <h1 className="text-2xl md:text-3xl lg:text-4xl text-gray-800 font-bold">
              Bay Homes Real Estate Leasing Brokerage can be reached at
            </h1>
            <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 flex items-center ">
              <FaMapMarkerAlt className="mr-2 text-xl text-gray-800" /> Business Bay, Blue Bay Tower, Office 709
            </p>
            <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 flex items-center">
              <FaPhoneAlt className="mr-2 text-xl text-gray-800" />
              <a href="tel:+971503769694" className="hover:underline hover:text-orange-500 transition duration-150">
                +971 50 376 9694
              </a>
            </p>
            <p className="text-gray-600 mt-2 md:mt-3 lg:mt-4 flex items-center">
              <FaEnvelope className="mr-2 text-xl text-gray-800" />
              <a href="mailto:admin@bayhomesae.com" className="hover:underline hover:text-orange-500 transition duration-150">
                admin@bayhomesae.com
              </a>
            </p>
          </div>
          <div className="md:w-1/2 md:pl-6">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="w-full lg:w-full py-10 lg:px-32">
        <Map url='https://www.google.com/maps/place/Bay+Homes+Real+Estate+Leasing+Brokerage/@25.1876461,55.2680352,969m/data=!3m2!1e3!4b1!4m6!3m5!1s0x3e5f699aa8d186c3:0x1ad5c2cd733292fc!8m2!3d25.1876461!4d55.2706155!16s%2Fg%2F11y5b1h65q?entry=ttu&g_ep=EgoyMDI0MDkxNS4wIKXMDSoASAFQAw%3D%3D ' />
      </div>

      <div className="pt-6">
        <Heading title="Recommended for you" start />
        <ServicesContainer />
      </div>
    </Container>
  );
};

export default Page;
