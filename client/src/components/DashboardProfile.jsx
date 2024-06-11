import { Button, TextInput } from 'flowbite-react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { updateStart, updateSucceeded, updateFailed } from '../redux/user/userSlice';

export default function DashboardProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if no data is changed, return
        if (Object.keys(formData).length === 0) {
            return;
        }
        try {
            dispatch(updateStart());
            // make a request to the server
            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                dispatch(updateFailed(data.message));
            } else {
                dispatch(updateSucceeded(data));
            }
        } catch (error) {
            dispatch(updateFailed(error.message));
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
        </div>
    )
}
