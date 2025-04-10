"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Popup, Polyline, useMap } from "react-leaflet";
import { Marker } from 'react-leaflet';
import L, { Icon } from 'leaflet';

import "leaflet/dist/leaflet.css";


const userIcon: L.Icon<any> = L.icon({
    iconUrl: "/location-pin.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  
  const hospitalIcon: L.Icon<any> = L.icon({
    iconUrl: "/hospital.png",
    iconSize: [35, 35],
    iconAnchor: [17, 35],
  });
  

interface Hospital {
  name: string;
  address: string;
  lat: number;
  lon: number;
}

interface MapProps {
  center: [number, number];
  zoom?: number;
  hospitals: Hospital[];
  userLocation: { lat: number; lon: number };
  destination?: { lat: number; lon: number };
  route: { lat: number; lon: number }[];
  tileLayerUrl?: string;
  travelMode: "drive" | "walk" | "bicycle";
  onHospitalClickAction?: (hospital: Hospital) => void; // ✅ New optional prop
}

function UpdateMapView({ center, zoom = 13 }: { center: [number, number]; zoom?: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

export default function Map({
  center,
  zoom = 13,
  hospitals,
  userLocation,
  destination,
  route,
  tileLayerUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  travelMode,
  onHospitalClickAction,
}: MapProps) {
  const polylinePositions = route.map((point) => [point.lat, point.lon]) as [number, number][];

  return (
    <MapContainer
    center={center as [number, number]}
    zoom={zoom}
    className="h-[500px] w-full rounded-lg shadow-lg z-0"
    >
      <UpdateMapView center={center} zoom={zoom} />
      <TileLayer url={tileLayerUrl} />

      {/* User marker */}
      <Marker position={[userLocation.lat, userLocation.lon]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Hospital markers */}
      {hospitals.map((hospital, index) => (
        <Marker
          key={index}
          position={[hospital.lat, hospital.lon]}
          icon={hospitalIcon as L.Icon}
          eventHandlers={{
            click: () => {
              if (onHospitalClickAction) onHospitalClickAction(hospital);
            },
          }}
        >
          <Popup>
            <strong>{hospital.name}</strong>
            <br />
            {hospital.address}
          </Popup>
        </Marker>
      ))}

      {/* Route polyline */}
      {polylinePositions.length > 1 && (
        <Polyline positions={polylinePositions} pathOptions={{ color: "#3B82F6", weight: 5 }} />
      )}
    </MapContainer>
  );
}
