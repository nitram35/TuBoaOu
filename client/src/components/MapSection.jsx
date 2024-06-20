import React, { useState, useEffect, useCallback } from 'react';
import { Button, Alert, Modal } from 'flowbite-react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

function MapSection({ group, onSelectMarker, setSelectedMarker }) {
  const [barChoice, setBarChoice] = useState(null);
  const barycenter = {
    lat: group.meanCoordinates.latitude,
    lng: group.meanCoordinates.longitude
  };
  const [markers, setMarkers] = useState([]);

  const fetchPlaces = useCallback((map) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: barycenter,
      radius: '1500',
      type: ['bar']
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map(place => ({
          position: place.geometry.location,
          name: place.name,
          place: place
        }));
        setMarkers(newMarkers);
      }
    });
  }, [barycenter]);

  const onLoad = useCallback((map) => {
    fetchPlaces(map);
  }, [fetchPlaces]);

  const handleBarSelection = () => {
    setSelectedMarker(null);
    setBarChoice(null);
  };

  const greenIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  };

  const blueIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  };

  const redIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="my-7 text-center font-semibold text-3xl">Map Section</h1>
      <div className="mb-4">
        <p className="text-lg"><strong>Selected Group Name:</strong> {group.groupName}</p>
        <p className="text-lg"><strong>Selected Group Latitude:</strong> {barycenter.lat}</p>
        <p className="text-lg"><strong>Selected Group Longitude:</strong> {barycenter.lng}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Users:</h3>
        <ul className="list-disc list-inside">
          {group.users.map(user => (
            <li key={user._id}>
              {user.username} - {user.email}
            </li>
          ))}
        </ul>
      </div>
      <div id="map" className="mb-4" style={{ height: '400px', width: '100%' }}>
        {barycenter && (
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY} libraries={['places']}>
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={{ lat: barycenter.lat, lng: barycenter.lng }}
              zoom={13}
              onLoad={onLoad}
            >
              {markers.map((marker, index) => (
                <Marker
                  key={index}
                  position={marker.position}
                  title={marker.name}
                  icon={redIcon}
                  onClick={() => setBarChoice(marker)}
                />
              ))}

              {barChoice && (
                <InfoWindow
                  position={barChoice.position}
                  onCloseClick={handleBarSelection}
                >
                  <div>{barChoice.name}</div>
                </InfoWindow>
              )}
              <Marker
                position={{ lat: barycenter.lat, lng: barycenter.lng }}
                title="Barycenter"
                icon={greenIcon}
              />
              {group.users.map(user => (
                <Marker
                  key={user._id}
                  position={{ lat: user.latitude, lng: user.longitude }}
                  icon={blueIcon}
                />
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
      <div className="flex justify-center">
        <Button
          gradientDuoTone="greenToBlue"
          outline
          onClick={() => onSelectMarker(barChoice)}
        >
          {barChoice ? `Show ${barChoice.name} Info` : 'Select a bar'}
        </Button>
      </div>
    </div>
  );
}

MapSection.propTypes = {
  group: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    ownerId: PropTypes.string.isRequired,
    groupName: PropTypes.string.isRequired,
    users: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        longitude: PropTypes.number.isRequired,
        latitude: PropTypes.number.isRequired,
      })
    ).isRequired,
    meanCoordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  onSelectMarker: PropTypes.func.isRequired,
  setSelectedMarker: PropTypes.func.isRequired,
};

export default MapSection;
