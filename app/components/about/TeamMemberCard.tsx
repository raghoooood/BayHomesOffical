"use client"
import Image from 'next/image';
import { TeamMemberCardProps } from '@/types'; // Ensure this type matches your props

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ name, position, imageUrl }) => {
  return (
    <div className="flex flex-col items-center p-5">
      <div className="relative w-32 h-32 mb-4">
        <Image src={imageUrl} alt={name} layout="fill" objectFit="cover" className="rounded-full" unoptimized />
      </div>
      <h3 className="text-xl font-bold mb-1">{name}</h3>
      <p className="text-gray-500">{position}</p>
    </div>
  );
};

export default TeamMemberCard;
