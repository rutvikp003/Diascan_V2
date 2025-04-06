"use client";

import { useState } from "react";
import { fetchNearbyHospitals } from "../../geoapi/geoapify";
import Map from "../../components/map/map";

export default function Hospitals() {
  const [hospitals, setHospitals] = useState<{ name: string; address: string; lat: number; lon: number }[]>([]);
  const [location, setLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords: [number, number] = [position.coords.latitude, position.coords.longitude];
          setLocation(coords);
          fetchNearbyHospitals(coords[0], coords[1]).then(setHospitals);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching location:", error);
          setLoading(false);
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (<>
    <section className="relative z-10 pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
    <div className="container">
      <div className="flex flex-wrap -mx-4">
        <div className="w-full px-4">
          <div className="mx-auto max-w-[530px] text-center">
            <div className="mx-auto text-center mb-9">
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold text-center mb-4">Nearby Hospitals</h1>

                {!location ? (
                  <div className="text-center">
                    <button
                      onClick={handleGetLocation}
                      className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
                      disabled={loading}
                    >
                      {loading ? "Fetching Location..." : "Use My Location"}
                    </button>
                  </div>
                ) : (
                  <Map center={location} hospitals={hospitals} />
                )}

                <div className="mt-4">
                  <h2 className="text-lg font-semibold">Hospitals List</h2>
                  {hospitals.length > 0 ? (
                    <ul className="space-y-2">
                      {hospitals.map((hospital, index) => (
                        <li key={index} className="p-3 border rounded-lg shadow-md">
                          <strong>{hospital.name}</strong> <br />
                          {hospital.address}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No hospitals found</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </section>
    </>
  );
}
