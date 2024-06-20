import { useState, useCallback } from 'react';
import { Button } from 'flowbite-react';
import PropTypes from 'prop-types';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = {
  height: '400px',
  width: '100%',
};

function MapSection({ group, onSelectMarker, setSelectedMarker }) {
  const [selectedBar, setSelectedBar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [meteo, setMeteo] = useState(null);
  const barycenter = {
    lat: group.meanCoordinates.latitude,
    lng: group.meanCoordinates.longitude
  };
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    getMeteo();
  }, []);

  const fetchPlaces = useCallback((map) => {
    setLoading(true);
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: barycenter,
      radius: '500',
      type: ['bar']
    };

    service.nearbySearch(request, (results, status) => {
      setLoading(false);
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const newMarkers = results.map(place => ({
          position: place.geometry.location,
          name: place.name,
          place: place
        }));
        setMarkers(newMarkers);
      } else {
        setError('Failed to fetch places. Please try again later.');
      }
    });
  }, [barycenter]);

  const getMeteo = async () => {
    const formData = barycenter.lat.toString()+','+barycenter.lng.toString();
    try {
      const response = await fetch(`https://api.meteo-concept.com/api/forecast/nextHours?token=7ec66b0a82cbaa287c5db51452a3a377c5e678ef3f77e630e422ef691eaf6847&latlng=${formData}`, {
        method: 'GET',
      });
      const data = await response.json()
      console.log(data);

      if (!response.ok) {
        throw new Error('Failed to get meteo');
      } else {
        setMeteo(data);
      }
    } catch (error) {
      console.error('Error getting the meteo:', error);
      setError('Failed to get the meteo. Please try again.');
    }
  }

  const onLoad = useCallback((map) => {
    fetchPlaces(map);
  }, [fetchPlaces]);

  const handleBarSelection = () => {
    setSelectedBar(null);
    setSelectedMarker(null);
  };

  const barycenterIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
  };

  const usersHomeIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  };

  const barIcon = {
    url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
  };

  const WEATHER = {
    0: "Soleil",
    1: "Peu nuageux",
    2: "Ciel voilé",
    3: "Nuageux",
    4: "Très nuageux",
    5: "Couvert",
    6: "Brouillard",
    7: "Brouillard givrant",
    10: "Pluie faible",
    11: "Pluie modérée",
    12: "Pluie forte",
    13: "Pluie faible verglaçante",
    14: "Pluie modérée verglaçante",
    15: "Pluie forte verglaçante",
    16: "Bruine",
    20: "Neige faible",
    21: "Neige modérée",
    22: "Neige forte",
    30: "Pluie et neige mêlées faibles",
    31: "Pluie et neige mêlées modérées",
    32: "Pluie et neige mêlées fortes",
    40: "Averses de pluie locales et faibles",
    41: "Averses de pluie locales",
    42: "Averses locales et fortes",
    43: "Averses de pluie faibles",
    44: "Averses de pluie",
    45: "Averses de pluie fortes",
    46: "Averses de pluie faibles et fréquentes",
    47: "Averses de pluie fréquentes",
    48: "Averses de pluie fortes et fréquentes",
    60: "Averses de neige localisées et faibles",
    61: "Averses de neige localisées",
    62: "Averses de neige localisées et fortes",
    63: "Averses de neige faibles",
    64: "Averses de neige",
    65: "Averses de neige fortes",
    66: "Averses de neige faibles et fréquentes",
    67: "Averses de neige fréquentes",
    68: "Averses de neige fortes et fréquentes",
    70: "Averses de pluie et neige mêlées localisées et faibles",
    71: "Averses de pluie et neige mêlées localisées",
    72: "Averses de pluie et neige mêlées localisées et fortes",
    73: "Averses de pluie et neige mêlées faibles",
    74: "Averses de pluie et neige mêlées",
    75: "Averses de pluie et neige mêlées fortes",
    76: "Averses de pluie et neige mêlées faibles et nombreuses",
    77: "Averses de pluie et neige mêlées fréquentes",
    78: "Averses de pluie et neige mêlées fortes et fréquentes",
    100: "Orages faibles et locaux",
    101: "Orages locaux",
    102: "Orages fort et locaux",
    103: "Orages faibles",
    104: "Orages",
    105: "Orages forts",
    106: "Orages faibles et fréquents",
    107: "Orages fréquents",
    108: "Orages forts et fréquents",
    120: "Orages faibles et locaux de neige ou grésil",
    121: "Orages locaux de neige ou grésil",
    122: "Orages locaux de neige ou grésil",
    123: "Orages faibles de neige ou grésil",
    124: "Orages de neige ou grésil",
    125: "Orages de neige ou grésil",
    126: "Orages faibles et fréquents de neige ou grésil",
    127: "Orages fréquents de neige ou grésil",
    128: "Orages fréquents de neige ou grésil",
    130: "Orages faibles et locaux de pluie et neige mêlées ou grésil",
    131: "Orages locaux de pluie et neige mêlées ou grésil",
    132: "Orages fort et locaux de pluie et neige mêlées ou grésil",
    133: "Orages faibles de pluie et neige mêlées ou grésil",
    134: "Orages de pluie et neige mêlées ou grésil",
    135: "Orages forts de pluie et neige mêlées ou grésil",
    136: "Orages faibles et fréquents de pluie et neige mêlées ou grésil",
    137: "Orages fréquents de pluie et neige mêlées ou grésil",
    138: "Orages forts et fréquents de pluie et neige mêlées ou grésil",
    140: "Pluies orageuses",
    141: "Pluie et neige mêlées à caractère orageux",
    142: "Neige à caractère orageux",
    210: "Pluie faible intermittente",
    211: "Pluie modérée intermittente",
    212: "Pluie forte intermittente",
    220: "Neige faible intermittente",
    221: "Neige modérée intermittente",
    222: "Neige forte intermittente",
    230: "Pluie et neige mêlées",
    231: "Pluie et neige mêlées",
    232: "Pluie et neige mêlées",
    235: "Averses de grêle",
  }

  const formatDateTime = (date) => {
    return new Intl.DateTimeFormat('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(date);
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
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Météo:</h3>
        {meteo && 
        <div>
          <ul>
              {meteo.forecast.map(item => (
                <li key={item.datetime}>
                    {formatDateTime(new Date(item.datetime))}: {WEATHER[item.weather]} - {item.temp2m}°C
                </li>
              ))}
          </ul>
        </div>
        }
      </div>
      <div id="map" className="mb-4" style={{ height: '400px', width: '100%' }}>
        {loading && <p>Loading...</p>}
        {error && <p>{error}</p>}
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
                  icon={barIcon}
                  onClick={() => setSelectedBar(marker)}
                />
              ))}

              {selectedBar && (
                <InfoWindow
                  position={selectedBar.position}
                  onCloseClick={handleBarSelection}
                >
                  <div>{selectedBar.name}</div>
                </InfoWindow>
              )}
              <Marker
                position={{ lat: barycenter.lat, lng: barycenter.lng }}
                title="Barycenter"
                icon={barycenterIcon}
              />
              {group.users.map(user => (
                <Marker
                  key={user._id}
                  position={{ lat: user.latitude, lng: user.longitude }}
                  icon={usersHomeIcon}
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
          onClick={() => onSelectMarker(selectedBar)}
        >
          {selectedBar ? `Show ${selectedBar.name} Info` : 'Select a bar'}
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
