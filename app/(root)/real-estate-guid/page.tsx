"use client";

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Container from '@/app/components/container/Container';
import Breadcrumb from '@/app/components/Breadcrumb';
import Heading from '@/app/components/Heading';
import HeroContainer from '@/app/components/container/HeroContainer';
import ContactSection from '@/app/components/contact/ContactSection';
import { motion } from "framer-motion"; 
import { slideIn } from '@/app/styles/animations';
import buyGuid from '@/assets/images/buy-guid-bg2.jpg';
import sellGuid from '@/assets/images/buy-guid_bg.jpg';
import mortGuid from '@/assets/images/mortgage.jpg';
import rentGuid from '@/assets/images/rent-guid.jpg';

const guides = [
  {
    imageSrc: rentGuid,
    title: 'Rent Guide',
    description: 'Get insights into renting a property with our comprehensive guide.',
    path: '/renantsGuid',
  },
  {
    imageSrc: buyGuid,
    title: 'Buy Guide',
    description: 'Discover essential tips and advice for buying a property.',
    path: '/buyGuid',
  },
  {
    imageSrc: sellGuid,
    title: 'Sale Guide',
    description: 'Learn how to sell your property quickly and efficiently.',
    path: '/saleGuid',
  },
  {
    imageSrc: mortGuid,
    title: 'Mortgages Guide',
    description: 'Understand mortgages and find the right option for you.',
    path: '/mortgages',
  },
];

const Page = () => {
  const router = useRouter(); // Next.js router for navigation
  const breadcrumbItems = [{ label: 'Real Estate Guide' }];

  return (
    <Container>
      {/* Hero Section */}
      <div className="p-4 sm:p-6 mt-6 sm:mt-8 mb-6 sm:mb-8">
        <Breadcrumb items={breadcrumbItems} />
        <div className="px-4 sm:px-6 lg:px-44">
          <HeroContainer 
            title="Unlock the Secrets of the Dubai Property Market with Top Real Estate Guides!" 
            description="Get expert insights whether you're buying, selling, or looking for the latest Dubai real estate updates. Our Dubai Property Guides provide a straightforward way to stay ahead in the market, ensuring you make smart, successful decisions with ease. Happy tenants, happy investors, happy homeowners – it all begins here!" 
          />
        </div>

        <div className="container mx-auto py-8 sm:py-12 px-4 sm:px-6 space-y-14">
          <Heading title="Expert Insights for Savvy Real Estate Decisions." start />
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8"
            initial="hidden"
            animate="show"
            variants={slideIn("right", "spring", 0.2, 1)}
          >
            {guides.map((guide, index) => (
              <motion.div
                key={index}
                onClick={() => router.push(guide.path)}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className="cursor-pointer"
              >
                <div className="relative h-48 w-full overflow-hidden rounded-lg shadow-lg">
                  <Image
                    src={guide.imageSrc}
                    alt={guide.title}
                    layout="fill"
                    objectFit="cover"
                    className="hover:scale-105 transition-transform duration-300 ease-out"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{guide.title}</h3>
                  <p className="text-gray-500">{guide.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      <ContactSection />
    </Container>
  );
};

export default Page;
