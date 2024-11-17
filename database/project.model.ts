import { Schema, models, model, Document } from 'mongoose';

export interface IProject extends Document {
  projectId: string;
  propertyId: Schema.Types.ObjectId[];
  areaId: Schema.Types.ObjectId[];
  developer: string;
  startPrice: number;
  endDate: Date;
  projectName: string;
  description: string;
  aminities: string[];
  rooms: {
    min: number;
    max: number;
  };
  images: {
    outImages: string[];
    inImages: string[];
    backgroundImage: string;
  },
  floorPlans: {
    floorType: string;
  floorSize: string;
  floorImage: string;
  numOfrooms: number;
  },
  aboutMap: string;
  mapURL: string;
  location: string;
}

const ProjectSchema = new Schema({
  projectId: { type: String, required: true, unique: true },
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  area: { type: Schema.Types.ObjectId, ref: 'Area' },
  aminities: [{ type: String, required: true }],
  startPrice: { type: Number, required: true },
  rooms: {
    min: { type: Number, required: true },
    max: { type: Number, required: true },
  },
  endDate: { type: Date, required: false },
  handoverDate: { type: Date, required: true },
  images: {
    outImages: [{type: String, required: false}],
    inImages: [{type: String, required: false}],
    backgroundImage: {type: String, required: false},
   },
  projectType: { type: String, required: true },
  size: { type: String, required: true },
  developer: { type: Schema.Types.ObjectId, ref: 'Developer' },
  floorPlans: [{
    floorType: { type: String, required: true },
  floorSize: { type: String, required: true },
  floorImage: { type: String, required: false },
  numOfrooms: { type: Number, required: true },
  }],
   location: {type: String, required: true},
   mapURL: {type: String, required: true},
   aboutMap: {type: String, required: true},
});


const Project = models.Project || model('Project', ProjectSchema);

export default Project;