import { SearchParamsProps } from "@/types";
import { connectToDatabase } from "../mongoose";
import Area from "@/database/Area.model";
import Property from "@/database/property.model";
import { getConvertedPrice } from "../utils";
import { useCurrency } from "@/app/components/hooks/useCurrency";

export const searchProperties = async (params: { searchParams: SearchParamsProps}) => {
 
  try {
    await connectToDatabase();

    const { searchParams  } = params;
    console.log('Received search parameters:', searchParams);

    // Initialize filters
    let filters: { [key: string]: any } = {};

    // Apply filters based on search parameters
    if (searchParams.propertyType) filters.propertyType = searchParams.propertyType;
    if (searchParams.purpose) filters.purpose = searchParams.purpose;
    if (searchParams.featured) filters.featured = searchParams.featured;
    if (searchParams.projectName) filters.projectName = searchParams.projectName;

    // Check if priceMin and priceMax are valid numbers before applying filters
    if (searchParams.priceMin) {
      const priceMin = parseFloat(String(searchParams.priceMin).replace(/[^\d.-]/g, '')); // Remove any non-numeric characters
      if (!isNaN(priceMin)) {
        filters.price = { ...filters.price, $gte: priceMin };
      }
    }
    
    if (searchParams.priceMax) {
      const priceMax = parseFloat(String(searchParams.priceMax).replace(/[^\d.-]/g, ''));
      if (!isNaN(priceMax)) {
        filters.price = { ...filters.price, $lte: priceMax };
      }
    }

    if (searchParams.bedsMax) filters.numOfrooms = { ...filters.numOfrooms, $lte: searchParams.bedsMax };
    if (searchParams.bedsMin) filters.numOfrooms = { ...filters.numOfrooms, $gte: searchParams.bedsMin };
    if (searchParams.classification) filters.classification = searchParams.classification;

    // Process area filter if provided
    if (searchParams.area) {
      const areaNames = searchParams.area.split(',').map(name => name.trim());
      console.log('Area names:', areaNames);

      const areaIds = await Area.find({ areaName: { $in: areaNames } }).distinct('_id');
      console.log('Area IDs:', areaIds);

      filters.area = { $in: areaIds };
    }

    console.log('Using filters:', filters);

    // Query the database
    const properties = await Property.find(filters).populate('area');
    console.log('Fetched properties:', properties);

    return properties;
  } catch (error) {
    console.error("Error fetching properties:", error);
    throw error;
  }
};
