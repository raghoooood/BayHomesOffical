import BlogContent from "@/app/components/blog/BlogContent";
import Breadcrumb from "@/app/components/Breadcrumb";
import ContactSection from "@/app/components/contact/ContactSection";
import Container from "@/app/components/container/Container";
import HeroContainer from "@/app/components/container/HeroContainer";
import { client } from "@/lib/sanityLip/createClient";
import { groq } from "next-sanity";

export const revalidate = 30;
const query = groq`*[_type == 'post']{
  ...,
  author->,
  categories[]->
} | order(_createdAt asc)`;

export default async function Home() {
  const posts = await client.fetch(query);

  const breadcrumbItems = [
    {
      label: 'News & Insights',
    },
  ];

  return (
    <Container>
      <div className="p-6 mt-10 ">
      <Breadcrumb items={breadcrumbItems}/>
      </div>
      <HeroContainer title={"News, Media Gallery & Insights"} description={"Take a look at the latest Real-estate News"}/>

      <BlogContent posts={posts} />

          <ContactSection/>
    </Container>
  );
}
