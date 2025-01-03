"use client";

import Image from "next/image";
import React from "react";
import heroBg from "@/assets/images/Image13.jpg";
import SearchContainer from "../search/SearchContainer";
import { SmallTitleText, LargeTypingText } from '@/app/styles/CustomTexts';
import Link from 'next/link';

interface Props {
  projectName: string;
  totalProjects: number;
}

const Hero : React.FC<Props> = ({
  projectName,
  totalProjects,

}) => {
  return (
    <section className="flex flex-col w-full max-w-7xl h-screen ">
      <Image
        src={heroBg}
        alt="bg image"
        fill
        className="w-full h-screen bg-no-repeat rounded-b-4xl object-cover object-center"
      />
         <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 ">
        <SmallTitleText title="Use Our Property Finder to Filter" textStyles="text-center text-gray-100 "/>
        <LargeTypingText
  title="Residential, Commercial & Industrial Properties."
  textStyles="text-center text-orange-500 max-w-[90%] sm:max-w-[80%] md:max-w-[60%] lg:max-w-[200%] leading-snug break-words sm:text-2xl md:text-3xl lg:text-3xl xl:text-4xl"
/>


        
          
          <SmallTitleText title="Buy, Sell, Rent Now!" textStyles="text-center text-gray-100"/>         
        <div className="w-full max-w-2xl mt-10">
          <SearchContainer />
        </div>
         {/* Conditionally render the link */}
         <Link
  href={totalProjects > 1 ? "/projects" : `/projects/${projectName}`}
  className="block text-orange-500 hover:text-orange-300 pt-5 sm:pt-5 text-md font-semibold underline uppercase"
  style={{
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)", // Add shadow
  }}
>
  new launch coming soon
</Link>

      </div>
    
    </section>
  );
};

export default Hero;
