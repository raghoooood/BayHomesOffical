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
    <section className="flex flex-col w-full h-screen ">
      <Image
        src={heroBg}
        alt="bg image"
        fill
        className="w-full h-screen bg-no-repeat rounded-b-4xl object-cover object-center"
      />
         <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 ">
        <SmallTitleText title="The best way to" textStyles="text-center text-gray-100 "/>
        
        <LargeTypingText title="Find Your Dream Home" textStyles="text-center text-gray-50 "/>
          
          <SmallTitleText title="Home to lucrative opportunities" textStyles="text-center text-gray-100"/>         
        <div className="w-full max-w-2xl mt-10">
          <SearchContainer />
        </div>
         {/* Conditionally render the link */}
         <Link
          href={totalProjects > 1 ? "/projects" : `/projects/${projectName}`}
          className="block text-white hover:text-orange-500 pt-5 sm:pt-10 text-md font-semibold underline uppercase"
        >
          Register your interest now
        </Link>
      </div>
    
    </section>
  );
};

export default Hero;
