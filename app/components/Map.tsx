'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { GoogleMap, MarkerF, useJsApiLoader } from '@react-google-maps/api';

interface MapProps {
  url?: string; // URL containing the location
}

export default function Map({ url }: MapProps) {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const libraries = useMemo(() => ['places'], []);

  // Extract location from Google Maps URL
  const extractLocationFromGoogleMapsUrl = (url: string) => {
    try {
      let lat, lng;
      const coordsRegex = /@(-?\d+\.\d+),(-?\d+\.\d+)/;
      const coordsMatch = url.match(coordsRegex);

      if (coordsMatch) {
        lat = parseFloat(coordsMatch[1]);
        lng = parseFloat(coordsMatch[2]);
        return { lat, lng };
      }

      const placeRegex = /\/maps\/place\/([^/]+)/;
      const placeMatch = url.match(placeRegex);

      if (placeMatch) {
        const location = decodeURIComponent(placeMatch[1].replace(/\+/g, ' '));
        return { location };
      }

      return null;
    } catch (error) {
      console.error('Error parsing Google Maps URL:', error);
      return null;
    }
  };

  // Geocode location name into coordinates
  const geocodeAddress = async (location: string) => {
    const encodedLocation = encodeURIComponent(location);
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(geocodeUrl);
      const data = await response.json();

      if (data.status === 'OK') {
        const { lat, lng } = data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } else {
        console.error('Geocode error:', data.status);
      }
    } catch (error) {
      console.error('Error fetching geocode:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (url) {
      const extractedLocation = extractLocationFromGoogleMapsUrl(url);

      if (extractedLocation && extractedLocation.lat && extractedLocation.lng) {
        setCoordinates({ lat: extractedLocation.lat, lng: extractedLocation.lng });
        setLoading(false);
      } else if (extractedLocation && extractedLocation.location) {
        geocodeAddress(extractedLocation.location);
      } else {
        setLoading(false);
        console.error('No valid location found in URL');
      }
    }
  }, [url]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libraries as any,
  });

  if (!isLoaded || loading) {
    return <div className="flex justify-center items-center h-[550px]"><p>Loading map...</p></div>;
  }

  // Function to navigate to Google Maps URL
  const handleMapClick = () => {
    if (coordinates) {
      const googleMapsUrl = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  return (
    <div className="h-[300px] md:h-[400px] lg:h-[600px] w-full" onClick={handleMapClick} style={{ cursor: 'pointer' }}>
      {coordinates ? (
        <GoogleMap
          center={coordinates}
          zoom={14}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: '100%', height: '100%' }}
        >
          <MarkerF position={coordinates} />
        </GoogleMap>
      ) : (
        <div className="flex justify-center items-center h-full">
          <p>Map location not found.</p>
        </div>
      )}
    </div>
  );
}
