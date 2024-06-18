import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";


export default function Home() {
    const navigate = useNavigate();

    const handleGetStartedClick = () => {
        navigate('/sign-in');
    };
    return (
        <div className="container mx-auto px-4 py-12">     {/* Main Content */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to TuBoaOu</h1>
                <p className="text-lg text-gray-700">
                    Find the perfect bar to meet with your friends, colleagues, or family, based on distance, ratings, and more.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Location-Based Suggestions</h2>
                    <p className="text-gray-600">
                        TuBoaOu helps you find the closest bar for everyone in your group based on their locations.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">User Ratings & Reviews</h2>
                    <p className="text-gray-600">
                        Read ratings and reviews from other users to choose the best bar for your meet-up.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Events Nearby</h2>
                    <p className="text-gray-600">
                        Discover nearby events you can attend after your meet-up at the bar.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Favorites & Comments</h2>
                    <p className="text-gray-600">
                        Save your favorite bars and leave comments about your experiences for others to see.
                    </p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Social Interaction</h2>
                    <p className="text-gray-600">
                        Facilitate social interactions by easily organizing meet-ups with your friends.
                    </p>
                </div>
            </div>

            <div className="text-center mt-12">
                <Button gradientMonochrome="info" size="lg" onClick={handleGetStartedClick}>
                    Get Started
                </Button>
            </div>
        </div>
    )
}
