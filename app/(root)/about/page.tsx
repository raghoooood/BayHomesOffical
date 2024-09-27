/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from 'next/image';
import insta1 from '@/assets/images/about.jpg';
import valuesImg from '@/assets/images/rent-guid.jpg';
import aboutimg from '@/assets/images/aboutus.jpg';
import Button from '@/app/components/buttons/Button';
import { useRouter } from "next/navigation";
import Breadcrumb from '@/app/components/Breadcrumb';
import { LargeTypingText, SmallTitleText, TypingText } from '@/app/styles/CustomTexts';
import { fadeIn } from '@/app/styles/animations';
import { motion } from "framer-motion"; 

const Page = () => {
  const router = useRouter();

  const breadcrumbItems = [
    { label: 'About' }, 
  ];

  return (
    <motion.div
      variants={fadeIn("top", "tween", 0.2, 1)}
      initial="hidden"
      whileInView="show"
      className="px-4 md:px-6 lg:px-10"
    >
      {/* Hero Section */}
      <div className="mt-20 sm:mt-10 mb-8">
        <Breadcrumb items={breadcrumbItems}/>
        <div className="relative  w-full h-[40vh] sm:h-[30vh] lg:h-[50vh] text-black flex flex-col items-center justify-center">
          <LargeTypingText title="Our Story" textStyles="text-center" />
          <SmallTitleText title='Bay Homes Real Estate Leasing Brokerage, established in 2021, is a rising player in the real estate sector, committed to delivering exceptional real estate experiences.' textStyles="text-center" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 my-6 w-full">
          <Button label='Meet our Team' onClick={() => router.push('/our-team')} />
          <Button label='Contact our Team' onClick={() => router.push('/contact')} noutline black_text  />
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[80vh] mb-10">
          <Image
            src={insta1}
            alt="Office Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </div>

      {/* Our Mission Section */}
      <motion.div
        variants={fadeIn("top", "tween", 0.2, 1)}
        initial="hidden"
        whileInView="show"
      >
        <div className="space-y-10">
          {/* First Layout: Image on Left, Text on Right */}
          <div className="flex flex-col md:flex-row items-center mb-10">
            <div className="order-2 md:order-1 md:w-1/2 mb-6 md:mb-0">
              <Image
                src={aboutimg}
                alt="Mission Image"
                layout="responsive"
                width={500}
                height={300}
                className="rounded-md"
              />
            </div>
            <div className="order-1 md:order-2 md:w-1/2 md:pl-6 p-5">
              <TypingText title='Our Mission' textStyles="font-extrabold text-4xl" />
              <p className="text-sm md:text-lg text-gray-600">
                Providing exceptional real estate services that connect buyers and sellers with unparalleled expertise and personalized care.
              </p>
            </div>
          </div>

          {/* Second Layout: Image on Right, Text on Left */}
          <div className="flex flex-col md:flex-row-reverse items-center mb-10">
            <div className="md:w-1/2 mb-6">
              <Image
                src={valuesImg}
                alt="Values Image"
                layout="responsive"
                width={500}
                height={300}
                className="rounded-md"
              />
            </div>
            <div className="md:w-1/2 md:pl-6 p-5">
              <TypingText title="Our Values" textStyles="font-extrabold text-4xl"/>
              <p className="text-sm md:text-lg text-gray-600">
                Our values revolve around trust, reliability, and a deep commitment to creating lasting relationships with property owners, tenants, and investors.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Page;
