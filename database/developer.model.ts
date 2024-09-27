// models/Developer.ts
import { Schema, models, model, Document } from 'mongoose';

export interface IDeveloper extends Document {
  developerId: string;
  developerName: string;
  description: string;
  image: string;
  projectId: Schema.Types.ObjectId[];
}

const DeveloperSchema = new Schema({
  developerId: { type: String, required: true },
  developerName: { type: String, required: true},
   description: { type: String, required: true },
   projectId: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
   image: { type: String, required: true },
});

const Developer = models.Developer || model<IDeveloper>('Developer', DeveloperSchema);

export default Developer;
