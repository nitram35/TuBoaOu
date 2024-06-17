import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "100%"
};

const center = {
  lat: 48.8566,
  lng: 2.3522
};

const bars = [
  { id: 1, name: 'Bar A', position: { lat: 48.8576, lng: 2.3522 } },
  { id: 2, name: 'Bar B', position: { lat: 48.8560, lng: 2.3530 } },
  { id: 3, name: 'Bar C', position: { lat: 48.8550, lng: 2.3540 } },
];

function MapSection({ selectedGroup, setSelectedBar }) {
  const [selectedMarker, setSelectedMarker] = useState(null);

  const handleBarSelection = () => {
    if (selectedMarker) {
      setSelectedBar(selectedMarker);
    }
  };

  return (
    <div className="mb-8 flex-1 w-full">
      {selectedGroup && (
        <>
          <LoadScript googleMapsApiKey=>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
              {bars.map(bar => (
                <Marker key={bar.id} position={bar.position} onClick={() => setSelectedMarker(bar)} />
              ))}
              {selectedMarker && (
                <InfoWindow position={selectedMarker.position} onCloseClick={() => setSelectedMarker(null)}>
                  <div>{selectedMarker.name}</div>
                </InfoWindow>
              )}
            </GoogleMap>
          </LoadScript>
          <button
            onClick={handleBarSelection}
            disabled={!selectedMarker}
            className={`mt-4 px-4 py-2 rounded ${!selectedMarker ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Choisir le bar
          </button>
        </>
      )}
    </div>
  );
}

export default MapSection;
