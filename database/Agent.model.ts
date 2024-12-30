import { Schema, model, models, Document } from "mongoose";

export interface IAgent extends Document {
    name: string;
    email: string;
    phone: string;
    photo: string;
}

const AgentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    photo: { type: String },
});

const Agent = models.Agent || model('Agent', AgentSchema);
export default Agent;
