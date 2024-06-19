import React, { useState, useEffect , useCallback} from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

function MapSection({ group, onSelectMarker }) {
  const [barChoice, setBarChoice] = useState();

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
          name: place.name
        }));
        setMarkers(newMarkers);
      }
    });
  }, []);

  const onLoad = useCallback((map) => {
    fetchPlaces(map);
  }, [fetchPlaces]);

  const handleBarSelection = () => {
    setSelectedBar(selectedMarker);
  };

  const green = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  };

  const blue = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  };

  const red = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  };

  return (
    <div>
      <h1 className='my-7 text-center font-semibold text-3xl'>Map Section</h1>
      <p>Selected Group Name: {group.groupName}</p>
      <p>Selected Group latitude: {barycenter.lat}</p>
      <p>Selected Group longitude: {barycenter.lng}</p>
      <h3>Users:</h3>
      <ul>
        {group.users.map(user => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
      <div id="map" style={{ height: '400px', width: '100%' }}>
        {barycenter && (
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY } libraries={['places']}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: barycenter.lat, lng: barycenter.lng }} zoom={13} onLoad={onLoad}>
              {markers.map((marker, index) => (
                <Marker key={index} position={marker.position} title={marker.name} icon={red} onClick={() => setBarChoice(marker)}/>
              ))}

              {barChoice && (
                <InfoWindow position={barChoice.position} onCloseClick={() => setSelectedMarker(null)}>
                  <div>{barChoice.name}</div>
                </InfoWindow>
              )}
              <Marker position={{ lat: barycenter.lat, lng: barycenter.lng }} title="Barycenter" icon={green}/>
              {group.users.map(user => (
                <Marker key={user._id} position={{ lat: user.latitude, lng: user.longitude }} icon={blue}/>
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
      <button onClick={() => onSelectMarker(barChoice)}>Show {barChoice && (barChoice.name) || "'Select a bar'"} Info</button>
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
  }),
  onSelectMarker: PropTypes.func.isRequired,
};

export default MapSection;
