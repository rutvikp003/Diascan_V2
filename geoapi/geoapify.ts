export interface Hospital {
    name: string;
    address: string;
    lat: number;
    lon: number;
    distance?: number | null;
  }
  
  interface GeoapifyResponse {
    features: {
      properties: {
        name?: string;
        formatted?: string;
      };
      geometry: {
        coordinates: [number, number]; // [longitude, latitude]
      };
    }[];
  }
  
  // ✅ Fetch Nearby Hospitals
  export async function fetchNearbyHospitals(lat: number, lon: number): Promise<Hospital[]> {
    const API_KEY = "5d320cf528fa430faef4691957a22319"; // Replace with your actual API key
    const url = `https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=drive&apiKey=5d320cf528fa430faef4691957a22319`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch hospitals");
  
      const data: GeoapifyResponse = await response.json(); // ✅ Ensuring correct response type
  
      return data.features.map((place) => ({
        name: place.properties.name || "Unknown Hospital",
        address: place.properties.formatted || "No address",
        lat: place.geometry.coordinates[1], // Latitude
        lon: place.geometry.coordinates[0], // Longitude
        distance: null, // ✅ Set default value
      }));
    } catch (error) {
      console.error("Error fetching hospitals:", error);
      return [];
    }
  }
  
  // ✅ Fetch Route and Distance
  export async function fetchRoute(
    start: { lat: number; lon: number },
    end: { lat: number; lon: number }
  ): Promise<{ distance: number; geometry: { coordinates: [number, number][] } } | null> {
    const API_KEY = "5d320cf528fa430faef4691957a22319"; // Replace with your actual API key
    const url = `https://api.geoapify.com/v1/routing?waypoints=50.96209827745463%2C4.414458883409225%7C50.429137079078345%2C5.00088081232559&mode=drive&apiKey=5d320cf528fa430faef4691957a22319`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch route data");
  
      const data = await response.json();
      const route = data.features[0]?.geometry || null; // Get route geometry
  
      return route ? { distance: data.features[0]?.properties?.distance || 0, geometry: route } : null;
    } catch (error) {
      console.error("Error fetching route:", error);
      return null;
    }
  }
  