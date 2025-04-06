"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer as LeafletMapContainer, TileLayer, useMap, MapContainerProps } from "react-leaflet";

// ✅ Dynamically import components to prevent SSR issues
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

interface Hospital {
  name: string;
  address: string;
  lat: number;
  lon: number;
}

interface MapProps {
  center: [number, number]; // Ensures TypeScript knows it's a tuple
  zoom?: number;
  hospitals: Hospital[];
}

// ✅ Updates map center dynamically when `center` changes
const UpdateMapView = ({ center, zoom = 12 }: { center: [number, number]; zoom?: number }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

export default function Map({ center, zoom = 12, hospitals }: MapProps) {
  const mapProps: MapContainerProps = {
    center,
    zoom,
    className: "h-96 w-full rounded-lg shadow-md",
    style: { height: "100vh", width: "100%" },
  };

  return (
    <LeafletMapContainer {...mapProps}>
      <UpdateMapView center={center} zoom={zoom} />

      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* User's Current Location */}
      <Marker position={center}>
        <Popup>📍 You are here</Popup>
      </Marker>

      {/* Nearby Hospitals */}
      {hospitals.map((hospital, index) => (
        <Marker key={index} position={[hospital.lat, hospital.lon]}>
          <Popup>
            <strong>{hospital.name}</strong> <br />
            {hospital.address}
          </Popup>
        </Marker>
      ))}
    </LeafletMapContainer>
  );
}
