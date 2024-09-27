import Roadmap from '@/app/components/Roadmap';
import React from 'react';
import Accordion from '@/app/components/FaqContainer';
import BuyGuidContent from '@/app/components/guids/BuyGuidContent';
import BuyGuidHero from '@/app/components/guids/BuyGuidHero';
import { groq } from "next-sanity";
import { client } from "@/lib/sanityLip/createClient";
import { getProperties } from "@/lib/actions/property.action";
import BlogHome from '@/app/components/blog/BlogHome';
import { buySteps, AboutBuying } from '@/utils/faq'; // Importing the data

const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;


const Page = async () => {
 
  const properties = await getProperties();

  const posts = await client.fetch(query);
  const plainProperties = properties.properties.map(property => property.toObject ? property.toObject() : property);


  return (
    <div>
      
      <BuyGuidHero/>
             {/* Details Section */}
             <div id="properties" className="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-12 mt-12 space-y-12 md:space-y-0">

          <div>
            <h2 className="text-2xl font-semibold mb-4">Discover Real Estate Excellence with Bay Homes</h2>
            <p className="text-gray-700 leading-relaxed">
            Whether you're looking for a new family home or exploring investment opportunities in Dubai, we're committed to making your property search smooth and enjoyable.
            Ready to invest in Dubai’s thriving real estate market?
             </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
            Bay Homes is your trusted partner in turning your vision of ownership into a reality. Navigating the property buying process—especially in a new city or as a first-time buyer—can be daunting, but we’re here to make it simple. Our detailed property buying guide provides you with all the essential information to help you move confidently through Dubai’s real estate world.
            At Bay Homes Estate, we go beyond simply facilitating transactions. Our goal is to help you make strategic investment decisions that offer long-term financial growth and security. Let us lead you through the buying process with expert advice, ensuring your choices are both informed and rewarding for your future.
            </p>
          </div>
        </div>
      <div className='p-20'>
      <Roadmap steps={buySteps} />
      </div>
      <BuyGuidContent initialProperties={plainProperties}/>
      <BlogHome posts={posts} />
      <Accordion data={AboutBuying} areaName={'Buying Faq'}  />

    </div>
  );
};

export default Page;
