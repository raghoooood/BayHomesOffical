import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongoose";
import mongoose, { Schema } from "mongoose";
import Property from "@/database/property.model";
import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import Area from "@/database/Area.model";


// Define the Counter schema
const counterSchema = new Schema({
  _id: { type: String, required: true }, // Use string for propertyType
  seq: { type: Number, required: true, default: 0 },
});

// Use the existing model if it exists; otherwise, define it
const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);


type PropertyType = 'AP' | 'VH' | 'OF';
type OfferingType = 'RR' | 'RS' | 'CR' | 'CS'; // Add more if necessary

const getNextSequence = async (propertyType: PropertyType): Promise<string> => {
  const typeInitials: Record<PropertyType, string> = {
    AP: 'A',
    VH: 'V',
    OF: 'O',
  };

  const initial = typeInitials[propertyType];
  if (!initial) {
    throw new Error(`Invalid property type: ${propertyType}`);
  }

  const counter = await Counter.findOneAndUpdate(
    { _id: propertyType }, // Ensure this matches the string type
    { $inc: { seq: 1 } },
    { upsert: true, new: true }
  );

  if (!counter) {
    throw new Error(`Failed to generate sequence for property type: ${propertyType}`);
  }

  const newNumber = counter.seq;
  return `${initial}${newNumber.toString().padStart(2, '0')}`;
};

const generatePropId = async (propertyType: PropertyType) => {
  
  return getNextSequence(propertyType);



};

const mapPropertyType = (propertyType: PropertyType): string => {
  const typeMapping: Record<PropertyType, string> = {
    AP: "apartment",
    VH: "villa",
    OF: "office",
  };
  return typeMapping[propertyType] || "Unknown";
};

const mapOfferingTypeToPurposeAndClassification = (offeringType: OfferingType) => {
  if (offeringType === "RR" || offeringType === "CR") {
    return { purpose: "rent", classification: offeringType === "RR" ? "residential" : "commercial" };
  } else if (offeringType === "RS" || offeringType === "CS") {
    return { purpose: "sale", classification: offeringType === "RS" ? "residential" : "commercial" };
  }
  return { purpose: "Unknown", classification: "Unknown" };
};

export async function GET(req: Request) {
  try {
    await connectToDatabase();

    const xmlUrl = 'https://expert.propertyfinder.ae/feed/bay-homes-real-es-1/privatesite/fc44a9d0aa949873ec6856daad56300c';
    const response = await axios.get(xmlUrl, { responseType: 'text' });

    const parsedData = new XMLParser().parse(response.data);
    const properties = parsedData.list.property;

    if (!properties || properties.length === 0) {
      return NextResponse.json({ message: "No property data available in the XML." }, { status: 400 });
    }

    const savePropertyPromises = properties.map(async (property: any) => {
      try {
        console.log('Processing property:', property);

        const {
          permit_number,
          title_en,
          city,
          community,
          sub_community,
          description_en,
          price,
          photo,
          geopoints,
          size,
          bedroom,
          bathroom,
          amenities,
          furnishing,
          completion_status,
          property_type,
          offering_type,
        } = property;

        if (!property_type || !photo || !geopoints) {
          console.log(`Skipping property: ${title_en || 'No Title'}, missing data.`);
          return;
        }

        const photoUrls = Array.isArray(photo?.url) ? photo.url : (photo?.url ? [photo.url] : []);
        const [lat, lng] = geopoints?.split(',') || [];

        if (!lat || !lng) {
          console.log(`Invalid geopoints for property: ${title_en || 'No Title'}`);
          return;
        }

        if (!community) {
          console.log(`Skipping property: ${title_en || 'No Title'}, missing community.`);
          return;
        }

        const location = {
          city: city || "Unknown",
          street: sub_community || "Unknown",
          URL: geopoints || "Unknown",
        };

        const furnishingType = furnishing || "No";
        const mappedPropertyType = mapPropertyType(property_type);
        const { purpose, classification } = mapOfferingTypeToPurposeAndClassification(offering_type);

        const numOfrooms = bedroom || 0;
        const newPropId = await generatePropId(property_type);

        const area = await Area.findOneAndUpdate(
          { areaName: community },
          { $setOnInsert: { areaName: community } },
          { new: true, upsert: true }
        );

        if (!area) {
          console.log(`Failed to find or create area for community: ${community}`);
          return;
        }

        const existingProperty = await Property.findOne({ title: title_en });
        if (existingProperty) {
          console.log(`Property already exists: ${title_en}`);
          return;
        }

        const newProperty = new Property({
          propId: newPropId,
          propertyId: new mongoose.Types.ObjectId(),
          title: title_en,
          location,
          area: area._id,
          projectName: sub_community,
          purpose,
          propertyType: mappedPropertyType,
          price,
          description: description_en,
          images: {
            propImages: photoUrls,
            backgroundImage: photoUrls[0] || '',
          },
          size,
          numOfrooms,
          numOfbathrooms: bathroom || 0,
          features: amenities ? [amenities] : [],
          furnishingType,
          classification,
          featured: true,
          agent: '6766043911c80df2358d1385', // Default agent ID
          permitNo: permit_number || "N/A",
          barcode: "barcode-1234",
          completion_status: completion_status || 'on_plan',
          status: 'active',
          creator: '66f37530fe2b4401100688af',
        });

      //  Push property ID to Area
        await Area.findByIdAndUpdate(area._id, {
          $addToSet: { propertyId: newProperty._id },
        }); 

        await newProperty.save();
        console.log(`Property added: ${newProperty.title}`);
      } catch (err) {
        console.error("Error processing property:", err);
      }
    });

    const results = await Promise.allSettled(savePropertyPromises);
    results.forEach((result, index) => {
      if (result.status === 'rejected') {
        console.error(`Error in property ${properties[index]?.title_en}:`, result.reason);
      }
    });

    return NextResponse.json({ message: "Properties added successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error adding properties:", error);
    return NextResponse.json({ message: "Error adding properties", error: (error as Error).message }, { status: 500 });
  }
}
