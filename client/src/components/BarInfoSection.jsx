import React, { useState, useEffect } from 'react';
import { Button, Alert } from 'flowbite-react';
import PropTypes from 'prop-types';

function BarInfoSection({ group, onSelectGroup, marker }) {
  const [error, setError] = useState(null); // State for error message
  const [successMessage, setSuccessMessage] = useState(null); // State for success message
  const [choose, setChoose] = useState(null); // State for error message

  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [description, setDescription] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const recipientsString = group.users.map(user => user.email).join(', ');

  const mailtoLink = `mailto:${recipientsString}?subject=${title}&body=${emailBody}`;

  const handleChooseBar = async () => {
    const { name, place, position } = marker;

    const data = {
      name,
      address: place.vicinity,
      position: {
        latitude: position.lat(),
        longitude: position.lng()
      }
    };

    try {
      const response = await fetch(`/api/bar/addOrUpdateBar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to choose bar');
      }

      setSuccessMessage('Bar chosen successfully!');
      // Optionally, you can trigger any state updates or UI changes here
    } catch (error) {
      console.error('Error choosing bar:', error);
      setError('Failed to choose bar. Please try again.');
    }
  };

  const handleCreateEvent = {

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleChooseBar();
    handleCreateEvent();
    setEmailBody();
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="mb-6">
        <Button gradientDuoTone="greenToBlue" onClick={() => onSelectGroup(group)}>Back to map</Button>
      </div>
      <div className="p-4 border rounded-lg shadow">
        <h2 className="text-3xl font-semibold mb-4">Informations du Bar</h2>
        {marker ? (
          <div className="space-y-2">
            <p className="text-lg"><strong>Nom:</strong> {marker.name}</p>
            <p className="text-lg"><strong>Position:</strong> {marker.position.lat()}, {marker.position.lng()}</p>
            <p className="text-lg"><strong>Adresse:</strong> {marker.place.vicinity}</p>
            <p className="text-lg"><strong>Disponible:</strong> {marker.place.opening_hours.open_now ? "Ouvert" : "Fermé"}</p>
            <p className="text-lg"><strong>Note et avis:</strong> {marker.place.rating} pour {marker.place.user_ratings_total} avis</p>
          </div>
        ) : (
          <p className="text-lg">Aucun bar sélectionné</p>
        )}
      </div>
      <div className="p-4 mt-6 border rounded-lg shadow">
        <h2 className="text-3xl font-semibold mb-4">Photo du Bar</h2>
        {marker ? (
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
            <img src={marker.place.photos[0].getUrl()} alt="Photo 1" className="w-full h-48 object-cover" />
          </div>
        ) : (
          <p className="text-lg">Aucun bar sélectionné</p>
        )}
      </div>
      <div className="mt-6 space-y-4">
        <Button gradientDuoTone="greenToBlue" outline onClick={() => setChoose(marker)}>Choose this bar</Button>
      </div>
      {choose ? (
           <form onSubmit={handleSubmit} className="space-y-4">
           <div>
               <label htmlFor="title" className="block text-sm font-medium text-gray-700">Titre</label>
               <input
                   type="text"
                   id="title"
                   value={marker.name}
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                   onChange={(e) => setTitle(e.target.value)}
                   required
               />
           </div>
           <div>
               <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Date/Horaire de début</label>
               <input
                   type="datetime-local"
                   id="startDate"
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                   onChange={(e) => setStartDate(e.target.value)}
                   required
               />
           </div>
           <div>
               <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Date/Horaire de fin</label>
               <input
                   type="datetime-local"
                   id="endDate"
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                   onChange={(e) => setEndDate(e.target.value)}
                   required
               />
           </div>
           <div>
               <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
               <textarea
                   id="description"
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                   rows="3"
                   onChange={(e) => setDescription(e.target.value)}
                   required
               ></textarea>
           </div>
           <div>
               <label htmlFor="location" className="block text-sm font-medium text-gray-700">Adresse</label>
               <input
                   type="text"
                   id="location"
                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                   value={marker.place.vicinity}
                   onChange={(e) => setLocation(e.target.value)}
                   required
               />
           </div>
           <div className="text-right">
            <Button type="submit" gradientDuoTone="greenToBlue" outline>Créer l'évenement</Button>
           </div>
       </form>
        ) : (
          <p className="text-lg">Aucun bar sélectionné</p>
        )}
        <a href={mailtoLink}>
          <Button type="submit" gradientDuoTone="greenToBlue" outline>Partager l'évenement</Button>
        </a>
      {error && <Alert color='failure' className='mt-2'>{error}</Alert>}
      {successMessage && <Alert color='success' className='mt-2'>{successMessage}</Alert>}
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
  marker: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    position: PropTypes.shape({
      lat: PropTypes.func,
      lng: PropTypes.func,
    }),
    place: PropTypes.shape({
      vicinity: PropTypes.string,
      opening_hours: PropTypes.shape({
        open_now: PropTypes.bool,
      }),
      rating: PropTypes.number,
      user_ratings_total: PropTypes.number,
      photos: PropTypes.arrayOf(
        PropTypes.shape({
          getUrl: PropTypes.func,
        })
      ),
    }),
  }),
};

export default BarInfoSection;
