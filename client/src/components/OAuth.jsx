import { Button } from 'flowbite-react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSucceeded } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

export default function OAuth() {
    const auth = getAuth(app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        const provider = new GoogleAuthProvider();
        // always prompt the user to select their account
        provider.setCustomParameters({ prompt: 'select_account' });
        try {
            const resFromGoogle = await signInWithPopup(auth, provider);
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: resFromGoogle.user.displayName,
                    email: resFromGoogle.user.email,
                    googlePhotoUrl: resFromGoogle.user.photoURL,
                }),
            });
            const data = await res.json();
            if (res.ok) {
                dispatch(signInSucceeded(data));
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Button type='button' gradientDuoTone='tealToLime' outline onClick={handleGoogleClick}>
            <AiFillGoogleCircle className='w-6 h-6 mr-2' />
            Sign In with Google
        </Button>
    )
}
