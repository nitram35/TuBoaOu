import React, { useState, useEffect , useCallback} from 'react';
import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import PropTypes from 'prop-types';

function BarInfoSection({ group, onSelectGroup, marker }) {

  useEffect(() => {
    console.log(marker.place);
  }, []);

  return (
    <div>
      <div className="p-4 border rounded shadow">
        <Button onClick={() => onSelectGroup(group)}>Back to map</Button>
        <h2 className="text-2xl font-bold mb-4">Informations du Bar</h2>
        {marker ? (
          <div>
            <p className="text-lg"><strong>Nom:</strong> {marker.name}</p>
            <p className="text-lg"><strong>Position:</strong> {marker.position.lat()}, {marker.position.lng()}</p>
            <p className="text-lg"><strong>Adresse:</strong> {marker.place.vicinity}</p>
            <p className="text-lg"><strong>Disponible:</strong> {marker.place.opening_hours.isOpen() ? "Ouvert" : "Fermé"}</p>
            <p className="text-lg"><strong>Note et avis:</strong> {marker.place.rating} pour {marker.place.user_ratings_total} avis</p>
          </div>
        ) : (
          <p className="text-lg">Aucun bar sélectionné</p>
        )}
      </div>
      <div className="p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Photo du Bar</h2>
        {marker ? (
          <main class="container mx-auto p-6">
          <div>
            <div class="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
              <img src={marker.place.photos[0].getUrl()} alt="Photo 1" class="w-full h-48 object-cover"/>
            </div>
          </div>
        </main>
        ) : (
          <p className="text-lg">Aucun bar sélectionné</p>
        )}
      </div>
      <Button gradientDuoTone='greenToBlue' outline /* onClick={() => onSelectMarker(barChoice)}*/>Choose this bar</Button>
      <Button gradientDuoTone='greenToBlue' outline /* onClick={() => onSelectMarker(barChoice)}*/>Share the bar to Group</Button>
    </div>
  );
}

BarInfoSection.propTypes = {
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
  onSelectGroup: PropTypes.func.isRequired,
  marker: PropTypes.object.isRequired,
};


export default BarInfoSection;
