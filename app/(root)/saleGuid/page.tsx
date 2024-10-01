import Roadmap from '@/app/components/Roadmap';
import React from 'react';
import Accordion from '@/app/components/FaqContainer';
import SaleGuidHero from '@/app/components/guids/SaleGuidHero';
import Container from '@/app/components/container/Container';
import BlogHome from '@/app/components/blog/BlogHome';
import { client } from "@/lib/sanityLip/createClient";
import { groq } from "next-sanity";
import { getProperties } from "@/lib/actions/property.action";
import SaleGuidContent from '@/app/components/guids/SaleGuidContent';
import { salingSteps, AboutSelling } from '@/utils/faq'; // Importing the data


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
    <Container>
      
      <SaleGuidHero/>
             {/* Details Section */}
             <div id="properties" className="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-12 mt-12 space-y-12 md:space-y-0">

          <div>
            <h2 className="text-2xl font-semibold mb-4">Discover Real Estate Excellence with Bay Homes </h2>
            <p className="text-gray-700 leading-relaxed dark:text-gray-50">
            Whether you're looking for a new family home or exploring investment opportunities in Dubai, we're committed to making your property search smooth and enjoyable.

Ready to invest in Dubai’s thriving real estate market?  </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed dark:text-gray-50">
            Bay Homes offers a detailed step-by-step process for selling your home in Dubai, covering everything from determining the market value and preparing your Bay Homes property for sale to effectively listing and marketing it. With expert guidance, you can negotiate offers and finalize the sale smoothly. The guide also answers FAQs specific to Bay Homes, such as maximizing ROI, boosting home value through improvements, and handling the sale of mortgaged properties, all while emphasizing the benefits of working with a skilled real estate agent for a successful transaction.
            </p>
          </div>
        </div>
      <Roadmap steps={salingSteps} />
      <SaleGuidContent initialProperties={plainProperties}/>

      <BlogHome posts={posts} />
      <Accordion data={AboutSelling} areaName={'Selling'}  />

    </Container>
  );
};

export default Page;
