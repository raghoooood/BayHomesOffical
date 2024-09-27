import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanityLip/createClient";
import { Post } from "@/types";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link
      href={{
        pathname: `/post/${post?.slug?.current}`,
        query: { slug: post?.slug?.current },
      }}
      key={post?._id}
    >
      <div className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full md:h-[350px]">
        <div className="relative flex-shrink-0 h-[200px] sm:h-[250px] md:h-[180px] w-[385px]">
          {post?.mainImage && (
            <Image
              src={urlFor(post?.mainImage).url()}
              width={500}
              height={250}
              alt="blog post image"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-col justify-between p-4 flex-grow">
          <h2 className="text-md md:text-lg font-semibold hover:text-orange-600 dark:text-gray-800 transition-colors duration-200">
            {post?.title}
          </h2>
          <h4 className="text-sm md:text-md  dark:text-gray-800 transition-colors duration-200">
           <span className="font-semibold">created by : </span> {post?.author?.name}
          </h4>
          <div className="text-sm md:text-base text-gray-700 line-clamp-3 font-semibold">
            {post?.description.length > 200 ? (
              <>
                {post?.description.slice(0, 100)}...
                <span className="text-orange-600"> Read More</span>
              </>
            ) : (
              post?.description
            )}
          </div>
          <p className="text-gray-500 text-xs md:text-sm">
            {new Date(post?._createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
