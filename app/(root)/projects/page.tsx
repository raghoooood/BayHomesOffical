
import ProjectContainer from "@/app/components/project/ProjectContainer";
import { getProjects } from "@/lib/actions/project.action";

export const dynamic = 'force-dynamic';

const Page = async () => {

  // const developer = await getDeveloper();

   const projects = await getProjects();
  const plainProjects = projects.projects.map((project: { toObject: () => any; }) => project.toObject ? project.toObject() : project);
  // const plainProperties = projects.projects.map(property => property.toObject ? property.toObject() : property);


  return (
    <div className="relative py-10 px-4 sm:px-8 lg:px-10">
      {/* <DeveloperHero developer={developer} /> */}
      <ProjectContainer initialProperties={plainProjects}  />

      
    </div>
  );
};

export default Page;

