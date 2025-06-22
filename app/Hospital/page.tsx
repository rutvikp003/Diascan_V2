"use client";

import { useState, useEffect } from "react";
import { fetchNearbyHospitals, geocodeLocation, getRoute } from "@/utils/geoapify";
import { getDistance } from "@/utils/distance";
import dynamic from "next/dynamic";
import { ClipLoader } from "react-spinners";

const Map = dynamic(() => import("@/components/Hospital/Map"), { ssr: false });

export default function Hospitals() {
  const [hospitals, setHospitals] = useState<
    { name: string; address: string; lat: number; lon: number }[]
  >([]);
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [destination, setDestination] = useState<{ lat: number; lon: number } | null>(null);
  const [route, setRoute] = useState<{ lat: number; lon: number }[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Get user location
const getCurrentLocation = () => {
  setLoading(true);
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
        setLocation(coords);
        const hospitalsData = await fetchNearbyHospitals(coords.lat, coords.lon);
        setHospitals(hospitalsData);
        setLoading(false);
      },
      (error) => {
        console.error("Geolocation Error:", error);
        alert(
          "Failed to retrieve your location. Please allow location access in your browser settings."
        );
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  } else {
    alert("Geolocation is not supported by your browser.");
    setLoading(false);
  }
};


  useEffect(() => {
    getCurrentLocation();
  }, []);

  // Search
  async function handleSearch() {
    if (!searchQuery) return;

    setLoading(true);
    const newLocation = await geocodeLocation(searchQuery);
    if (newLocation) {
      setLocation(newLocation);
      const hospitalsData = await fetchNearbyHospitals(newLocation.lat, newLocation.lon);
      setHospitals(hospitalsData);
    }
    setLoading(false);
  }

  // Hospital click
  async function handleSelectHospital(hospital: { lat: number; lon: number }) {
    setDestination(hospital);
    if (location) {
      const newRoute = await getRoute(location.lat, location.lon, hospital.lat, hospital.lon);
      // Ensure newRoute is an array of { lat, lon }
      const routeCoords =
        Array.isArray(newRoute)
          ? newRoute
          : Array.isArray(newRoute?.features)
            ? newRoute.features.flatMap((feature: any) =>
                feature.geometry?.coordinates?.map(
                  ([lon, lat]: [number, number]) => ({ lat, lon })
                ) || []
              )
            : [];
      setRoute(routeCoords);
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Nearby Hospitals</h1>

        {/* Search Bar */}
        <div className="flex justify-center gap-4 mb-4">
          <input
            type="text"
            placeholder="Search location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-3 border rounded-lg shadow-md bg-white text-black focus:ring-2 focus:ring-blue-500 w-full max-w-md"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Re-center Button */}
        <div className="text-center mb-4">
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
          >
            📍 Re-center to My Location
          </button>
        </div>

        {/* Map */}
        {location && (
          <Map
            center={location}
            hospitals={hospitals}
            userLocation={location}
            destination={destination || undefined}
            route={route}
            tileLayerUrl="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          />
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="flex justify-center mt-6">
            <ClipLoader size={40} color="#3B82F6" />
          </div>
        )}

        {/* Hospital List */}
        {!loading && (
          <div className="mt-6">
            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => {
                const distance = location
                  ? getDistance(location.lat, location.lon, hospital.lat, hospital.lon).toFixed(2)
                  : null;

                return (
                  <div
                    key={index}
                    className="p-4 border rounded-lg shadow-md hover:shadow-lg transition cursor-pointer bg-gray-800 text-white mb-3"
                    onClick={() => handleSelectHospital(hospital)}
                  >
                    <strong className="text-blue-400">{hospital.name}</strong>
                    <p className="text-gray-300">{hospital.address}</p>
                    {distance && (
                      <p className="text-sm text-gray-400">{distance} km away</p>
                    )}
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-400">No hospitals found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
