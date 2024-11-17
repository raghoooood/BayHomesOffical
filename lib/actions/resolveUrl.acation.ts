import fetch from 'node-fetch';

// Function to resolve shortened URL and extract coordinates
export async function resolveShortenedUrl(url: string) {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const resolvedUrl = response.url;

    // Extract coordinates from the resolved URL
    const latLngMatch = resolvedUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    
    if (latLngMatch) {
      const lat = parseFloat(latLngMatch[1]);
      const lng = parseFloat(latLngMatch[2]);
      return { lat, lng };
    } else {
      throw new Error('Coordinates not found in resolved URL');
    }
  } catch (error) {
    throw new Error('Failed to resolve URL');
  }
}
