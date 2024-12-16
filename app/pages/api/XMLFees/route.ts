import { NextResponse } from 'next/server';
import Property from '@/database/property.model';  // Adjust path as needed for your Property model
import axios from 'axios';  // Axios to send the data to the external URL
import { connectToDatabase } from '@/lib/mongoose';  // Ensure you connect to the database

const feedUrl = 'https://expert.propertyfinder.ae/feed/bay-homes-real-es-1/privatesite/fc44a9d0aa949873ec6856daad56300c'; // External API endpoint

export async function GET() {
    try {
        // Ensure MongoDB connection
        await connectToDatabase();
        console.log("Connected to MongoDB");

        // Fetch properties from MongoDB (adjust query if needed to filter specific properties)
        const properties = await Property.find({ status: 'active' });  // You can add query filters here if needed
        console.log('Fetched properties from MongoDB:', properties);  // Log properties to confirm

        if (!properties || properties.length === 0) {
            throw new Error('No active properties found in MongoDB.');
        }

        // Format the properties in the expected structure for the external feed
        const formattedProperties = properties.map((property) => ({
            id: property.propertyId,
            title: property.title,
            location: {
                city: property.location.city,
                street: property.location.street,
                URL: property.location.URL,
            },
            area: property.areaName, // Assuming area is a reference to another collection (ObjectId)
            projectName: property.projectName,
            purpose: property.purpose,
            propertyType: property.propertyType,
            price: property.price,
            description: property.description,
            images: {
                propImages: property.images.propImages, // Assuming this is an array of image URLs
                backgroundImage: property.images.backgroundImage, // Assuming this is a single image URL
            },
            size: property.size, // Optional field, so it might be undefined
            numOfrooms: property.numOfrooms,
            numOfbathrooms: property.numOfbathrooms,
            features: property.features, // Array of features
            furnishingType: property.furnishingType,
            classification: property.classification,
            featured: property.featured,
            permitNo: property.permitNo,
            barcode: property.barcode,
            status: property.status,
        })); // Adjust according to your database schema

        // Log the formatted properties to check if the transformation is correct
        console.log('Formatted properties:', formattedProperties);

        // Send the properties to the external URL as JSON
        const response = await axios.post(feedUrl, formattedProperties, {
            headers: {
                'Content-Type': 'application/json',  // Ensure the correct content type for the external service
            },
        });

        console.log('Response from external API:', response.data);  // Log the response from the external service

        // Return success response
        return NextResponse.json({ success: true, data: response.data }, { status: 200 });
        
    } catch (error: any) {  // Explicitly type the error as `any` or `unknown` if necessary
        console.error('Error feeding properties:', error.response?.data || error.message || error);

        // Additional check for error without response
        if (!error.response) {
            return NextResponse.json({ error: 'Network error or no response from external API' }, { status: 500 });
        }

        // Handle the case where there's a response but it's not what we expect
        return NextResponse.json({ error: error.response?.data || 'Unknown error occurred' }, { status: 500 });
    }
}
