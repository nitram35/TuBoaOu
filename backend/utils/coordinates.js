export const calculateMeanCoordinates = (data, longitudeKey, latitudeKey) => {
    if (!Array.isArray(data) || data.length === 0) {
        throw new Error('Invalid data array');
    }

    // Calculate mean longitude and latitude
    const totalCoordinates = data.reduce((acc, item) => {
        // Ensure item has both longitude and latitude properties
        if (typeof item[longitudeKey] !== 'number' || typeof item[latitudeKey] !== 'number') {
            throw new Error('Invalid coordinate values');
        }

        return {
            longitude: acc.longitude + item[longitudeKey],
            latitude: acc.latitude + item[latitudeKey],
        };
    }, { longitude: 0, latitude: 0 });

    const meanLongitude = totalCoordinates.longitude / data.length;
    const meanLatitude = totalCoordinates.latitude / data.length;

    return { meanLongitude, meanLatitude };
};
