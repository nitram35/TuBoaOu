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
import GroupSection from '../components/GroupSection';
import MapSection from '../components//MapSection';
import BarInfoSection from '../components//BarInfoSection';

// Function to load Google Maps script asynchronously
const loadGoogleMapsScript = (callback) => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = callback;
    document.body.appendChild(script);
};

export default function DashboardGroup() {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [selectedBar, setSelectedBar] = useState(null);


    return (
        <div className="w-full">
            <div className="container mx-auto p-4 h-screen flex flex-col">
                <GroupSection setSelectedGroup={setSelectedGroup} />
                <MapSection selectedGroup={selectedGroup} setSelectedBar={setSelectedBar} />
                <BarInfoSection selectedBar={selectedBar} />
            </div>
        </div>
    );
}
