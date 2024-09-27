'use client'
import React, { useEffect, useState } from 'react';
import Container from '@/app/components/container/Container';
import Breadcrumb from '@/app/components/Breadcrumb';
import Heading from '@/app/components/Heading';
import PropCard from '@/app/components/property/PropCard';
import BookingViewForm from '../forms/BookingViewForm';
import { getPropertyCard } from '@/lib/actions/property.action';

interface BookingViewProps {
  propertyId: string;
}

const BookingView = ({ propertyId }: BookingViewProps) => {
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const result = await getPropertyCard({ propertyId });
        setProperty(result); // Set property data
      } catch (error) {
        console.error('Error fetching property:', error);
      } finally {
        setLoading(false);
      }
    };

    if (propertyId) {
      fetchProperty(); // Fetch property data when propertyId is available
    }
  }, [propertyId]);

  const breadcrumbItems = [
    { label: 'Booking View', 
    }, 
  ];

  // Render loading state, property card, or error
  return (
    <Container>
      <div className="pt-4 mx-auto px-4 mt-10">
      <Breadcrumb items={breadcrumbItems}/>
      <Heading title='Schedule a Viewing of Your Future Home!' subtitle='For inquiries regardiExplore properties with Bay Homes Real Estate, one of the most trusted names in the UAE.' start/>
        <section className="mb-5">
          <div className="space-y-5 mx-auto">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-6 md:mb-0">
                {/* Pass the property title to BookingViewForm */}
                {property && <BookingViewForm propertyName={property.title} />}
              </div>
              <div className="md:w-1/2 md:pl-9 px-8 ">
              {loading ? (
                  <div>Loading property details...</div>
                ) : property ? (
                  <PropCard
                    _id={property._id}
                    images={property.images}
                    title={property.title}
                    price={property.price}
                    location={property.location}
                    numOfrooms={property.numOfrooms}
                    numOfbathrooms={property.numOfbathrooms}
                    size={property.size}
                    area={property.area}
                  />
                ) : (
                  <div>Property not found</div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default BookingView;
