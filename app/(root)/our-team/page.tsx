import TeamMemberCard from '../../components/about/TeamMemberCard';
import { getemployees } from "@/lib/actions/employee.action";
import Container from '../../components/container/Container';
import Breadcrumb from '@/app/components/Breadcrumb';
import { LargeTypingText, SmallTitleText } from '@/app/styles/CustomTexts';
import { agentsData } from '@/utils/agentsData'; 

const AboutTeam = async () => {
  const teamMembers = await getemployees({});
  const breadcrumbItems = [
    { label: 'Our Team' }, 
  ];

  // Combine both arrays if necessary
  const combinedTeamMembers = [...teamMembers.employees, ...agentsData];

  return (
    <Container>
      {/* Hero Section */}
      <div className="p-6 mt-10 mb-8">
        <Breadcrumb items={breadcrumbItems}/>

        <div className="relative w-full h-[30vh] max-h-[400px] text-black flex flex-col items-center justify-center rounded-lg p-6">
          <LargeTypingText title="Our Team" textStyles="text-center" />
          <SmallTitleText title='Our team comprises real estate professionals with a wealth of experience in Dubai’s real estate market. Each member brings unique skills and expertise, contributing to our collective success in delivering top-notch leasing solutions.' />          
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-12">
          {combinedTeamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              position={member.position}
              imageUrl={member.imageUrl || member.image} // Use the appropriate image source
            />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AboutTeam;
