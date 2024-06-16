import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef, useEffect } from 'react';
import {
    updateStart,
    updateSucceeded,
    updateFailed,
    deleteUserStart,
    deleteUserSucceeded,
    deleteUserFailed,
    signoutSucceeded
} from '../redux/user/userSlice';

// Function to load Google Maps script asynchronously
const loadGoogleMapsScript = (callback) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
};

export default function DashboardProfile() {
    const { currentUser, error } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const addressInputRef = useRef(null);
    const [formData, setFormData] = useState({});
    const [updateUserSucceeded, setUpdateUserSucceeded] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadGoogleMapsScript(() => {
            const autocomplete = new window.google.maps.places.Autocomplete(addressInputRef.current, {
                types: ['address'],
            });
            autocomplete.addListener('place_changed', () => {
                const place = autocomplete.getPlace();
                setFormData(prev => ({
                    ...prev,
                    address: place.formatted_address,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }));
            });
        });
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateUserError(null);
        setUpdateUserSucceeded(null);

        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No data updated!");
            return;
        }

        try {
            dispatch(updateStart());

            const response = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) {
                dispatch(updateFailed(data.message));
                setUpdateUserError(data.message);
            } else {
                dispatch(updateSucceeded(data));
                setUpdateUserSucceeded("Profile updated successfully!");
            }
        } catch (error) {
            dispatch(updateFailed(error.message));
            setUpdateUserError(error.message);
        }
    };

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            dispatch(deleteUserStart());
            const response = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) {
                dispatch(deleteUserFailed(data.message));
            } else {
                dispatch(deleteUserSucceeded(data));
            }
        } catch (error) {
            dispatch(deleteUserFailed(error.message));
        }
    };

    const handleSignout = async () => {
        try {
            const response = await fetch('/api/user/signout', {
                method: 'POST',
            });
            const data = await response.json();
            if (!response.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSucceeded());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='w-30 h-30 self-center'>
                    <img src={currentUser.profileAvatar} alt="user" className='rounded-full w-full h-full' />
                </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                <TextInput type='text' id='address' placeholder='address' defaultValue={currentUser.address} ref={addressInputRef} />
                <Button type='submit' gradientDuoTone='greenToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-600 flex justify-between mt-5'>
                <span className='cursor-pointer' onClick={() => setShowModal(true)}>Delete Account</span>
                <span className='cursor-pointer' onClick={handleSignout}>Sign Out</span>
            </div>
            {updateUserSucceeded && (<Alert color='success' className='mt-2'>{updateUserSucceeded}</Alert>)}
            {updateUserError && (<Alert color='failure' className='mt-2'>{updateUserError}</Alert>)}
            {error && (<Alert color='failure' className='mt-2'>{error}</Alert>)}
            <Modal popup size='md' show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header />
                <Modal.Body>
                    <div className='text-center'>
                        <h1 className='font-semibold text-lg'>Are you sure you want to delete your account?</h1>
                        <div className='flex justify-between mt-5'>
                            <Button color='failure' onClick={handleDeleteUser}>Yes, sure!</Button>
                            <Button gradientDuoTone='greenToBlue' outline onClick={() => setShowModal(false)}>No, cancel</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
