import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signInStart, signInSucceeded, signInFailed } from "../redux/user/userSlice";
import OAuth from "../components/OAuth";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    // const [errorMessage, setErrorMessage] = useState(null);
    // const [loading, setLoading] = useState(false);
    const { loading, error: errorMessage } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default form submission
        if (!formData.email || !formData.password) {
            // return setErrorMessage('All fields are required');
            return dispatch(signInFailed('All fields are required'));
        }
        try {
            // We replace the 2 following lines with Redux by using the signInStart
            // setLoading(true);
            // setErrorMessage(null);
            dispatch(signInStart());
            // we add a proxy in vite.config.js to be able to reach localhost:3000 (server) and not localhost:5173 (client)
            const res = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                // setErrorMessage(data.message);
                dispatch(signInFailed(data.message));

            }
            // if the response is ok, we redirect to the sign-in pages
            if (res.ok) {
                dispatch(signInSucceeded(data));
                navigate('/');
            }
        } catch (error) {
            // setErrorMessage(error.message)
            // setLoading(false);
            dispatch(signInFailed(error.message));
        }
    };
    // console.log(formData);
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
                {/* left side */}
                <div className="flex-1">
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white'>TuBoaOu</span>
                    </Link>
                    <p className="test-sm mt-5">
                        LO10 project. Sign in with your email and password or with Google.
                    </p>
                </div>
                {/* right side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="">
                            <Label value="Email" />
                            <TextInput type="email" placeholder="emailaddress@yyy.com" id="email" onChange={handleChange} />
                        </div>
                        <div className="">
                            <Label value="Password" />
                            <TextInput type="password" placeholder="Password" id="password" onChange={handleChange} />
                        </div>
                        <Button gradientDuoTone='greenToBlue' type="submit" disabled={loading}>
                            {loading ? (
                                // We use <> </> to wrap multiple elements
                                <>
                                    <Spinner size='sm' />
                                    <span className="pl-3">Loading...</span>
                                </>
                            ) : ('Sign In')}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>No account ?</span>
                        <Link to='/sign-up' className='text-blue-500'>Sign Up</Link>
                    </div>
                    {errorMessage && (
                        <Alert className="mt-5" color='failure'>
                            {errorMessage}
                        </Alert>
                    )}
                </div>
            </div>
        </div>
    )
}

