import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignUp() {
    const [formData, setFormData] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the default form submission
        if (!formData.username || !formData.email || !formData.password) {
            return setErrorMessage('All fields are required');
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            // we add a proxy in vite.config.js to be able to reach localhost:3000 (server) and not localhost:5173 (client)
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                setErrorMessage(data.message);
            }
            setLoading(false);
            // if the response is ok, we redirect to the sign-in pages
            if (res.ok) {
                navigate('/sign-in');
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false);
        }
    };
    console.log(formData);
    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 gap-5 max-w-3xl mx-auto flex-col md:flex-row md:items-center">
                {/* left side */}
                <div className="flex-1">
                    <Link to='/' className='font-bold dark:text-white text-4xl'>
                        <span className='px-2 py-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg text-white'>TuBoaOu</span>
                    </Link>
                    <p className="test-sm mt-5">
                        LO10 project. Sign up with your email and password or with Google.
                    </p>
                </div>
                {/* right side */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="">
                            <Label value="Username" />
                            <TextInput type="text" placeholder="Username" id="username" onChange={handleChange} />
                        </div>
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
                            ) : ('Sign Up')}
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Already have an account ?</span>
                        <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
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

