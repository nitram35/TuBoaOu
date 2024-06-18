import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

function MapSection({ group, setActiveSection }) {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [barycenter, setBarycenter] = useState(null);

  useEffect(() => {
    if (group && group.users.length > 0) {
      const barycenter = calculateBarycenter(group.users);
      setBarycenter(barycenter);
    }
  }, [group]);

  const calculateBarycenter = (users) => {
    const totalUsers = users.length;
    const sumCoordinates = users.reduce(
      (acc, user) => {
        acc.longitude += user.longitude;
        acc.latitude += user.latitude;
        return acc;
      },
      { longitude: 0, latitude: 0 }
    );

    return {
      longitude: sumCoordinates.longitude / totalUsers,
      latitude: sumCoordinates.latitude / totalUsers,
    };
  };

  const handleBarSelection = () => {
    if (selectedMarker) {
      setSelectedBar(selectedMarker);
    }
  };

  return (
    <div>
      <h2>Map Section</h2>
      <p>Selected Group Name: {group.groupName}</p>
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
          <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={{ lat: barycenter.latitude, lng: barycenter.longitude }} zoom={8}>
              <Marker position={{ lat: barycenter.latitude, lng: barycenter.longitude }} title="Barycenter" />
              {group.users.map(user => (
                <Marker key={user._id} position={{ lat: user.latitude, lng: user.longitude }} />
              ))}
            </GoogleMap>
          </LoadScript>
        )}
      </div>
      <button onClick={() => setActiveSection('barInfo')}>Show Bar Info</button>
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
  setActiveSection: PropTypes.func.isRequired,
};

export default MapSection;
