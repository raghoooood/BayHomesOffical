import { Schema, models, model, Document } from 'mongoose';

export interface IAgent extends Document {
  agentId: string;
  name: string;
  email: string;
  phone: string;
  employeeID: string;
  adrress?: string;
}

const AgentSchema = new Schema({
  agentId: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  employeeID: { type: String, required: true },
  adrress: { type: String },
});

const Agent = models.Agent || model('Agent', AgentSchema);

export default Agent;