"use client";

import Image from 'next/image';
import dynamic from 'next/dynamic';
import Container from '@/app/components/container/Container';
import ListYourProp2 from '@/assets/images/about.jpg';
import { FaCheckCircle } from 'react-icons/fa';
import Steps_Card from '../Steps_Card';
import Heading from '../Heading';
import { reasons, listingPropSteps, listingPropData } from '@/utils/faq'; // Importing the data

const ListYourPropForm = dynamic(() => import('../forms/ListYourPropForm'), {
  ssr: false,
});
const Accordion = dynamic(() => import('@/app/components/FaqContainer'), {
  ssr: false,
});

const ListPropContent = () => {
  return (
    <Container>
      <section className="mb-10">
        <div className="space-y-10">
          {/* First Layout: Image on Right, Text on Left */}
          <div className="flex flex-col md:flex-row-reverse items-center">
            <div className="md:w-1/2 mb-6 md:mb-0 px-4">
              <Image
                src={ListYourProp2}
                alt="Listing Prop Image"
                layout="responsive"
                width={100}
                height={50}
                className="rounded-md"
                placeholder="blur"
              />
            </div>
            <div className="md:w-1/2 md:pr-6 px-4">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-2 text-gray-800 dark:text-white">
                Why list your property with Bay Homes?
              </h3>
              <div className="space-y-4 mt-5">
                {reasons.map((reason) => (
                  <div key={reason.id} className="flex items-center">
                    <FaCheckCircle className="text-orange-500 mr-2" />
                    <p className="text-gray-700 dark:text-gray-300">{reason.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
{/* Second Layout: Steps Section */}
<div className="py-8 px-4 sm:px-6 lg:px-8 space-y-10">
  <Heading title="Journey to Listing Your Property" start />
  <div className="flex flex-col md:flex-row md:space-x-6 space-y-10 md:space-y-0 mb-10 dark:blueCardTitle">
    {listingPropSteps.map((step, index) => (
      <Steps_Card
        key={index}
        step_number={step.step_number}
        title={step.title}
        description={step.description}
        icon={<step.icon />}  // Use the icon as a JSX component here
      />
    ))}
  </div>
</div>

        </div>
{/* List Your Property Form Section */}
<section className="bg-gray-50 dark:bg-CardDark px-4 sm:px-6 lg:px-8 pt-10 relative">
  <div className="flex flex-col lg:flex-row items-center justify-center">
    {/* Left Content Section */}
    <div className="lg:w-1/2 mb-10 dark:text-white px-4">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
        Meet with our experts to discuss your property and objectives
      </h2>
      <p className="text-lg mb-4">List, Sell & Succeed with Us</p>
      <ul className="list-disc list-inside mb-4 text-lg sm:text-xl font-bold p-3">
        <li>Initial Consultation</li>
        <li>Property Valuation</li>
        <li>Marketing Strategy</li>
        <li>Negotiation & Sale</li>
      </ul>
      <p className="text-lg mb-4">
        We assess your property’s market value based on current market conditions. Don’t miss out on our expertise. Contact Bay Homes today!
      </p>
    </div>

    {/* List Your Property Form */}
    <div className="w-full lg:w-1/2 p-4 lg:p-10">
      <ListYourPropForm />
    </div>
  </div>
</section>




        {/* FAQ Section */}
        <div className="mt-10 flex justify-center">
          <Accordion data={listingPropData} areaName="Listing Property" />
        </div>
      </section>
    </Container>
  );
};

export default ListPropContent;
