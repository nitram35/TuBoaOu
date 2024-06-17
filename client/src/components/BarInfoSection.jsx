import React from 'react';

function BarInfoSection({ selectedBar }) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Informations du Bar</h2>
      {selectedBar ? (
        <div>
          <p className="text-lg"><strong>Nom:</strong> {selectedBar.name}</p>
          <p className="text-lg"><strong>Position:</strong> lat {selectedBar.position.lat}, lng {selectedBar.position.lng}</p>
        </div>
      ) : (
        <p className="text-lg">Aucun bar sélectionné</p>
      )}
    </div>
  );
}

export default BarInfoSection;
