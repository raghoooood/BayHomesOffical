'use client';

import Container from '../container/Container';

interface HeroContainer2Props {
  title: string;
  description: string;
  className?: string;
}

const HeroContainer2: React.FC<HeroContainer2Props> = ({ title, description, className = '' }) => {
  return (
    <Container>
        <div className=" flex flex-col items-start justify-center h-full text-left text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-lg w-[64vw]">
      {title}
      </h1>       
  
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl font-light max-w-3xl">
            {description}  
        </p>
      </div>
    </Container>
  );
};

export default HeroContainer2;
