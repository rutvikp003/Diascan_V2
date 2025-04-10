const API_KEY = "a3ea677f91d1499ab68c41f059d1bf8f"; // Directly using the API key

export interface Hospital {
  name: string;
  address: string;
  lat: number;
  lon: number;
}

export interface RouteData {
  coordinates: { lat: number; lon: number }[];
  distance: number; // in meters
  duration: number; // in seconds
}

export async function fetchNearbyHospitals(lat: number, lon: number): Promise<Hospital[]> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v2/places?categories=healthcare.hospital&filter=circle:${lon},${lat},5000&bias=proximity:${lon},${lat}&limit=10&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features || !Array.isArray(data.features)) {
      console.error("Invalid API response:", data);
      return [];
    }

    return data.features.map((place: any) => ({
      name: place.properties.name || "Unknown Hospital",
      address: place.properties.address_line1 || "No address available",
      lat: place.geometry.coordinates[1],
      lon: place.geometry.coordinates[0],
    }));
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    return [];
  }
}

export async function geocodeLocation(query: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(query)}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features || !data.features.length) {
      console.error("Geocoding API returned no results.");
      return null;
    }

    const coords = data.features[0].geometry.coordinates;
    return { lat: coords[1], lon: coords[0] };
  } catch (error) {
    console.error("Error geocoding location:", error);
    return null;
  }
}

export async function getRoute(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  mode: "drive" | "walk" | "bicycle" = "drive"
): Promise<RouteData | null> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/routing?waypoints=${lat1},${lon1}|${lat2},${lon2}&mode=${mode}&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features || !data.features.length) {
      console.error("No route found.");
      return null;
    }

    const route = data.features[0];
    const coordinates = route.geometry.coordinates.map((coord: number[]) => ({
      lon: coord[0],
      lat: coord[1],
    }));

    return {
      coordinates,
      distance: route.properties.distance,
      duration: route.properties.time,
    };
  } catch (error) {
    console.error("Error fetching route:", error);
    return null;
  }
}

export async function getAutocompleteSuggestions(query: string): Promise<string[]> {
  try {
    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&limit=5&apiKey=${API_KEY}`
    );
    const data = await response.json();

    if (!data.features || !Array.isArray(data.features)) {
      return [];
    }

    return data.features.map((feature: any) => feature.properties.formatted);
  } catch (error) {
    console.error("Error fetching autocomplete suggestions:", error);
    return [];
  }
}
