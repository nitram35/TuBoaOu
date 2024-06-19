import React from 'react';
import PropTypes from 'prop-types';

function BarInfoSection({ marker }) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Informations du Bar</h2>
      {marker ? (
        <div>
          <p className="text-lg"><strong>Nom:</strong> {marker.name}</p>
          <p className="text-lg"><strong>Position:</strong> lat {marker.position.lat}, lng {marker.position.lng}</p>
        </div>
      ) : (
        <p className="text-lg">Aucun bar sélectionné</p>
      )}
    </div>
  );
}

BarInfoSection.propTypes = {
  marker: PropTypes.object.isRequired,
};


export default BarInfoSection;
