import Bar from '../models/bar.model.js';
import { errorHandler } from '../utils/error.js';

export const addOrUpdateBar = async (req, res, next) => {
    try {
        const { name, address, position } = req.body;

        let bar = await Bar.findOne({ name, address });
        if (bar) {
            bar.interestCount += 1;
        } else {
            bar = new Bar({
                name,
                address,
                position,
                interestCount: 1,
            });
        }

        await bar.save();
        res.status(200).json(bar);
    } catch (error) {
        next(error);
    }
};


// Function to get interest count for a bar by its ID
export const getInterestCount = async (req, res, next) => {
    const barId = req.params.barId; // Assuming the barId is passed in the request parameters

    try {
        const bar = await Bar.findById(barId);

        if (!bar) {
            return res.status(404).json({ error: 'Bar not found' });
        }

        // Extract interestCount from the bar document
        const interestCount = bar.interestCount;

        // Return interestCount in the response
        res.status(200).json({ interestCount });
    } catch (error) {
        // Handle errors
        next(error);
    }
};