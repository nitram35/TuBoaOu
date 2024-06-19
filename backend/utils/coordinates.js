export const calculateMeanCoordinates = (users) => {
    if (!Array.isArray(users) || users.length === 0) {
        throw new Error('Invalid users array');
    }

    const totalCoordinates = users.reduce((acc, user) => {
        if (typeof user.longitude !== 'number' || typeof user.latitude !== 'number') {
            throw new Error('Invalid coordinate values');
        }
        acc.longitude += user.longitude;
        acc.latitude += user.latitude;
        return acc;
    }, { longitude: 0, latitude: 0 });

    const meanLongitude = totalCoordinates.longitude / users.length;
    const meanLatitude = totalCoordinates.latitude / users.length;

    return { meanLongitude, meanLatitude };
};
