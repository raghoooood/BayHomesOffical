import ContactSection from '@/app/components/contact/ContactSection';
import Container from '@/app/components/container/Container';
import HeroContainer from '@/app/components/container/HeroContainer';
import TestimonialCard from '@/app/components/testimonial/TestimonialCard';

import { testimonials } from '@/utils/testimonialsData';
import Breadcrumb from '@/app/components/Breadcrumb';
import { LargeTypingText, SmallTitleText } from '@/app/styles/CustomTexts';

const breadcrumbItems = [
  {
    label: 'Reviews',
  },
];

const Page: React.FC = () => {
  return (
    <Container>
      <div className="p-6 mt-10">
        <Breadcrumb items={breadcrumbItems} />
        <div className='p-4 md:p-12 space-y-6'> {/* Adjusted padding for smaller screens */}
          <LargeTypingText title="Why Our Clients Trust Us" textStyles="text-center text-2xl md:text-4xl" /> {/* Responsive text size */}
          <SmallTitleText title="Discover what our customers are saying about their experiences." textStyles="text-center text-sm md:text-lg" /> {/* Responsive text size */}
        </div>
      </div>
      
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4"> {/* Added padding to grid for small devices */}
        {testimonials.map((t, index) => (
          <TestimonialCard
            key={index}
            name={t.name}
            date={t.date}
            rating={t.rating}
            testimonialTitle={t.testimonialTitle}
            testimonial={t.testimonial}
          />
        ))}
      </div>

      <ContactSection />
    </Container>
  );
};

export default Page;
