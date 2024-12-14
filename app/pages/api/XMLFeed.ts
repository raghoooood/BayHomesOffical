import { NextResponse } from 'next/server';
import axios from 'axios';  // Axios to send the data to the external URL
import Property from '@/database/property.model';

const feedUrl = 'https://expert.propertyfinder.ae/feed/bay-homes-real-es-1/privatesite/fc44a9d0aa949873ec6856daad56300c';

export async function GET() {
    try {
        // Fetch properties from MongoDB
        const properties = await Property.find();  // You can add query filters here if needed

        // Prepare the properties in the expected format
        const formattedProperties = properties.map((property) => ({
            id: property.propertyId,
            title: property.title,
            location: property.location,
            price: property.price,
            description: property.description,
            images: property.images.propImages,
            // Add any other necessary fields here based on the external feed's requirements
        }));

        // Send the properties to the external URL as XML or JSON (you need to check what the external service expects)
        const response = await axios.post(feedUrl, formattedProperties, {
            headers: {
                'Content-Type': 'application/json',  // Or 'application/xml' depending on the external service's requirements
            },
        });

        // Return success response
        return NextResponse.json({ success: true, data: response.data }, { status: 200 });
    } catch (error) {
        console.error('Error feeding properties:', error);
        return NextResponse.json({ error: 'Failed to fetch or feed properties' }, { status: 500 });
    }
}
