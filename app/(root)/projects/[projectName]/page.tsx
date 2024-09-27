import React from 'react';
import Container from '@/app/components/container/Container';
import { getProjectByName } from '@/lib/actions/project.action';
import ProjectGallery from '@/app/components/project/ProjectGallery';
import Services from '@/app/components/project/Services';
import ContactProject from '@/app/components/contact/ContactProject';
import RegisterButton from '@/app/components/project/RegisterButton';
import FloorPlans from '@/app/components/project/FloorPlans';
import DeveloperHero from '@/app/components/project/DeveloperHero';
import { sanitizeHtmlContent } from '@/lib/utils';
import ProjectMap from '@/app/components/project/ProjectMap';
import Breadcrumb from '@/app/components/Breadcrumb';


const ProjectDetails: React.FC = async ({ params }: any) => {

  // Fetch the area data based on areaName
   const result = await getProjectByName({ projectName : params.projectName });

   if (!result) {
    return <div>Project not found</div>;
  }
  const sanitizedDescription = sanitizeHtmlContent(result.description);
  const breadcrumbItems = [{ label: result.projectName }];
  const floorPlans = result.floorPlans.map((plan: any) => ({
    floorImage: plan.floorImage,
    floorType: plan.floorType,
    floorSize: plan.floorSize,
    numOfrooms: plan.numOfrooms,
  }));
  return (
    <Container>
      <section className="flex flex-col w-full">
        {/* Banner Section */}
        <div
          className="relative h-[80vh] w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] h-screen bg-no-repeat bg-cover bg-center"
           style={{ backgroundImage: `url(${result.images.backgroundImage})` }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-60 "></div>

          {/* Centered Content */}
          <div className="relative flex flex-col items-start justify-center h-full text-left text-white  px-20 space-y-10 ">
          <Breadcrumb items={breadcrumbItems} />
            <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg">
               {result.projectName} 
            </h1>
            <p className="mt-4 text-lg md:text-xl font-light max-w-3xl">
               Discover the unique charm and vibrant life of {result.projectName}. 
            </p>
            <h5 className='text-md opacity-0.9'>by <span className='font-bold underline'>{result.developer.developerName}</span></h5>
          <RegisterButton/>
          </div>      
        </div>

  {/* <div id="properties" className="grid grid-cols-1 md:grid-cols-2 gap-12 p-6 md:p-12 mt-12"> */}
  {/* Left Side: Description */}
  <div className="relative  p-6 md:p-12 mt-12 rounded-lg shadow-lg">
  <h2 className="text-lg md:text-xl text-orange-500 font-semibold uppercase tracking-wide mb-4">About the Project</h2>
  <hr className="border-t-2 border-orange-500 w-16 mb-8" />
  
  <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 max-w-[65vw]">
    <p 
      className="text-md md:text-lg text-gray-800 leading-loose md:leading-relaxed max-w-4xl"
      dangerouslySetInnerHTML={{ __html: sanitizedDescription }}>
    </p>
    </div>
</div>


  {/* Right Side: Project Details */}
  <div className="flex flex-col justify-center items-center space-y-12 ">
 
</div>
{/* </div> */}


       <ProjectGallery images={{ outImages: result.images.outImages || [], inImages: result.images.inImages || [] }} />
      
       {result.floorPlans && result.floorPlans.length > 0 && (
          <FloorPlans 
          floorPlans={floorPlans }           
          />
    )}

          <div className='space-y-10 py-10 justify-between'>
          <Services backgroundImage={result.images.backgroundImage} aminities={result.aminities}/>
          <ProjectMap mapURL={result.mapURL} projectName={result.projectName} aboutMap={result.aboutMap}/>
          <DeveloperHero developerName={result.developer.developerName} description={result.developer.description} image={result.developer.image}/>
          <ContactProject/>
          </div>

      </section>
    </Container>
  );
};

export default ProjectDetails;
