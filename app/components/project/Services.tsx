"use client"

import React from 'react';
import Project2Col from './Project2Col';

interface Props {
  backgroundImage: string;
  aminities: string[];
}

const Services = ({backgroundImage, aminities} : Props) => {
  return (
    <div className='flex justify-center items-center '>

        <Project2Col
          backgroundImage={backgroundImage}
          title="Amenities & Features"
          description="Upscale Living Spaces with an Extensive Amenity Terrace"
          aminities={aminities}
        />

          
    </div>
  );
};

export default Services;
