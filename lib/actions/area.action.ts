"use server"

import { AreaCardData } from "@/utils/areaCardData";
import { connectToDatabase } from "../mongoose";
import Area from "@/database/Area.model";
import { GetAreasByNameParams } from "./shared.types";

 
export async function getAreas(letter: string)  {
    try {
        await connectToDatabase();
    
        const areas = await Area.find({ areaName: new RegExp(`${letter}`, 'i') }).select('areaName');
        console.log("Letter" , letter);
        console.log("Areas" , areas);
        return {areas};
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getAllAreas()  {
    try {
        await connectToDatabase();
    
        const areas = await Area.find().sort({createdAt : -1});
        return {areas};
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getAreaByName(params: GetAreasByNameParams) {
    try {
      connectToDatabase();
  
   
      const { areaName } = params;
  
      // Decode URL-encoded characters (like %20 for spaces)
      const decodedAreaName = decodeURIComponent(areaName);
  
      // Perform a case-insensitive search
      const area = await Area.findOne({ areaName: { $regex: new RegExp(`^${decodedAreaName}$`, 'i') } });
  
      return area;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
  export async function getAreaNames()  {
    try {
        await connectToDatabase();
    
        const areas = await Area.find({}).select('areaName');
       
        return {areas};
    } catch (error) {
        console.error(error);
        throw error;
    }
}
  
  

 
    