"use server"

import Property from "@/database/property.model";
import { connectToDatabase } from "../mongoose";
import Area from "@/database/Area.model";

export async function getProperties(p0?: { areaId: any, projectId: any; }) {
  try {
    connectToDatabase();
    const properties = await Property.find({status: 'active'})
      .populate({ path: 'area', model: Area, select: '_id areaName ' })
      .sort({ price: -1 });

    console.log("Fetched properties with populated data: ", properties);  // Debug log
    return { properties };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPropertyById(params: { propertyId: string }) {
  try {
    await connectToDatabase();
    const { propertyId } = params;
    const property = await Property.findById(propertyId)
      .populate({ path: 'area', model: Area, select: '_id areaName' });
          
      return property;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getPropertyCard(params: { propertyId: string }) {
  try {
    await connectToDatabase();
    const { propertyId } = params;
    const property = await Property.findById(propertyId)
      .populate({ path: 'area', model: Area, select: '_id areaName' })
      .lean();
    return property;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

