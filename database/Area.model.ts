import { Schema, models, model, Document } from 'mongoose';

export interface IArea extends Document {
  areaId: string;
  location: string;
  propertyId: Schema.Types.ObjectId[];
  areaName: string;
  description: string;
  features: string[];
  image: string;
  projectId: Schema.Types.ObjectId[]; 
  

}

const AreaSchema = new Schema({
  areaId: { type: String, required: true },
  features: [{ type: String, required: true }],
   areaName: { type: String, required: true},
   description: { type: String, required: true },
   location: { type:String, required: true},
   propertyId: [{ type: Schema.Types.ObjectId, ref: 'Property' }],
   image: { type: String, required: true},
   projectId: [{type: Schema.Types.ObjectId, ref: 'Project'}]
});



const Area = models.Area || model('Area', AreaSchema);

export default Area;