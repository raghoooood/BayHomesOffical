import { Schema, models, model, Document } from 'mongoose';

export interface ILocation extends Document {
  locationId: string;
  city: string;
  areaId: Schema.Types.ObjectId;
  state: string;
  street: string;
  zip_code: string;
  longitude: number;
  latitude: number;
}

const LocationSchema = new Schema({
  locationId: { type: String, required: true },
  city: { type: String, required: true },
  areaId: { type:  Schema.Types.ObjectId, ref: 'Area' },
  state: { type: String, required: true, unique: true },
  street: { type: String, required: true },
  zip_code: { type: String, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },

});

const Location = models.Location || model('Location', LocationSchema);

export default Location;