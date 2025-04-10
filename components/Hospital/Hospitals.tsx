"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchNearbyHospitals, geocodeLocation, getRoute, getAutocompleteSuggestions } from "@/utils/geoapify";
import { getDistance } from "@/utils/distance";
import { ClipLoader } from "react-spinners";

const Map = dynamic(() => import("@/components/Hospital/Map"), { ssr: false });

interface Hospital {
  name: string;
  address: string;
  lat: number;
  lon: number;
}

interface Location {
  lat: number;
  lon: number;
}

interface RouteInfo {
  coordinates: { lat: number; lon: number }[];
  distance: number;
  duration: number;
  destination: Location;
}

export default function Hospitals() {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [location, setLocation] = useState<Location | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [destination, setDestination] = useState<Hospital | null>(null);
  const [route, setRoute] = useState<RouteInfo | null>(null);
  const [travelMode, setTravelMode] = useState<"drive" | "walk" | "bicycle">("drive");
  const [loading, setLoading] = useState<boolean>(true);

  const getCurrentLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords: Location = {
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
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.length > 2) {
        const suggestions = await getAutocompleteSuggestions(searchQuery);
        setSearchSuggestions(suggestions);
      } else {
        setSearchSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [searchQuery]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    const newLocation = await geocodeLocation(query);
    if (newLocation) {
      setLocation(newLocation);
      const hospitalsData = await fetchNearbyHospitals(newLocation.lat, newLocation.lon);
      setHospitals(hospitalsData);
    }
    setLoading(false);
  };

  const handleSelectHospital = async (hospital: Hospital) => {
    setDestination(hospital);
    if (location) {
      const routeData = await getRoute(location.lat, location.lon, hospital.lat, hospital.lon, travelMode);
      if (routeData) {
        setRoute({
          coordinates: routeData.coordinates,
          distance: routeData.distance,
          duration: routeData.duration,
          destination: {
            lat: hospital.lat,
            lon: hospital.lon,
          },
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Nearby Hospitals</h1>

        <div className="flex justify-center gap-4 mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search location or hospital..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-3 border rounded-lg shadow-md bg-white text-black focus:ring-2 focus:ring-blue-500 w-full"
            />
            {searchSuggestions.length > 0 && (
              <ul className="absolute z-10 bg-white text-black w-full mt-1 rounded-md shadow-lg max-h-60 overflow-y-auto">
                {searchSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleSearch(suggestion);
                      setSearchQuery(suggestion);
                      setSearchSuggestions([]);
                    }}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        <div className="text-center mb-4 flex flex-col md:flex-row justify-center gap-4">
          <button
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-green-600 text-white rounded shadow hover:bg-green-700 transition"
          >
            📍 Re-center to My Location
          </button>
          <select
            value={travelMode}
            onChange={(e) => setTravelMode(e.target.value as "drive" | "walk" | "bicycle")}
            className="px-4 py-2 bg-gray-800 text-white border rounded-md shadow"
          >
            <option value="drive">🚗 Driving</option>
            <option value="walk">🚶 Walking</option>
            <option value="bicycle">🚲 Bicycling</option>
          </select>
        </div>

        {location && (
          <Map
            center={[location.lat, location.lon]}
            hospitals={hospitals}
            userLocation={location}
            destination={destination || undefined}
            route={route?.coordinates || []}
            tileLayerUrl="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            travelMode={travelMode}
            onHospitalClickAction={handleSelectHospital} // ✅ Added for map marker click
          />
        )}

        {loading && (
          <div className="flex justify-center mt-6">
            <ClipLoader size={40} color="#3B82F6" />
          </div>
        )}

        {!loading && (
          <div className="mt-6">
            {hospitals.length > 0 ? (
              hospitals.map((hospital, index) => {
                const distance =
                  location && hospital
                    ? getDistance(location.lat, location.lon, hospital.lat, hospital.lon).toFixed(2)
                    : null;

                const isSelected =
                  destination?.lat === hospital.lat && destination?.lon === hospital.lon;

                return (
                  <div
                    key={index}
                    className={`p-4 border rounded-lg shadow-md transition cursor-pointer mb-3 ${
                      isSelected ? "bg-blue-900 border-blue-400" : "bg-gray-800"
                    }`}
                    onClick={() => handleSelectHospital(hospital)}
                  >
                    <strong className="text-blue-400">{hospital.name}</strong>
                    <p className="text-gray-300">{hospital.address}</p>
                    {distance && (
                      <p className="text-sm text-gray-400">
                        {distance} km away
                        {isSelected && route && (
                          <>
                            {" • "}
                            {(route.duration / 60).toFixed(0)} mins via {travelMode}
                          </>
                        )}
                      </p>
                    )}
                    {isSelected && route && (
                      <p className="text-sm text-blue-300 mt-1">
                        🚗 Travel Time: {(route.duration / 60).toFixed(0)} mins (
                        {(route.distance / 1000).toFixed(1)} km)
                      </p>
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
