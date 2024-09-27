'use client'
import Image from 'next/image';
import Container from '@/app/components/container/Container';
import whyUsImg from '@/assets/images/whyUs.jpg';
import MortgageCalculator from './MortgageCalculator';
import Steps_Card from '../Steps_Card';
import ContactSection from '../contact/ContactSection';
import Heading from '../Heading';
import Accordion from '@/app/components/FaqContainer';
import { MortReasons, MortgageData, mortgageSteps } from '@/utils/faq'; // Importing the data
import {FaCheckCircle } from 'react-icons/fa';

const MortgageContent = () => {
  return (
    <Container>
      {/* Our Mission Section */}
      <section className="mb-10">
        <div className="space-y-10">
          {/* First Layout: Image on LEFT, Text on RIGHT */}
       

          <div className="flex flex-col md:flex-row items-center mb-10">
  <div className="w-full md:w-1/2 mb-6 md:mb-0">
    <Image
      src={whyUsImg}
      alt="Mission Image"
      layout="responsive"
      width={800}  // Larger width for small devices
      height={500} // Larger height for small devices
      className="rounded-md md:w-full md:h-auto"
    />
  </div>
  <div className="md:w-1/2 md:pl-6">
    <div className="space-y-4 mt-5">
      <h3 className="text-2xl sm:text-4xl font-semibold mb-4 text-gray-700">
        Why list your property with Bay Homes?
      </h3>
      {MortReasons.map((reason) => (
        <div key={reason.id} className="flex items-center">
          <FaCheckCircle className="text-orange-500 mr-2" />
          <p className="text-gray-700 dark:text-white">
            {reason.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</div>

          {/* Content and Form Section */}
          <section className="space-x-5 bg-gray-50 mt-10 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">    
         <div className="flex flex-col md:flex-row items-center justify-center p-10">
              {/* Mortgage Calculator */}
              <div className="md:w-3/4 w-full" id='calculator'>
                <MortgageCalculator
                  result={{
                    price: 0,
                  }}
                />
              </div>
            </div>
          </section>

          {/* Steps Cards Section */}
          <Heading title='Why Work With Us' start/>
          <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6">
            {mortgageSteps.map((step, index) => (
              <Steps_Card
                key={index}
                step_number={step.step_number}
                title={step.title}
                description={step.description}
                icon={<step.icon />} 
              />
            ))}
          </div>


        <ContactSection />
   

<Accordion data={MortgageData} areaName={'Mortgage'}  />


        </div>
      </section>
    </Container>
  );
};

export default MortgageContent;
