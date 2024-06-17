import { useState } from 'react';
import GroupSection from '../components/GroupSection';
import MapSection from '../components//MapSection';
import BarInfoSection from '../components//BarInfoSection';

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
