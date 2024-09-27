import AllProp from "@/app/components/property/AllProp";
import { searchProperties } from "@/lib/actions/searchProperties.action";
import { SearchParamsProps } from "@/types";

export const dynamic = 'force-dynamic';

const Page = async (params: { searchParams: SearchParamsProps }) => {
   const { searchParams, } = params; // Destructure selectedCurrency
   const properties = await searchProperties({ searchParams });
   const plainProperties = properties.map(property => property.toObject ? property.toObject() : property);

   return (
     <div className="relative py-10 px-4 sm:px-8 lg:px-10">
       <AllProp initialProperties={plainProperties} />
     </div>
   );
};

export default Page;
