"use client";
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

interface AgentCardProps {
  agentImage: StaticImageData;
  agentName: string;
  agentPosition: string;
  _id: string;
}

const AgentCard: React.FC<AgentCardProps> = ({
  agentImage,
  agentName,
  agentPosition,
  _id
}) => {
  const router = useRouter();

  // Load environment variables
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const phoneNumber = process.env.NEXT_PUBLIC_PHONE_NUMBER || '';

  const handleIconClick = (path: string) => {
    window.location.href = path; // External link handling
  };

  const handleWhatsAppClick = () => {
    const message = `Hello, I am interested in ypur property ${agentName}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden sticky top-5">
      {/* First Row: Icons */}
      <div className="flex justify-around items-center p-4 bg-white border-b border-gray-300">
        <button onClick={() => handleIconClick(`/booking-view/${_id}`)} aria-label="Book Viewing" className="text-white bg-sky-900 p-3 items-center rounded-lg text-xs flex duration-300 hover:scale-105">
          <FaEnvelope size={22} className='mx-2' />
          Book view now
        </button>
        <button
          onClick={() => handleIconClick(`tel:${phoneNumber}`)}
          aria-label="Call"
          className="text-sky-900 bg-gray-200 p-3 rounded-lg duration-300 hover:scale-105"
        >
          <FaPhoneAlt size={22} />
        </button>
        <button
          onClick={handleWhatsAppClick} // Changed to use handleWhatsAppClick
          aria-label="WhatsApp"
          className="text-green-600 bg-gray-200 p-3 rounded-lg duration-300 hover:scale-105"
        >
          <FaWhatsapp size={22} />
        </button>
      </div>

      {/* Second Row: Agent Details */}
      <div className="flex p-4">
        {/* Agent Image */}
        <div className="flex-shrink-0 w-16 h-16 rounded-full overflow-hidden">
          <Image src={agentImage} alt={`${agentName}'s profile`} className="w-full h-full object-cover" />
        </div>
        {/* Agent Info */}
        <div className="ml-4 flex flex-col justify-center">
          <span className="text-lg font-semibold dark:text-black">{agentName}</span>
          <span className="text-gray-500">{agentPosition}</span>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
