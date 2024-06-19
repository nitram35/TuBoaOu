import { calculateMeanCoordinates } from '../utils/coordinates.js';
import { errorHandler } from '../utils/error.js';

export const getMeanCoordinates = async (req, res, next) => {
    try {
        const { users } = req.body;

        // Validate input
        if (!Array.isArray(users) || users.length === 0) {
            return next(errorHandler(400, 'Invalid users array'));
        }

        const meanCoordinates = calculateMeanCoordinates(users);

        res.status(200).json(meanCoordinates);
    } catch (error) {
        next(error);
    }
};
