import { Alert, Button, TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateStart, updateSucceeded, updateFailed } from '../redux/user/userSlice';

export default function DashboardProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState({});
    const [updateUserSucceeded, setUpdateUserSucceeded] = useState(null);
    const [updateUserError, setUpdateUserError] = useState(null);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // reset the alert messages
        setUpdateUserSucceeded(null);
        setUpdateUserError(null);
        // if no data is changed, return
        if (Object.keys(formData).length === 0) {
            setUpdateUserError("No data updated!");
            return;
        }
        try {
            dispatch(updateStart());
            // make a request to the server
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
    // console.log(currentUser);
    // console.log(formData);
    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
                <div className='w-30 h-30 self-center'>
                    <img src={currentUser.profileAvatar} alt="user" className='rounded-full w-full h-full' />
                </div>
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} onChange={handleChange} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} onChange={handleChange} />
                <TextInput type='password' id='password' placeholder='password' onChange={handleChange} />
                <Button type='submit' gradientDuoTone='greenToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-600 flex justify-between mt-5'>
                <span className='cursor-pointer'>Delete Account</span>
                <span className='cursor-pointer'>Sign Out</span>
            </div>
            {updateUserSucceeded && (<Alert color='success' className='mt-2'>{updateUserSucceeded}</Alert>)}
            {updateUserError && (<Alert color='failure' className='mt-2'>{updateUserError}</Alert>)}
        </div>
    )
}
