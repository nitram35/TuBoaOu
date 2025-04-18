import { useState } from 'react';
import GroupSection from '../components/GroupSection';
import MapSection from '../components/MapSection';
import BarInfoSection from '../components/BarInfoSection';

export default function DashboardGroup() {
    const [activeSection, setActiveSection] = useState('group'); // Initial active section
    const [selectedGroup, setSelectedGroup] = useState(null); // State to hold selected group info
    const [selectedMarker, setSelectedMarker] = useState(null);

    // Function to handle selecting a group and showing MapSection
    const handleSelectGroup = (group) => {
        setSelectedGroup(group);
        setActiveSection('map');
    };

    const handleSelectMarker = (marker) => {
        setSelectedMarker(marker);
        setActiveSection('barInfo');
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            {/* Conditional rendering based on activeSection state */}
            {activeSection === 'group' && <GroupSection onSelectGroup={handleSelectGroup} />}
            {activeSection === 'map' && <MapSection group={selectedGroup} onSelectMarker={handleSelectMarker} setSelectedMarker={setSelectedMarker} />}
            {activeSection === 'barInfo' && <BarInfoSection group={selectedGroup} onSelectGroup={handleSelectGroup} marker={selectedMarker} />}
        </div >
    );
}
