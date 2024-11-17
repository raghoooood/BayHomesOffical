"use client"

import Image from 'next/image';
import ListYourPropForm from '../forms/ListYourPropForm';
import insta1 from '@/assets/images/insta1.png'

const ListYourProp = () => {
  return (
    <div className="container mx-auto py-10 px-5">
      <section className="mb-10">
        <h1 className="text-4xl font-bold mb-5 text-center">List Your Property</h1>
        <p className="text-lg text-center mb-10">
          Whether you are looking to sell, rent, or manage your property, our team of experienced professionals is here to assist you. List your property with us and reach a wider audience.
        </p>
        <div className="relative w-full h-80 mb-5">
          <Image
            src={insta1}
            alt="Property Listing Image"
            layout="fill"
            objectFit="cover"
            className="rounded-md"
          />
        </div>
      </section>

      <section>
        <ListYourPropForm />
      </section>
    </div>
  );
};

export default ListYourProp;
