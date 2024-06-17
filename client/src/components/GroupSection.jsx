import React, { useState } from 'react';

function GroupSection({ setSelectedGroup }) {
  const [groupName, setGroupName] = useState('');
  const [groupMembers, setGroupMembers] = useState('');
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState('');

  const handleCreateGroup = () => {
    if (!groupName || !groupMembers) {
      setError('Tous les champs sont obligatoires.');
      return;
    }
    setError('');
    const newGroup = { name: groupName, members: groupMembers.split(',') };
    setGroups([...groups, newGroup]);
    setGroupName('');
    setGroupMembers('');
  };

  return (
    <div className="flex justify-between mb-8 w-full">
      <div className="w-1/2 p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Créer un groupe</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nom du groupe</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className={`mt-1 p-2 border rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Membres du groupe (séparés par des virgules)</label>
            <input
              type="text"
              value={groupMembers}
              onChange={(e) => setGroupMembers(e.target.value)}
              className={`mt-1 p-2 border rounded w-full ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button
            type="button"
            onClick={handleCreateGroup}
            disabled={!groupName || !groupMembers}
            className={`px-4 py-2 rounded ${(!groupName || !groupMembers) ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
          >
            Créer
          </button>
        </form>
      </div>
      <div className="w-1/2 p-4 border rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Mes groupes</h2>
        <ul>
          {groups.map((group, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span>{group.name}</span>
              <button
                onClick={() => setSelectedGroup(group)}
                className="px-4 py-2 bg-green-500 text-white rounded"
              >
                Sélectionner
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default GroupSection;
