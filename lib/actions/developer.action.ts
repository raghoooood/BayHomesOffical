
import Developer from '@/database/developer.model';
import { connectToDatabase } from '../mongoose';

export const getDeveloperById = async (developerId : any) => {
  try {
    connectToDatabase();

    const developer = await Developer.findOne( developerId ).populate('projectId');
    if (!developer) {
      throw new Error('Developer not found');
    }
    return developer; 
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch developer data');
  }
};
