import Image, { StaticImageData } from 'next/image';

interface PremitCardProps {
  imageSrc: StaticImageData;
  permitNumber: string;
}

const PremitCard: React.FC<PremitCardProps> = ({ imageSrc, permitNumber }) => {
  return (
     <div className="flex items-center p-5">
      {/* Card Image */}
      <div className="w-24 h-24">
        <Image 
          src={imageSrc} 
          alt="Permit Card Image" 
          width={96} 
          height={96} 
          className="rounded-md object-cover" 
        />
      </div>

      {/* Card Content */}
      <div className="ml-5 flex flex-col justify-center">
        <h4 className="text-xl font-semibold">Premit No</h4>
        <p className="text-gray-700 dark:text-white">{permitNumber}</p>
      </div>
    </div>
  );
};


export default PremitCard;
