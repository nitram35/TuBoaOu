import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

export default function SignUp() {
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
                    <form className="flex flex-col gap-4">
                        <div className="">
                            <Label value="Username" />
                            <TextInput type="text" placeholder="Username" id="username" />
                        </div>
                        <div className="">
                            <Label value="Email" />
                            <TextInput type="text" placeholder="emailaddress@yyy.com" id="email" />
                        </div>
                        <div className="">
                            <Label value="Password" />
                            <TextInput type="text" placeholder="Password" id="password" />
                        </div>
                        <Button gradientDuoTone='greenToBlue' type="submit">
                            Sign Up
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Already have an account ?</span>
                        <Link to='/sign-in' className='text-blue-500'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

