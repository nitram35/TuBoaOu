import { Sidebar } from 'flowbite-react';
import { HiArrowSmRight, HiUser , HiViewBoards} from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signoutSucceeded } from '../redux/user/userSlice';

export default function DashboardSidebar() {
    const location = useLocation();
    const [tab, setTab] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const tabFromUrl = urlParams.get('tab');
        if (tabFromUrl) {
            setTab(tabFromUrl);
        }
    }, [location.search]
    );

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
        <Sidebar className='w-full md:w-56'>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item active={tab === 'profile'} icon={HiUser} label={'User'} labelColor='dark' as='div'>
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=group'>
                        <Sidebar.Item active={tab === 'group'} icon={HiViewBoards} as='div'>
                            Group
                        </Sidebar.Item>
                    </Link>
                    <Sidebar.Item icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignout}>
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
}
