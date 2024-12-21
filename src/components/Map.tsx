"use client";
import React from 'react';
import dynamic from 'next/dynamic';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

interface MapProps {
  lat: number;
  lng: number;
  className?: string;
}

const containerStyle = {
  width: '100%',
  height: '100%'
};

function MapComponent({ lat, lng, className = '' }: MapProps) {
  const center = {
    lat: lat,
    lng: lng
  };

  return (
    <div className={`min-h-[300px] ${className}`}>
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
        >
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

// Export a client-side only version of the component
export default dynamic(() => Promise.resolve(MapComponent), {
  ssr: false
});
