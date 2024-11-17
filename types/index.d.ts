

export interface SearchParamsProps {
  sortBy?: string;
  purpose?: string | null;
  propertyType?: string | null;
  area?: string | null;  // Optional to handle `null` or `undefined`
  bedsMin?: string | 0;
  bedsMax?: string | 0;
  priceMin?: number | 0;
  priceMax?: number | 0;
  searchQuery?: { [key: string]: string | undefined };
  searchParams?: { [key: string]: string | undefined };
  filter?: { [key: string]: string | undefined };
  page?: number;
  pageSize?: number;
  price?: number;
  classification?: string | null;  // Optional to handle `null` or `undefined`
  [key: string]: any;
}





export interface URLProps {
  params: { id: string };
  searchParams: { [key: string]: string | undefined };
}


export interface TeamMemberCardProps {
  name: string;
  position: string;
  imageUrl: string;
}

export interface PropItemType {
  createdAt?: string | number | Date;
  price: number;
  toObject?: any;
  _id?: string;
  images?: string[];
  title?: string;
  numOfbathrooms?: number;
  location?: {
    city: string;
    state: string;
    street: string;
  };
  numOfrooms: number;
  area?: string;
  size?: string;
  description?: string;
  featured?:boolean;
  propertyType?:string;
  purpose?:string;
  
}

//sanity type
type Base = {
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
};

export interface Post extends Base {
  author: Author;
  body: Block[];
  categories: Category[];
  mainImage: Image;
  slug: Slug;
  title: string;
  description: string;
}

interface Author extends Base {
  description: string;
  image: Image;
  name: string;
  slug: Slug;
}

interface Image {
  _type: "image";
  asset: Reference;
}

interface Reference {
  _type: "slug";
  current: string;
}

interface Slug {
  _type: "slug";
  current: string;
}

interface Block {
  _key: string;
  _type: "block";
  children: Span[];
  markDefs: any[];
  style: "normal" | "h1" | "h2" | "h3" | "h4" | "bloackquote";
}

interface Span {
  _key: string;
  _type: "span";
  marks: string[];
  text: string;
}

interface Category extends Base {
  description: string;
  title: string;
}
