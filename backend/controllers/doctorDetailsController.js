const DoctorDetails = require("../models/DoctorDetails.model");
const User = require("../models/User.model");

exports.doctors = async (req, res) => {
    try {
        const doctors = await DoctorDetails.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] },
                }
            ]
        });

        if (!doctors.length) {
            return res.status(404).json({ message: 'No doctors found' });
        }

        res.status(200).json(doctors);
    }
    catch (error) {
        console.error('Error fetching doctors:', error);
        res.status(500).json({ message: 'Error fetching doctors', error });
    }
};

