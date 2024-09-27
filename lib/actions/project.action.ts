'use server'
import Project from "@/database/project.model";
import { connectToDatabase } from "../mongoose";
import { GetProjectsByNameParams } from "./shared.types";
import Area from "@/database/Area.model";
import Developer from "@/database/developer.model";

export async function getProjectByName(params: { projectName: string }) {
    try {
      connectToDatabase();
  
   
      const { projectName } = params;
  
      // Decode URL-encoded characters (like %20 for spaces)
      const decodedproject = decodeURIComponent(projectName);
  
      // Perform a case-insensitive search
      const project = await Project.findOne({ projectName: { $regex: new RegExp(`^${decodedproject}$`, 'i') } })
      .populate('developer')
      .populate('area');
  
      return project;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  export async function getProjects() {
    try {
      connectToDatabase();
      const projects = await Project.find()
        .populate({ path: 'area', model: Area, select: '_id areaName ' })
        .populate({ path: 'developer', model: Developer, select: '_id developerName  ' })
        .sort({ price: -1 });
  
      return { projects };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  

  export async function getProjectNames()  {
    try {
        await connectToDatabase();
    
        const projects = await Project.find({}).select('projectName');
       
        return {projects};
    } catch (error) {
        console.error(error);
        throw error;
    }
}