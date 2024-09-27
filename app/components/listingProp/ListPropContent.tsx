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
            <div className="md:w-1/2 mb-6 md:mb-0">
              <Image
                src={ListYourProp2}
                alt="listing prop Image"
                layout="responsive"
                width={100}
                height={50}
                className="rounded-md"
                placeholder="blur"
              />
            </div>
            <div className="md:w-1/2 md:pr-6">
              <h3 className="text-2xl sm:text-4xl font-semibold mb-2 text-gray-800 dark:text-white">
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
            <div className="flex flex-col md:flex-row mb-10 space-y-10 sm:space-y-0 sm:space-x-6 dark:blueCardTitle">
              {listingPropSteps.map((step, index) => (
                <Steps_Card
                  key={index}
                  step_number={step.step_number}
                  title={step.title}
                  description={step.description}
                  icon={<step.icon />}  // You need to use the icon as a JSX component here
                />
              ))}
            </div>
          </div>
        </div>

        {/* List Your Property Form Section */}
        <section className="space-x-5 bg-gray-50 dark:bg-CardDark px-20 mt-10 relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 dark:text-white">
              <h2 className="text-2xl font-semibold mb-4">Meet with our experts to discuss your property and objectives</h2>
              <p className="text-lg mb-4">List, Sell & Succeed with Us</p>
              <ul className="list-disc list-inside mb-4 text-xl font-bold p-3">
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
            <div className="md:w-1/2 p-10" id="listProp-form">
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
