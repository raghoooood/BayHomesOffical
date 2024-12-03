import Roadmap from '@/app/components/Roadmap';
import React from 'react';
import Accordion from '@/app/components/FaqContainer';
import { groq } from "next-sanity";
import { client } from "@/lib/sanityLip/createClient";
import { getProperties } from "@/lib/actions/property.action";
import RentGuidContent from '@/app/components/guids/RentGuidContent';
import RentGuidHero from '@/app/components/guids/RentGuidHero';
import BlogHome from '@/app/components/blog/BlogHome';
import Container from '@/app/components/container/Container';
import { rentingSteps, AboutRenting } from '@/utils/faq'; // Importing the data

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
      
      <RentGuidHero/>
             {/* Details Section */}
             <div id="properties" className="max-w-screen-lg grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-12 mt-10 space-y-10 md:space-y-0">

          <div>
            <h2 className="text-2xl font-semibold mb-4">Renting Guide for Dubai</h2>
            <p className="text-gray-700 leading-relaxed dark:text-gray-50">
            Many renters spend months looking for the perfect place, often settling for less or paying more than expected. Avoid that frustration with Provident. With our expertise, you&apos;ll find the ideal property at the right price, saving you both time and money.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed mx-auto w-full dark:text-gray-50">Renting a property in Dubai comes with its own set of challenges—sorting through options, negotiating contracts, and handling paperwork. Whether you&rsquo;re searching for a long-term rental through us, we&apos;ll secure the best payment options to fit your budget. Plus, we&apos;ll handle the registration in-house, saving you time and effort.
            So, why stress over the complexities of renting? Let us guide you through the process and make renting in Dubai simple and stress-free. Dive into our guide for a hassle-free experience.
            </p>
          </div>
        </div>
      <div className='p-20'>
      <Roadmap steps={rentingSteps} />
      </div>
      <RentGuidContent initialProperties={plainProperties}/>
      <BlogHome posts={posts} />
      <Accordion data={AboutRenting} areaName={'Renting'}  />

    </Container>
  );
};

export default Page;
