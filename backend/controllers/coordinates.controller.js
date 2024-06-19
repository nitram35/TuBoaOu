import { calculateMeanCoordinates } from '../utils/coordinates.js';
import { errorHandler } from '../utils/error.js';

export const getMeanCoordinates = async (req, res, next) => {
    try {
        const { users } = req.body;
        console.log(users);

        // Validate input
        if (!Array.isArray(users) || users.length === 0) {
            return next(errorHandler(400, 'Invalid users array'));
        }

        // Specify key names for longitude and latitude
        const longitudeKey = 'longitude';
        const latitudeKey = 'latitude';

        // Calculate mean coordinates using the refactored function
        const meanCoordinates = calculateMeanCoordinates(users, longitudeKey, latitudeKey);

        res.status(200).json(meanCoordinates);
    } catch (error) {
        next(error);
    }
};
