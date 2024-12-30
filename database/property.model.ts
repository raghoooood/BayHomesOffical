import { Document, model, models, Schema } from "mongoose";

export interface IProperty extends Document {
 propertyId: string;
 propId: string;
    title: string;
    location: {
      city: string,
      street: string,
      URL: String,
    },
    area: Schema.Types.ObjectId;
    projectName: string;
    purpose: string;
    propertyType: string;
    price: number;
    description: string;
    images: {
      propImages: string[];
      backgroundImage: string;
    };
    size?: string;
    numOfrooms: number;
    numOfbathrooms: number;
    features: string[];
    furnishingType: string;
    classification: string;
    featured: boolean;
    agent: Schema.Types.ObjectId;
    permitNo: string;
    barcode: string;
    status: string;
    // completion_status: string;
    geopoints: {
      lat: Number,
      lng: Number,
    },

  }
  
  const PropertySchema = new Schema({
    propertyId: { type: String, required: true, unique: true },
    propId: {
      type: String,
      required: true,
      unique: true,
    },
  title: { type: String, required: true },
  projectName: { type: String, required: true },
  size: { type: String },
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  agent: { type: Schema.Types.ObjectId, ref: 'Agent' },
  purpose: { type: String, required: true },
  propertyType: { type: String, required: true },
  price: { type: Number, required: true },
  images: {
    propImages: [{type: String, required: true}],
    backgroundImage: {type: String, required: true},
  },
  area: { type: Schema.Types.ObjectId, required: true, ref: 'Area' },
  numOfrooms: { type: Number, required: true },
  numOfbathrooms: { type: Number, required: true },
  furnishingType: { type: String,
    enum: ['Yes', 'No'],
    required: true, },
  classification: { type: String, required: true },
  features: [{ type: String, required: true }],
  description: { type: String, required: true },
  featured: { type: Boolean, required: true },
  permitNo: { type: String, required: true },
 barcode: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    URL: { type: String, required: true },
  },
  status: {
    type: String,
    enum: ['active', 'archived'],
    default: 'active',
    required: true,
  },
/*   completion_status: {
    type: String,
    enum: ['on_plan', 'off_plan_primary', 'off_plan_secondary', 'completed_primary', 'completed'], // Add completed_primary here
  }, */
  geopoints: {
    lat: { type: Number },
    lng: { type: Number },
  },
  },{ timestamps: true });
  
  const Property = models.Property || model('Property', PropertySchema);
  
  export default Property;