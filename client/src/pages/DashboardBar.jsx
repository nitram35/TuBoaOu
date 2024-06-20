import { useState } from 'react';
import { Alert, Button, TextInput } from 'flowbite-react';

export default function DashboardBar() {
    const [barId, setBarId] = useState('');
    const [interestCount, setInterestCount] = useState(null);
    const [error, setError] = useState(null);

    const handleFetchInterestCount = async (e) => {
        e.preventDefault();
        setError(null);
        setInterestCount(null);

        try {
            const response = await fetch(`/api/bar/interestCount/${barId}`);
            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Failed to fetch interested groups');
            } else {
                setInterestCount(data.interestCount);
            }
        } catch (error) {
            setError(error.message || 'An error occurred while fetching the interest count');
        }
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Groups interested</h1>
            <form onSubmit={handleFetchInterestCount} className='flex flex-col gap-4'>
                <TextInput
                    type='text'
                    id='barId'
                    placeholder='Enter Bar ID'
                    value={barId}
                    onChange={(e) => setBarId(e.target.value)}
                />
                <Button type='submit' gradientDuoTone='greenToBlue' outline>
                    Click for results
                </Button>
            </form>
            {interestCount !== null && (
                <Alert color='success' className='mt-2'>
                    {interestCount} interested groups
                </Alert>
            )}
            {error && (
                <Alert color='failure' className='mt-2'>
                    {error}
                </Alert>
            )}
        </div>
    );
}
