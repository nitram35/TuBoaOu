import { Navbar, TextInput, Button, Dropdown, Avatar } from 'flowbite-react';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { signoutSucceeded } from '../redux/user/userSlice';


export default function Header() {
    const path = useLocation().pathname;
    const { currentUser } = useSelector(state => state.user);
    const dispatch = useDispatch();

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
        <Navbar className='border-b-2'>
            <Link to='/' className='self-centered whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'>
                <span className='px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white'>TuBoaOu</span>
            </Link>
            <form>
                <TextInput
                    type='text'
                    placeholder='Search...'
                    rightIcon={AiOutlineSearch}
                    className='hidden lg:inline' />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' >
                <AiOutlineSearch />
            </Button>
            <div className="flex gap-2 md:order-2">
                {currentUser ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt='user'
                                img={currentUser.profileAvatar}
                                rounded
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className='block text-sm'>@{currentUser.username}</span>
                            <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                        </Dropdown.Header>
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item>Profile</Dropdown.Item>
                        </Link>
                        <Link to={'/dashboard?tab=group'}>
                            <Dropdown.Item>Groups</Dropdown.Item>
                        </Link>
                        <Dropdown.Divider />
                        <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>


                    </Dropdown>
                ) :
                    (
                        <Link to='/sign-in'>
                            <Button gradientDuoTone='greenToBlue' outline>
                                Sign In
                            </Button>
                        </Link>
                    )
                }

                <Navbar.Toggle />
            </div >
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/dashboard?tab=profile'} as={'div'}>
                    <Link to={'/dashboard?tab=profile'}>Profile</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/dashboard?tab=group'} as={'div'}>
                    <Link to={'/dashboard?tab=group'}>Groups</Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/dashboard-bar'} as={'div'}>
                    <Link to='/dashboard-bar'>
                        Bar ?
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar >
    )
}
