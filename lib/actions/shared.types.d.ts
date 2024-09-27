import { Schema } from "mongoose";

export interface SearchParams {
    area: boolean;
    buyOrRent: boolean;
    priceMin: boolean;
    minPrice: any;
    maxPrice: boolean;
    minBedrooms: boolean;
    maxBedrooms: boolean;
    minSize: boolean;
    maxSize: boolean;
    location: boolean;
    amenities: boolean;
    filter: string | undefined;
    query?: string | null;
    type?: string | null;
    featured: boolean;
    projectName: boolean;
    
  }

  export interface GetPropretiesParams {
    page?: number;
    pageSize?: number;
    searchQuery?: string;
    filter?: string;
    image?: string;
    propertyId?:string;
  }

  export interface GetPropertiesByIdParams {
     propertyId : string;
     query?: string | null;
  }
  export interface GetAreasByNameParams {
    areaName : string;
    query?: string | null;
 }

 export interface GetProjectsByNameParams {
  developer : string;
  query?: string | null;
}

 
  
