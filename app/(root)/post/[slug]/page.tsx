import { groq } from "next-sanity";
import { Post } from "@/types";
import { client, urlFor } from "@/lib/sanityLip/createClient";
import Container from "@/app/components/blog/BlogContainer";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { RichText } from "@/app/components/RichText";

interface Props {
  params: {
    slug: string;
  };
}

export const revalidate = 30;

export const generateStaticParams = async () => {
  const query = groq`*[_type == 'post']{
        slug
    }`;
  const slugs: Post[] = await client.fetch(query);
  const slugRoutes = slugs.map((slug) => slug?.slug?.current);
  return slugRoutes?.map((slug) => ({
    slug,
  }));
};

const SlugPage = async ({ params: { slug } }: Props) => {
  const query = groq`*[_type == 'post' && slug.current == $slug][0]{
        ...,
        body,
        author->,
        publishedAt,
        mainImage
    }`;
  const post: Post = await client.fetch(query, { slug });

  return (
    <Container className="px-4 md:px-10 lg:px-20 py-10">
      <div className="flex flex-col items-center mb-10 text-center pt-12">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 mb-8">
          <p>By {post.author?.name || "Unknown Author"}</p>
          <p>{new Date(post._updatedAt).toLocaleDateString()}</p>
        </div>
        {post?.mainImage ? (
          <Image
            src={urlFor(post.mainImage).url()}
            width={800}
            height={400}
            alt="main image"
            className="object-cover w-full mb-10 rounded-lg"
          />
        ) : (
          <div className="w-full h-44 bg-gray-300 flex items-center justify-center mb-10">
            <p>No Image Available</p>
          </div>
        )}
      </div>
      <article className="prose lg:prose-xl max-w-none mx-auto">
        <PortableText value={post?.body} components={RichText} />
      </article>
    </Container>
  );
};

export default SlugPage;
