"use client";

import Image from "next/image";
import React from "react";
import buyGuidBg from "@/assets/images/buy-guid-bg2.jpg";
import SearchContainer from "../search/SearchContainer";
import HeroContainer from "../container/HeroContainer";
import Breadcrumb from "../Breadcrumb";


const breadcrumbItems = [
  { label: 'Sale Guides', 
    path: `/areas`
  }, 
]; 
const SaleGuidHero = () => {

  return (
    <section className="flex flex-col w-full h-screen ">

      <Image
        src={buyGuidBg}
        alt="sale guid bg image"
        fill
        className="w-full h-screen bg-no-repeat rounded-b-4xl object-cover object-center"
      />
    <div className="absolute inset-0 bg-gray-400 bg-opacity-30 z-10 "/>
    <div className="p-5 mt-12 z-20">

       <Breadcrumb  items={breadcrumbItems}/>
    </div>

         <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-20">
          <HeroContainer title={"Your Complete Guide to Selling"} description={"Navigate Dubai's real estate market with ease using our expert guides tailored to your needs."}/>
          <SearchContainer defaultPurpose="sale"  />
      </div>
    </section>
  );
};

export default SaleGuidHero;
