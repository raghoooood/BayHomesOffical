
import BookingView from '@/app/components/booking-view/BookingView';
import { title } from 'process';

interface PageProps {
  params: { id: string };
}

const Page: React.FC<PageProps> = async ({ params }) => {
  const { id } = params;

  

  return (
    <>
      <BookingView propertyId={id} />
    </>
  );
};

export default Page;
