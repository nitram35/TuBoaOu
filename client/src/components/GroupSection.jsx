import React, { useEffect, useState } from 'react';
import { Button, TextInput, Alert, Modal } from 'flowbite-react';
import { useSelector } from 'react-redux';

export default function GroupSection() {
  const [groups, setGroups] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', selectedUsers: '' });
  const [createGroupSuccess, setCreateGroupSuccess] = useState(null);
  const [createGroupError, setCreateGroupError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector(state => state.user); // Added to access currentUser from Redux state

  useEffect(() => {
    fetchGroups();

  }, []);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/group');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch groups');
      }

      // Filter groups where ownerId matches currentUser._id
      const userGroups = data.filter(group => group.ownerId === currentUser._id);

      setGroups(userGroups);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching groups:', error.message);
      setError(error.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleCreateGroup = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.selectedUsers.trim()) {
      setCreateGroupError('Please fill out all fields.');
      return;
    }

    const selectedUserIds = formData.selectedUsers.split(',').map(id => id.trim());

    try {
      setLoading(true);

      const usersDetails = await fetchUsersDetails(selectedUserIds);
      const usersArray = usersDetails.map(user => ({
        username: user.username,
        email: user.email,
        longitude: user.longitude,
        latitude: user.latitude
      }));

      const response = await fetch('/api/group/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          ownerId: currentUser._id,
          groupName: formData.name,
          users: usersArray
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create group');
      }

      const newGroup = {
        _id: data._id,
        groupName: data.groupName,
        users: data.users,
        ownerId: data.ownerId
      };

      setGroups([...groups, newGroup]);
      setCreateGroupSuccess('Group created successfully!');
      setFormData({ name: '', selectedUsers: '' });
      setLoading(false);
    } catch (error) {
      console.error('Error creating group:', error.message);
      setCreateGroupError('Failed to create group. Please try again.');
      setLoading(false);
    }
  };


  const fetchUsersDetails = async (selectedUserIds) => {
    try {
      const response = await fetch('/api/user');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch users');
      }

      // Filter the user details based on selectedUserIds and include the current user if needed
      const usersDetails = data.filter(user => {
        return selectedUserIds.includes(user.username) || user._id === currentUser._id;
      });

      return usersDetails;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      setError(error.message);
      return [];
    }
  };



  const handleDeleteGroup = async (groupId) => {
    try {
      console.log('Group ID:', groupId);
    } catch (error) {
      console.error('Error deleting group:', error.message);

    }
  };

  const handleSelectGroup = (group) => {
    console.log('Selected group:', group);
    // Implement logic to select a group (e.g., navigate to a different page or component)
  };

  const closeModal = () => {
    setShowModal(false);
  };


  return (
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Groups</h1>
      <form onSubmit={handleCreateGroup} className='flex flex-col gap-4'>
        <TextInput
          type='text'
          id='name'
          placeholder='Group Name'
          value={formData.name}
          onChange={handleChange}
        />
        <TextInput
          type='text'
          id='selectedUsers'
          placeholder='Enter user IDs separated by commas'
          value={formData.selectedUsers}
          onChange={handleChange}
        />
        <Button type='submit' gradientDuoTone='greenToBlue' outline>
          Create Group
        </Button>
      </form>
      <div className='mt-5'>
        {groups.map(group => (
          <div key={group._id} className='flex justify-between items-center border-b border-gray-300 py-3'>
            <div>{group.groupName}</div>
            <Button gradientDuoTone='greenToBlue' outline onClick={() => handleSelectGroup(group)}>
              Select
            </Button>
            <Button color='failure' onClick={() => handleDeleteGroup(group._id)}>
              Delete
            </Button>
          </div>
        ))}
      </div>
      {createGroupSuccess && (<Alert color='success' className='mt-2'>{createGroupSuccess}</Alert>)}
      {createGroupError && (<Alert color='failure' className='mt-2'>{createGroupError}</Alert>)}
      {error && (<Alert color='failure' className='mt-2'>{error}</Alert>)}
      <Modal popup size='md' show={showModal} onClose={closeModal}>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <h1 className='font-semibold text-lg'>Are you sure you want to perform this action?</h1>
            <div className='flex justify-between mt-5'>
              <Button color='failure' onClick={closeModal}>Cancel</Button>
              <Button gradientDuoTone='greenToBlue' onClick={closeModal}>Confirm</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

