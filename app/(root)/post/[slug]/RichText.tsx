
import { urlFor } from "@/lib/sanityLip/createClient";
import Image from "next/image";
import Link from "next/link";

interface ImageValue {
  asset: {
    _id: string;
  };
  alt?: string;
}

export const RichText = {
  types: {
    image: ({ value }: { value: ImageValue }) => {
      if (!value.asset) {
        console.error("Image asset not found:", value);
        return null;
      }
      
      const imageUrl = urlFor(value.asset).url();
      return (
        <div className="flex items-center justify-center">
          <Image
            src={imageUrl}
            alt={value.alt || "Post image"}
            width={700}
            height={700}
            className="object-contain py-6"
          />
        </div>
      );
    },
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="ml-10 py-5 list-disc space-y-5">{children}</ul>
    ),
  },
  number: ({ children }: any) => (
    <ol className="mt-lg list-decimal">{children}</ol>
  ),
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-4xl py-10 font-bold">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-3xl py-10 font-bold">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-2xl py-10 font-bold">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="text-2xl py-10 font-bold">{children}</h4>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-blue-600 border-l-4 pl-5 py-5 my-5">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/") ? "noreferrer noopener" : undefined;
      return (
        <Link href={value.href} rel={rel} className="underline">
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => (
      <strong className="font-bold">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
  },
};
