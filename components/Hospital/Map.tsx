"use client";

/// <reference path="../app/utils/leaflet-routing-machine.d.ts" />
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
// @ts-ignore
import "leaflet-routing-machine";
import L from "leaflet";
import "@/styles/routing.css"; // Optional for styling route lines

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: "/location-pin.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const hospitalIcon = new L.Icon({
  iconUrl: "/hospital.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

// Props Interface
interface MapProps {
  center: { lat: number; lon: number };
  hospitals: { name: string; address: string; lat: number; lon: number }[];
  userLocation: { lat: number; lon: number };
  destination?: { lat: number; lon: number };
  route: { lat: number; lon: number }[];
  tileLayerUrl?: string;
}

// Routing Control
const Routing = ({
  userLocation,
  destination,
}: {
  userLocation: any;
  destination: any;
}) => {
  const map = useMap();

  useEffect(() => {
    if (!map || !userLocation || !destination) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(userLocation.lat, userLocation.lon),
        L.latLng(destination.lat, destination.lon),
      ],
      lineOptions: {
        styles: [{ color: "#007bff", weight: 5 }],
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [userLocation, destination, map]);

  return null;
};

// Map Component
export default function Map({
  center,
  hospitals,
  userLocation,
  destination,
  route = [],
  tileLayerUrl,
}: MapProps) {
  return (
    <div className="rounded-xl border-2 border-gray-300 shadow-lg overflow-hidden">
      <MapContainer
        center={[center.lat, center.lon]}
        zoom={14}
        scrollWheelZoom={true}
        className="h-[500px] w-full z-0"
      >
        <TileLayer
          url={tileLayerUrl || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* User Location */}
        <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
          <Popup>📍 Your Location</Popup>
        </Marker>

        {/* Hospital Markers */}
        {hospitals.map((hospital, index) => (
          <Marker
            key={index}
            position={[hospital.lat, hospital.lon]}
            icon={hospitalIcon}
          >
            <Popup>
              <strong>{hospital.name}</strong>
              <br />
              {hospital.address}
            </Popup>
          </Marker>
        ))}

        {/* Route */}
        {userLocation && destination && (
          <Routing userLocation={userLocation} destination={destination} />
        )}
      </MapContainer>
    </div>
  );
}
